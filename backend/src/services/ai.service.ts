import OpenAI from 'openai';
import prisma from '../config/database';
import { config } from '../config';
import { NPCContext, NPCResponse } from '../types';
import { AppError } from '../middleware/error';
import { NPCTone } from '@prisma/client';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

// Prompt templates for different NPC types
const NPC_TEMPLATES = {
  marketing_director: `You are a Marketing Director named {{npcName}} at a Fortune 500 company.
You are enthusiastic about using AI to speed up work but sometimes overlook compliance.
You tend to push for quick results and may suggest shortcuts.
Your tone is {{tone}}.
Respond naturally and stay in character.`,

  compliance_officer: `You are a Compliance Officer named {{npcName}} at a Fortune 500 company.
You are cautious about AI use and focused on regulatory requirements.
You ask probing questions about data handling and IP concerns.
Your tone is {{tone}}.
Respond naturally and stay in character.`,

  it_manager: `You are an IT Manager named {{npcName}} at a Fortune 500 company.
You understand technical aspects of AI but balance innovation with security.
You discuss system integrations, data flow, and security protocols.
Your tone is {{tone}}.
Respond naturally and stay in character.`,

  hr_director: `You are an HR Director named {{npcName}} at a Fortune 500 company.
You're concerned about employee privacy, bias in AI decisions, and fair use.
You focus on the human impact of AI adoption.
Your tone is {{tone}}.
Respond naturally and stay in character.`,

  legal_counsel: `You are Legal Counsel named {{npcName}} at a Fortune 500 company.
You focus on liability, IP rights, and contractual implications of AI use.
You ask about data sources, output ownership, and regulatory compliance.
Your tone is {{tone}}.
Respond naturally and stay in character.`,

  default: `You are {{npcRole}} named {{npcName}} at a Fortune 500 company.
Your tone is {{tone}}.
Respond naturally and provide realistic workplace dialogue.`,
};

// Risk detection patterns
const RISK_PATTERNS = {
  ip_violation: [
    /competitor('s)?\s+(data|material|content|information)/i,
    /copyrighted/i,
    /proprietary\s+(data|information)/i,
    /without\s+permission/i,
    /stolen/i,
  ],
  privacy_breach: [
    /personal\s+(data|information)/i,
    /employee\s+records/i,
    /customer\s+data/i,
    /private\s+information/i,
    /PII/i,
    /GDPR/i,
  ],
  bias_risk: [
    /discriminat/i,
    /bias/i,
    /unfair/i,
    /protected\s+class/i,
    /gender|race|age|religion/i,
  ],
  security_risk: [
    /password/i,
    /credentials/i,
    /API\s+key/i,
    /secret/i,
    /confidential/i,
  ],
};

// Compliance policies (simplified)
const COMPLIANCE_POLICIES = {
  EU_AI_ACT: [
    'High-risk AI systems require human oversight',
    'AI systems must be transparent about their nature',
    'Training data must be documented and appropriate',
    'Users must be informed when interacting with AI',
  ],
  GDPR: [
    'Personal data requires consent or legitimate basis',
    'Data subjects have right to explanation',
    'Data minimization principle applies',
    'Cross-border data transfers need safeguards',
  ],
  INTERNAL_POLICY: [
    'AI-generated content must be reviewed before publishing',
    'Customer-facing AI use requires approval',
    'Confidential data cannot be used in external AI tools',
    'AI decisions affecting employees require human review',
  ],
};

export class AIService {
  // Generate NPC response
  async generateNPCResponse(
    userId: string,
    context: NPCContext
  ): Promise<NPCResponse> {
    const startTime = Date.now();

    try {
      // Get scenario for context
      const scenario = await prisma.scenario.findUnique({
        where: { id: context.scenarioId },
        include: { module: true },
      });

      if (!scenario) {
        throw new AppError('Scenario not found', 404);
      }

      // Build system prompt
      const npcTemplate = this.getNPCTemplate(context.npcRole);
      const systemPrompt = this.buildSystemPrompt(npcTemplate, context, scenario);

      // Build messages array
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...context.previousMessages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ];

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: config.openai.model,
        messages,
        max_tokens: config.openai.maxTokens,
        temperature: 0.7,
        presence_penalty: 0.3,
        frequency_penalty: 0.3,
      });

      const responseContent =
        completion.choices[0]?.message?.content || 'I need a moment to think about that.';
      const tokensUsed = completion.usage?.total_tokens || 0;

      // Analyze response for risks
      const lastUserMessage =
        context.previousMessages[context.previousMessages.length - 1]?.content || '';
      const { riskFlags, complianceIssues } = this.analyzeInteraction(
        lastUserMessage,
        responseContent
      );

      // Determine tone from response
      const detectedTone = this.detectTone(responseContent);

      // Log interaction
      await prisma.nPCInteraction.create({
        data: {
          userId,
          scenarioId: context.scenarioId,
          npcName: context.npcName,
          npcRole: context.npcRole,
          npcTone: detectedTone,
          userPrompt: lastUserMessage,
          aiResponse: responseContent,
          promptTemplate: npcTemplate,
          modelUsed: config.openai.model,
          tokensUsed,
          responseTimeMs: Date.now() - startTime,
          riskFlags,
          complianceIssues,
        },
      });

      return {
        message: responseContent,
        tone: detectedTone,
        riskFlags,
        complianceIssues,
        suggestedActions: this.getSuggestedActions(riskFlags, complianceIssues),
      };
    } catch (error) {
      console.error('AI Service error:', error);
      
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError('Failed to generate AI response', 500);
    }
  }

  // Analyze prompt for compliance risks
  async analyzePrompt(
    prompt: string,
    context?: { scenarioId?: string; department?: string }
  ): Promise<{
    isCompliant: boolean;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    risks: Array<{ type: string; description: string; severity: string }>;
    recommendations: string[];
  }> {
    const risks: Array<{ type: string; description: string; severity: string }> = [];
    const recommendations: string[] = [];

    // Check for risk patterns
    for (const [riskType, patterns] of Object.entries(RISK_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(prompt)) {
          risks.push({
            type: riskType.replace(/_/g, ' ').toUpperCase(),
            description: this.getRiskDescription(riskType),
            severity: this.getRiskSeverity(riskType),
          });
          recommendations.push(...this.getRecommendations(riskType));
          break;
        }
      }
    }

    // Determine overall risk level
    const severities = risks.map((r) => r.severity);
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    if (severities.includes('critical')) {
      riskLevel = 'critical';
    } else if (severities.includes('high')) {
      riskLevel = 'high';
    } else if (severities.includes('medium')) {
      riskLevel = 'medium';
    }

    return {
      isCompliant: risks.length === 0,
      riskLevel,
      risks,
      recommendations: [...new Set(recommendations)],
    };
  }

  // Get NPC template based on role
  private getNPCTemplate(role: string): string {
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return NPC_TEMPLATES[normalizedRole as keyof typeof NPC_TEMPLATES] || NPC_TEMPLATES.default;
  }

  // Build system prompt for NPC
  private buildSystemPrompt(
    template: string,
    context: NPCContext,
    scenario: { context: string; complianceRules: unknown }
  ): string {
    const toneMap: Record<string, string> = {
      beginner: 'patient and explanatory',
      intermediate: 'professional and collaborative',
      advanced: 'direct and challenging',
      expert: 'skeptical and demanding',
    };

    let prompt = template
      .replace(/{{npcName}}/g, context.npcName)
      .replace(/{{npcRole}}/g, context.npcRole)
      .replace(/{{tone}}/g, toneMap[context.userLevel] || 'professional');

    // Add scenario context
    prompt += `\n\nCurrent scenario context:\n${scenario.context}`;

    // Add compliance guardrails
    prompt += `\n\nIMPORTANT GUIDELINES:
- Never provide advice that violates company policy or regulations
- If the user suggests something risky, express concern appropriately
- Reference relevant compliance requirements when appropriate
- Stay in character but prioritize accurate information
- Do not hallucinate specific policies - keep responses general if unsure`;

    return prompt;
  }

  // Analyze interaction for risks and compliance issues
  private analyzeInteraction(
    userPrompt: string,
    aiResponse: string
  ): { riskFlags: string[]; complianceIssues: string[] } {
    const riskFlags: string[] = [];
    const complianceIssues: string[] = [];
    const combinedText = `${userPrompt} ${aiResponse}`;

    for (const [riskType, patterns] of Object.entries(RISK_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(combinedText)) {
          riskFlags.push(riskType.toUpperCase());
          break;
        }
      }
    }

    // Check for compliance policy mentions
    for (const [policyType, rules] of Object.entries(COMPLIANCE_POLICIES)) {
      for (const rule of rules) {
        if (combinedText.toLowerCase().includes(rule.toLowerCase().slice(0, 30))) {
          complianceIssues.push(`${policyType}: ${rule}`);
        }
      }
    }

    return {
      riskFlags: [...new Set(riskFlags)],
      complianceIssues: [...new Set(complianceIssues)],
    };
  }

  // Detect tone from response
  private detectTone(response: string): NPCTone {
    const lowerResponse = response.toLowerCase();

    if (/urgent|immediately|asap|critical/i.test(lowerResponse)) {
      return NPCTone.URGENT;
    }
    if (/concerned|worried|careful|caution/i.test(lowerResponse)) {
      return NPCTone.SKEPTICAL;
    }
    if (/must|require|demand|expect/i.test(lowerResponse)) {
      return NPCTone.DEMANDING;
    }
    if (/great|excellent|happy|glad/i.test(lowerResponse)) {
      return NPCTone.FRIENDLY;
    }
    if (/support|help|assist|guide/i.test(lowerResponse)) {
      return NPCTone.SUPPORTIVE;
    }

    return NPCTone.NEUTRAL;
  }

  // Get suggested actions based on risks
  private getSuggestedActions(riskFlags: string[], complianceIssues: string[]): string[] {
    const actions: string[] = [];

    if (riskFlags.includes('IP_VIOLATION')) {
      actions.push('Consult Legal team before proceeding');
      actions.push('Verify content ownership and licensing');
    }

    if (riskFlags.includes('PRIVACY_BREACH')) {
      actions.push('Review GDPR compliance requirements');
      actions.push('Ensure proper data handling procedures');
    }

    if (riskFlags.includes('BIAS_RISK')) {
      actions.push('Request bias audit from Ethics team');
      actions.push('Review AI output for fairness');
    }

    if (riskFlags.includes('SECURITY_RISK')) {
      actions.push('Escalate to IT Security team');
      actions.push('Review data classification policies');
    }

    if (complianceIssues.length > 0) {
      actions.push('Document this interaction for audit trail');
    }

    return [...new Set(actions)];
  }

  // Get risk description
  private getRiskDescription(riskType: string): string {
    const descriptions: Record<string, string> = {
      ip_violation: 'Potential intellectual property infringement detected',
      privacy_breach: 'Personal or sensitive data handling concern',
      bias_risk: 'Potential bias or discrimination risk identified',
      security_risk: 'Security-sensitive information exposure risk',
    };
    return descriptions[riskType] || 'Compliance concern identified';
  }

  // Get risk severity
  private getRiskSeverity(riskType: string): string {
    const severities: Record<string, string> = {
      ip_violation: 'high',
      privacy_breach: 'high',
      bias_risk: 'medium',
      security_risk: 'critical',
    };
    return severities[riskType] || 'medium';
  }

  // Get recommendations for risk type
  private getRecommendations(riskType: string): string[] {
    const recommendations: Record<string, string[]> = {
      ip_violation: [
        'Verify content ownership before use',
        'Consult legal team for licensing questions',
        'Use only approved content sources',
      ],
      privacy_breach: [
        'Apply data minimization principles',
        'Ensure proper consent is obtained',
        'Review GDPR compliance checklist',
      ],
      bias_risk: [
        'Review output for fairness and bias',
        'Consider diverse perspectives in prompts',
        'Request ethics review for high-impact decisions',
      ],
      security_risk: [
        'Never include credentials in prompts',
        'Use only approved AI tools',
        'Report security concerns to IT immediately',
      ],
    };
    return recommendations[riskType] || ['Consult compliance team'];
  }
}

export const aiService = new AIService();
