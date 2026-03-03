'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSimulationStore } from '@/store';
import { Taskbar } from './Taskbar';
import { EmailApp } from './EmailApp';
import { ChatApp } from './ChatApp';
import { AIAssistantApp } from './AIAssistantApp';
import { ComplianceMonitor } from './ComplianceMonitor';
import { EscalatePanel } from './EscalatePanel';
import type { Scenario, NPCMessage } from '@/types';

interface SimulationLayoutProps {
  scenario?: Scenario;
  onDecision?: (decision: string, context: string) => void;
  onComplete?: () => void;
  onSendNPCMessage?: (message: string, npcId: string) => Promise<NPCMessage>;
  className?: string;
}

const SimulationLayout: React.FC<SimulationLayoutProps> = ({
  scenario,
  onDecision,
  onComplete,
  onSendNPCMessage,
  className,
}) => {
  const { 
    activeApp, 
    setIsTyping,
    addChatMessage,
    addAIMessage,
    setComplianceStatus,
    complianceStatus,
  } = useSimulationStore();

  const [complianceExpanded, setComplianceExpanded] = React.useState(false);
  const [timer, setTimer] = React.useState<number | null>(null);

  // Initialize timer based on scenario
  React.useEffect(() => {
    if (scenario?.timeLimit) {
      setTimer(scenario.timeLimit * 60); // Convert minutes to seconds
    }
  }, [scenario]);

  // Countdown timer
  React.useEffect(() => {
    if (timer === null || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t === null || t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNPCMessage = async (content: string, npcId: string = 'chat') => {
    if (!onSendNPCMessage) return;

    setIsTyping(true);
    try {
      const response = await onSendNPCMessage(content, npcId);
      if (npcId === 'ai') {
        addAIMessage(response);
      } else {
        addChatMessage(response);
      }

      // Update compliance based on AI analysis
      if (response.metadata?.riskLevel) {
        const riskScores: Record<string, number> = {
          low: 90,
          medium: 70,
          high: 40,
          critical: 20,
        };
        setComplianceStatus({
          ...complianceStatus,
          score: Math.min(complianceStatus.score, riskScores[response.metadata.riskLevel] || 100),
          level: response.metadata.riskLevel === 'critical' || response.metadata.riskLevel === 'high' 
            ? 'danger' 
            : response.metadata.riskLevel === 'medium' 
              ? 'warning' 
              : 'safe',
          activeFlags: response.metadata.issues || [],
        });
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleEscalate = (option: { label: string }, details: string) => {
    onDecision?.('escalate', `Escalated: ${option.label} - ${details}`);
    // Could close the escalate panel or show confirmation
  };

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'email':
        return <EmailApp />;
      case 'chat':
        return (
          <ChatApp
            npcName={scenario?.npcName || 'Sarah Chen'}
            npcRole={scenario?.npcRole || 'Colleague'}
            onSendMessage={(msg) => handleNPCMessage(msg, 'chat')}
          />
        );
      case 'ai':
        return (
          <AIAssistantApp
            onSendMessage={(msg) => handleNPCMessage(msg, 'ai')}
          />
        );
      case 'escalate':
        return (
          <EscalatePanel
            context={scenario?.context}
            onEscalate={handleEscalate}
            onCancel={() => useSimulationStore.getState().setActiveApp('email')}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400">Select an application from the taskbar</p>
          </div>
        );
    }
  };

  return (
    <div className={cn('h-screen flex flex-col bg-slate-900', className)}>
      {/* Desktop wallpaper area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Scenario info header */}
        {scenario && (
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
              <p className="text-sm font-medium text-white">{scenario.title}</p>
              <p className="text-xs text-slate-400">
                {scenario.moduleName} • {scenario.difficulty}
              </p>
            </div>

            {timer !== null && (
              <div className={cn(
                'bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border flex items-center gap-2',
                timer < 60 ? 'border-red-500/50' : 'border-slate-700'
              )}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={timer < 60 ? 'text-red-500' : 'text-slate-400'}>
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className={cn('text-sm font-mono', timer < 60 ? 'text-red-500' : 'text-white')}>
                  {formatTimer(timer)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* App window container */}
        <div className="absolute inset-4 top-16 bottom-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeApp}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {renderActiveApp()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Compliance monitor floating widget */}
        <ComplianceMonitor
          isExpanded={complianceExpanded}
          onToggle={() => setComplianceExpanded(!complianceExpanded)}
        />
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export { SimulationLayout };
