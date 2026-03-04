import { PrismaClient, UserRole, ModuleCategory, ScenarioType, Difficulty } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Fortune 500 style enterprise organization
  const organization = await prisma.organization.upsert({
    where: { slug: 'globaltech-corp' },
    update: {},
    create: {
      name: 'GlobalTech Corporation',
      slug: 'globaltech-corp',
      domain: 'globaltech.com',
      subscriptionTier: 'ENTERPRISE',
      settings: {
        enableAIChat: true,
        requireApproval: true,
        maxUsersPerMonth: 1000,
        features: ['analytics', 'audit', 'compliance', 'ai-training'],
      },
    },
  });

  console.log('✅ Organization created:', organization.name);

  // Create users with different roles
  const passwordHash = await bcrypt.hash('Password123!', 12);

  const users = [
    {
      email: 'admin@globaltech.com',
      firstName: 'Sarah',
      lastName: 'Chen',
      role: UserRole.SUPER_ADMIN,
      department: 'Compliance',
      jobTitle: 'Chief Compliance Officer',
    },
    {
      email: 'compliance@globaltech.com',
      firstName: 'Michael',
      lastName: 'Park',
      role: UserRole.COMPLIANCE_ADMIN,
      department: 'Legal',
      jobTitle: 'Compliance Manager',
    },
    {
      email: 'hr.director@globaltech.com',
      firstName: 'Amanda',
      lastName: 'Foster',
      role: UserRole.MANAGER,
      department: 'Human Resources',
      jobTitle: 'HR Director',
    },
    {
      email: 'marketing.director@globaltech.com',
      firstName: 'James',
      lastName: 'Morrison',
      role: UserRole.MANAGER,
      department: 'Marketing',
      jobTitle: 'Marketing Director',
    },
    {
      email: 'it.manager@globaltech.com',
      firstName: 'Kevin',
      lastName: 'Rodriguez',
      role: UserRole.MANAGER,
      department: 'IT',
      jobTitle: 'IT Manager',
    },
    {
      email: 'employee1@globaltech.com',
      firstName: 'Emily',
      lastName: 'Watson',
      role: UserRole.EMPLOYEE,
      department: 'Marketing',
      jobTitle: 'Marketing Specialist',
    },
    {
      email: 'employee2@globaltech.com',
      firstName: 'David',
      lastName: 'Kim',
      role: UserRole.EMPLOYEE,
      department: 'IT',
      jobTitle: 'Software Developer',
    },
    {
      email: 'employee3@globaltech.com',
      firstName: 'Lisa',
      lastName: 'Thompson',
      role: UserRole.EMPLOYEE,
      department: 'Human Resources',
      jobTitle: 'HR Specialist',
    },
    {
      email: 'employee4@globaltech.com',
      firstName: 'Robert',
      lastName: 'Garcia',
      role: UserRole.EMPLOYEE,
      department: 'Sales',
      jobTitle: 'Sales Representative',
    },
    {
      email: 'employee5@globaltech.com',
      firstName: 'Jennifer',
      lastName: 'Lee',
      role: UserRole.EMPLOYEE,
      department: 'Finance',
      jobTitle: 'Financial Analyst',
    },
  ];

  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        passwordHash,
        organizationId: organization.id,
        emailVerified: true,
      },
    });
  }

  console.log('✅ Users created:', users.length);

  // Create 5 training modules
  const modules = [
    {
      title: 'AI Fundamentals & Prompting',
      slug: 'ai-fundamentals-prompting',
      description: 'Learn the basics of AI systems and how to write effective, compliant prompts.',
      category: ModuleCategory.AI_FUNDAMENTALS,
      difficulty: Difficulty.BEGINNER,
      estimatedMinutes: 45,
      order: 1,
      objectives: [
        'Understand how AI language models work',
        'Write clear and effective prompts',
        'Recognize AI limitations and hallucinations',
        'Apply prompt engineering best practices',
      ],
    },
    {
      title: 'Bias & Ethics in AI',
      slug: 'bias-ethics-ai',
      description: 'Understand algorithmic bias, ethical considerations, and fairness in AI systems.',
      category: ModuleCategory.BIAS_ETHICS,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedMinutes: 60,
      order: 2,
      objectives: [
        'Identify potential sources of AI bias',
        'Evaluate AI outputs for fairness',
        'Apply ethical frameworks to AI decisions',
        'Implement bias mitigation strategies',
      ],
    },
    {
      title: 'Governance & Escalation',
      slug: 'governance-escalation',
      description: 'Learn organizational AI governance structures and when to escalate concerns.',
      category: ModuleCategory.GOVERNANCE_ESCALATION,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedMinutes: 45,
      order: 3,
      objectives: [
        'Understand AI governance frameworks',
        'Identify situations requiring escalation',
        'Navigate approval processes correctly',
        'Document AI usage appropriately',
      ],
    },
    {
      title: 'IP & Content Liability',
      slug: 'ip-content-liability',
      description: 'Navigate intellectual property concerns and content ownership in AI-generated work.',
      category: ModuleCategory.IP_CONTENT_LIABILITY,
      difficulty: Difficulty.ADVANCED,
      estimatedMinutes: 50,
      order: 4,
      objectives: [
        'Understand copyright implications of AI content',
        'Identify IP risks in AI workflows',
        'Apply licensing requirements correctly',
        'Protect company intellectual property',
      ],
    },
    {
      title: 'Data Privacy & Security',
      slug: 'data-privacy-security',
      description: 'Master GDPR compliance, data handling, and security in AI applications.',
      category: ModuleCategory.DATA_PRIVACY_SECURITY,
      difficulty: Difficulty.ADVANCED,
      estimatedMinutes: 55,
      order: 5,
      objectives: [
        'Apply GDPR principles to AI usage',
        'Handle personal data safely in AI workflows',
        'Implement data minimization practices',
        'Respond to data subject requests',
      ],
    },
  ];

  const createdModules = [];
  for (const moduleData of modules) {
    const module = await prisma.trainingModule.upsert({
      where: {
        slug_organizationId: {
          slug: moduleData.slug,
          organizationId: organization.id,
        },
      },
      update: {},
      create: {
        ...moduleData,
        organizationId: organization.id,
        isPublished: true,
      },
    });
    createdModules.push(module);
  }

  console.log('✅ Training modules created:', modules.length);

  // Create scenarios for each module (3 per module)
  const scenarioData = [
    // Module 1: AI Fundamentals & Prompting
    {
      moduleSlug: 'ai-fundamentals-prompting',
      scenarios: [
        {
          title: 'Your First AI Prompt',
          description: 'Practice writing effective prompts for a marketing task.',
          context: 'You need to use the company AI assistant to draft social media content. The Marketing Director has asked for posts promoting the new product launch.',
          scenarioType: ScenarioType.AI_CHAT,
          decisionTree: {
            steps: [
              { id: 'start', prompt: 'Write a social media post', options: ['detailed', 'vague', 'copy-competitor'] },
              { id: 'review', prompt: 'AI generated content', options: ['approve', 'edit', 'regenerate'] },
            ],
          },
          riskFactors: ['prompt_quality', 'content_accuracy'],
        },
        {
          title: 'Handling AI Hallucinations',
          description: 'Learn to identify and handle when AI provides incorrect information.',
          context: 'The AI assistant provided statistics about your product that seem impressive but you cannot verify them.',
          scenarioType: ScenarioType.DOCUMENT_REVIEW,
          decisionTree: {
            steps: [
              { id: 'verify', prompt: 'Check the AI statistics', options: ['publish-as-is', 'verify-sources', 'ask-ai-for-sources'] },
            ],
          },
          riskFactors: ['hallucination_risk', 'accuracy'],
        },
        {
          title: 'Prompt Engineering Best Practices',
          description: 'Apply advanced prompt techniques for better AI outputs.',
          context: 'You need to generate a detailed product comparison but the AI keeps giving generic responses.',
          scenarioType: ScenarioType.AI_CHAT,
          decisionTree: {
            steps: [
              { id: 'improve', prompt: 'Improve your prompt', options: ['add-context', 'use-examples', 'be-specific'] },
            ],
          },
          riskFactors: ['prompt_quality'],
        },
      ],
    },
    // Module 2: Bias & Ethics
    {
      moduleSlug: 'bias-ethics-ai',
      scenarios: [
        {
          title: 'Biased Hiring Recommendations',
          description: 'Evaluate AI-generated candidate rankings for potential bias.',
          context: 'HR is using an AI tool to rank job candidates. You notice the top recommendations lack diversity.',
          scenarioType: ScenarioType.DOCUMENT_REVIEW,
          decisionTree: {
            steps: [
              { id: 'analyze', prompt: 'Review the rankings', options: ['accept-rankings', 'investigate-bias', 'ignore-concerns'] },
              { id: 'action', prompt: 'What action to take', options: ['escalate-to-hr', 'request-audit', 'proceed-anyway'] },
            ],
          },
          riskFactors: ['bias_risk', 'discrimination'],
        },
        {
          title: 'Marketing Content Ethics',
          description: 'Review AI-generated marketing content for ethical concerns.',
          context: 'The AI created ad copy that uses fear-based messaging targeting vulnerable demographics.',
          scenarioType: ScenarioType.DOCUMENT_REVIEW,
          decisionTree: {
            steps: [
              { id: 'evaluate', prompt: 'Evaluate the content', options: ['approve', 'reject', 'modify'] },
            ],
          },
          riskFactors: ['ethical_concern', 'reputation_risk'],
        },
        {
          title: 'Customer Service Fairness',
          description: 'Ensure AI customer service responses are fair and unbiased.',
          context: 'Customer complaints suggest the AI chatbot gives different response quality based on customer profile.',
          scenarioType: ScenarioType.ESCALATION_DECISION,
          decisionTree: {
            steps: [
              { id: 'investigate', prompt: 'How to proceed', options: ['dismiss-complaints', 'audit-system', 'disable-temporarily'] },
            ],
          },
          riskFactors: ['bias_risk', 'customer_trust'],
        },
      ],
    },
    // Module 3: Governance & Escalation
    {
      moduleSlug: 'governance-escalation',
      scenarios: [
        {
          title: 'Unauthorized AI Tool Usage',
          description: 'Handle a colleague using an unapproved AI tool for work.',
          context: 'A team member is using a free online AI tool to process customer data, bypassing approved systems.',
          scenarioType: ScenarioType.ESCALATION_DECISION,
          decisionTree: {
            steps: [
              { id: 'respond', prompt: 'How do you respond', options: ['report-immediately', 'warn-colleague', 'ignore'] },
            ],
          },
          riskFactors: ['policy_violation', 'security_risk'],
        },
        {
          title: 'AI Project Approval Process',
          description: 'Navigate the proper channels for a new AI implementation.',
          context: 'Your department wants to implement an AI solution but you are unsure about the approval process.',
          scenarioType: ScenarioType.POLICY_APPLICATION,
          decisionTree: {
            steps: [
              { id: 'process', prompt: 'What is your first step', options: ['start-using', 'check-policy', 'ask-manager'] },
            ],
          },
          riskFactors: ['governance', 'compliance'],
        },
        {
          title: 'High-Risk AI Decision',
          description: 'Identify when an AI application requires additional oversight.',
          context: 'The sales team wants to use AI for automated contract modifications without human review.',
          scenarioType: ScenarioType.ESCALATION_DECISION,
          decisionTree: {
            steps: [
              { id: 'assess', prompt: 'Assess the risk level', options: ['low-risk', 'high-risk', 'uncertain'] },
              { id: 'action', prompt: 'What action to take', options: ['approve', 'require-oversight', 'escalate-to-legal'] },
            ],
          },
          riskFactors: ['high_risk_ai', 'human_oversight'],
        },
      ],
    },
    // Module 4: IP & Content Liability
    {
      moduleSlug: 'ip-content-liability',
      scenarios: [
        {
          title: 'Competitor Content in AI Prompts',
          description: 'Navigate IP concerns when using competitor materials as AI input.',
          context: 'Marketing asks you to use AI to analyze and "improve upon" a competitor\'s successful ad campaign.',
          scenarioType: ScenarioType.EMAIL_RESPONSE,
          decisionTree: {
            steps: [
              { id: 'respond', prompt: 'How do you respond to the request', options: ['proceed', 'decline', 'consult-legal'] },
            ],
          },
          riskFactors: ['ip_violation', 'copyright'],
        },
        {
          title: 'AI-Generated Image Ownership',
          description: "Determine ownership and usage rights for AI-generated visual content.",
          context: 'The design team created images using an AI tool. A client now wants exclusive rights to the images.',
          scenarioType: ScenarioType.POLICY_APPLICATION,
          decisionTree: {
            steps: [
              { id: 'review', prompt: 'Review the situation', options: ['grant-rights', 'check-license', 'deny-exclusivity'] },
            ],
          },
          riskFactors: ['ip_ownership', 'licensing'],
        },
        {
          title: 'Copyright in Training Data',
          description: 'Address concerns about copyrighted content in AI training.',
          context: 'You discover the custom AI model was trained on copyrighted industry reports without permission.',
          scenarioType: ScenarioType.ESCALATION_DECISION,
          decisionTree: {
            steps: [
              { id: 'action', prompt: 'What is the appropriate action', options: ['continue-using', 'stop-and-investigate', 'report-to-legal'] },
            ],
          },
          riskFactors: ['copyright_violation', 'legal_risk'],
        },
      ],
    },
    // Module 5: Data Privacy & Security
    {
      moduleSlug: 'data-privacy-security',
      scenarios: [
        {
          title: 'Customer Data in AI Prompts',
          description: 'Handle a request to use customer data for AI analysis.',
          context: 'Sales wants to upload customer purchase history to an external AI tool for trend analysis.',
          scenarioType: ScenarioType.EMAIL_RESPONSE,
          decisionTree: {
            steps: [
              { id: 'evaluate', prompt: 'Evaluate the request', options: ['approve', 'deny', 'find-alternative'] },
            ],
          },
          riskFactors: ['privacy_breach', 'gdpr_violation'],
        },
        {
          title: 'GDPR Data Subject Request',
          description: 'Process a request related to AI-processed personal data.',
          context: 'A customer requests deletion of all their data, including data used to train the recommendation AI.',
          scenarioType: ScenarioType.POLICY_APPLICATION,
          decisionTree: {
            steps: [
              { id: 'process', prompt: 'How do you process this request', options: ['delete-all', 'delete-partial', 'deny-request'] },
            ],
          },
          riskFactors: ['gdpr_compliance', 'data_rights'],
        },
        {
          title: 'Sensitive Data Exposure',
          description: 'Respond to potential exposure of sensitive data through AI.',
          context: 'An employee accidentally included confidential salary data in a prompt to an external AI chatbot.',
          scenarioType: ScenarioType.ESCALATION_DECISION,
          decisionTree: {
            steps: [
              { id: 'immediate', prompt: 'What is your immediate action', options: ['assess-impact', 'report-breach', 'do-nothing'] },
              { id: 'followup', prompt: 'What follow-up is needed', options: ['document-only', 'notify-affected', 'full-incident-response'] },
            ],
          },
          riskFactors: ['data_breach', 'security_incident'],
        },
      ],
    },
  ];

  for (const moduleScenarios of scenarioData) {
    const module = createdModules.find((m) => m.slug === moduleScenarios.moduleSlug);
    if (!module) continue;

    for (let i = 0; i < moduleScenarios.scenarios.length; i++) {
      const scenarioInfo = moduleScenarios.scenarios[i];
      await prisma.scenario.create({
        data: {
          ...scenarioInfo,
          moduleId: module.id,
          order: i + 1,
          complianceRules: ['EU_AI_ACT', 'GDPR', 'INTERNAL_POLICY'],
        },
      });
    }
  }

  console.log('✅ Scenarios created: 15');

  // Create pre-filled compliance violations
  const violations = [
    {
      incidentType: 'IP_VIOLATION' as const,
      severity: 'HIGH' as const,
      description: 'Marketing team used competitor product images in AI-generated content without permission.',
      violatedPolicies: ['IP Policy Section 4.2', 'Content Guidelines 2.1'],
      regulatoryFlags: ['Copyright Act'],
      isResolved: true,
      resolution: 'Content removed and team completed mandatory IP training.',
    },
    {
      incidentType: 'PRIVACY_BREACH' as const,
      severity: 'CRITICAL' as const,
      description: 'Customer PII was inadvertently included in prompts to external AI tool.',
      violatedPolicies: ['Data Protection Policy 3.1', 'AI Usage Policy 5.2'],
      regulatoryFlags: ['GDPR Article 5', 'GDPR Article 32'],
      isResolved: true,
      resolution: 'Incident reported to DPO, affected customers notified, enhanced training implemented.',
    },
    {
      incidentType: 'BIAS_DETECTED' as const,
      severity: 'MEDIUM' as const,
      description: 'AI-powered resume screening showed statistical bias against certain demographic groups.',
      violatedPolicies: ['Equal Opportunity Policy 2.3', 'AI Ethics Guidelines 4.1'],
      regulatoryFlags: ['EU AI Act Article 10'],
      isResolved: false,
    },
    {
      incidentType: 'POLICY_VIOLATION' as const,
      severity: 'LOW' as const,
      description: 'Employee used unapproved AI tool for non-sensitive task.',
      violatedPolicies: ['AI Usage Policy 1.1'],
      regulatoryFlags: [],
      isResolved: true,
      resolution: 'Verbal warning issued, employee completed policy refresher.',
    },
    {
      incidentType: 'UNAUTHORIZED_USE' as const,
      severity: 'MEDIUM' as const,
      description: 'Department deployed AI chatbot without going through approval process.',
      violatedPolicies: ['AI Governance Policy 6.1', 'IT Security Policy 3.4'],
      regulatoryFlags: ['EU AI Act Article 16'],
      isResolved: false,
    },
  ];

  for (const violation of violations) {
    await prisma.riskIncident.create({
      data: {
        ...violation,
        organizationId: organization.id,
        resolvedAt: violation.isResolved ? new Date() : null,
      },
    });
  }

  console.log('✅ Risk incidents created:', violations.length);

  // Create sample analytics snapshot
  await prisma.analyticsSnapshot.create({
    data: {
      organizationId: organization.id,
      period: 'WEEKLY',
      totalUsers: 10,
      activeUsers: 8,
      completedModules: 12,
      avgComplianceScore: 78.5,
      complianceReadiness: 75.0,
      avgRiskScore: 22.3,
      totalViolations: 5,
      criticalIncidents: 1,
      avgPromptSuccessRate: 85.2,
      avgEthicalScore: 82.1,
      avgKnowledgeRetention: 79.8,
      departmentStats: {
        Marketing: { userCount: 2, avgComplianceScore: 76, avgRiskScore: 25, completionRate: 80 },
        IT: { userCount: 2, avgComplianceScore: 85, avgRiskScore: 15, completionRate: 90 },
        'Human Resources': { userCount: 2, avgComplianceScore: 80, avgRiskScore: 20, completionRate: 85 },
        Sales: { userCount: 1, avgComplianceScore: 70, avgRiskScore: 30, completionRate: 60 },
        Finance: { userCount: 1, avgComplianceScore: 82, avgRiskScore: 18, completionRate: 75 },
        Compliance: { userCount: 1, avgComplianceScore: 95, avgRiskScore: 5, completionRate: 100 },
        Legal: { userCount: 1, avgComplianceScore: 92, avgRiskScore: 8, completionRate: 100 },
      },
      riskTrend: [
        { date: '2026-02-24', value: 28 },
        { date: '2026-02-25', value: 25 },
        { date: '2026-02-26', value: 24 },
        { date: '2026-02-27', value: 22 },
        { date: '2026-02-28', value: 23 },
        { date: '2026-03-01', value: 21 },
        { date: '2026-03-02', value: 22 },
      ],
      complianceTrend: [
        { date: '2026-02-24', value: 72 },
        { date: '2026-02-25', value: 74 },
        { date: '2026-02-26', value: 75 },
        { date: '2026-02-27', value: 76 },
        { date: '2026-02-28', value: 77 },
        { date: '2026-03-01', value: 78 },
        { date: '2026-03-02', value: 79 },
      ],
    },
  });

  console.log('✅ Analytics snapshot created');

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🌱 Database seeding completed successfully!                ║
║                                                              ║
║   Organization: GlobalTech Corporation                       ║
║   Users: 10 (various roles)                                  ║
║   Training Modules: 5                                        ║
║   Scenarios: 15 (3 per module)                               ║
║   Risk Incidents: 5                                          ║
║                                                              ║
║   Default login credentials:                                 ║
║   Email: admin@globaltech.com                                ║
║   Password: Password123!                                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
