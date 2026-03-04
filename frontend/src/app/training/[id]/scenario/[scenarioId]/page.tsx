'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SimulationLayout } from '@/components/simulation';
import { useSimulationStore } from '@/store';
import { trainingAPI } from '@/lib/api';
import type { Scenario, NPCMessage, Email } from '@/types';

export default function ScenarioPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.scenarioId as string;
  const moduleId = params.id as string;

  const {
    setEmails,
    setChatMessages,
    setAIMessages,
    setComplianceStatus,
    resetSimulation,
    complianceStatus,
  } = useSimulationStore();

  const [scenario, setScenario] = React.useState<Scenario | null>(null);
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch scenario and start session
  React.useEffect(() => {
    const initialize = async () => {
      try {
        // Reset simulation state
        resetSimulation();

        // Fetch scenario details
        const scenarioRes = await trainingAPI.getScenario(scenarioId);
        if (scenarioRes.success && scenarioRes.data) {
          setScenario(scenarioRes.data);

          // Initialize simulation with scenario data
          if (scenarioRes.data.initialEmails) {
            setEmails(scenarioRes.data.initialEmails as Email[]);
          }

          // Set initial chat messages if any
          if (scenarioRes.data.initialMessages) {
            setChatMessages(scenarioRes.data.initialMessages as NPCMessage[]);
          }

          // Set initial compliance status
          setComplianceStatus({
            level: 'safe',
            score: 100,
            activeFlags: [],
            recentIssues: [],
          });
        }

        // Start training session
        const sessionRes = await trainingAPI.startSession(scenarioId);
        if (sessionRes.success && sessionRes.data) {
          setSessionId(sessionRes.data.id);
        }
      } catch (error) {
        console.error('Failed to initialize scenario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (scenarioId) {
      initialize();
    }
  }, [scenarioId, resetSimulation, setEmails, setChatMessages, setComplianceStatus]);

  // Handle NPC message sending
  const handleSendNPCMessage = async (message: string, npcId: string): Promise<NPCMessage> => {
    try {
      const response = await trainingAPI.getNPCResponse({
        scenarioId,
        npcName: npcId === 'ai' ? 'AI Assistant' : scenario?.npcName || 'Colleague',
        userMessage: message,
      });

      if (response.success && response.data) {
        return response.data;
      }

      // Fallback response
      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I understand. How would you like to proceed?',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to get NPC response:', error);
      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I had trouble processing that. Could you try again?',
        timestamp: new Date().toISOString(),
      };
    }
  };

  // Handle decision submission
  const handleDecision = async (decision: string, context: string) => {
    if (!sessionId) return;

    try {
      const response = await trainingAPI.submitDecision(sessionId, decision, context);
      
      if (response.success && response.data) {
        const { complianceImpact, isCorrect } = response.data;
        
        // Update compliance based on decision
        const newScore = Math.max(0, Math.min(100, complianceStatus.score + complianceImpact));
        setComplianceStatus({
          ...complianceStatus,
          score: newScore,
          level: newScore >= 80 
            ? 'safe' 
            : newScore >= 50 
              ? 'warning' 
              : 'violation',
          recentIssues: !isCorrect 
            ? [...complianceStatus.recentIssues, context].slice(-5) 
            : complianceStatus.recentIssues,
        });
      }
    } catch (error) {
      console.error('Failed to submit decision:', error);
    }
  };

  // Handle scenario completion
  const handleComplete = async () => {
    if (!sessionId) {
      router.push(`/training/${moduleId}`);
      return;
    }

    try {
      const { complianceStatus } = useSimulationStore.getState();
      
      await trainingAPI.completeSession(sessionId, {
        complianceScore: complianceStatus.score,
        riskAwarnessScore: 80, // Would be calculated from scenario performance
        aiUsageScore: 75,
      });

      router.push(`/training/${moduleId}`);
    } catch (error) {
      console.error('Failed to complete session:', error);
      router.push(`/training/${moduleId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400">Loading scenario...</p>
        </div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900">
        <p className="text-slate-400 mb-4">Scenario not found</p>
        <button
          onClick={() => router.push(`/training/${moduleId}`)}
          className="btn-primary"
        >
          Back to Module
        </button>
      </div>
    );
  }

  return (
    <SimulationLayout
      scenario={{
        ...scenario,
        moduleName: 'AI Literacy Training',
      }}
      onDecision={handleDecision}
      onComplete={handleComplete}
      onSendNPCMessage={handleSendNPCMessage}
    />
  );
}
