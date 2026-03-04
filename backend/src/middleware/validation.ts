import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Validation middleware factory
export const validate = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.errors.map((e) => ({
            field: e.path.slice(1).join('.'),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};

// Auth schemas
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number'
      ),
    firstName: z.string().min(1, 'First name is required').max(50),
    lastName: z.string().min(1, 'Last name is required').max(50),
    organizationId: z.string().uuid().optional(),
    organizationName: z.string().min(2).max(100).optional(),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});

// Organization schemas
export const createOrganizationSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    domain: z.string().optional(),
    subscriptionTier: z.enum(['FREE', 'STANDARD', 'ENTERPRISE', 'UNLIMITED']).optional(),
  }),
});

// User schemas
export const inviteUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    role: z.enum(['EMPLOYEE', 'MANAGER', 'COMPLIANCE_ADMIN', 'SUPER_ADMIN']).optional(),
    department: z.string().max(50).optional(),
    jobTitle: z.string().max(100).optional(),
  }),
});

export const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum(['EMPLOYEE', 'MANAGER', 'COMPLIANCE_ADMIN', 'SUPER_ADMIN']),
  }),
  params: z.object({
    userId: z.string().uuid('Invalid user ID'),
  }),
});

// Module schemas
export const moduleIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid module ID'),
  }),
});

// Scenario schemas
export const startScenarioSchema = z.object({
  body: z.object({
    scenarioId: z.string().uuid('Invalid scenario ID'),
  }),
});

export const submitDecisionSchema = z.object({
  body: z.object({
    sessionAttemptId: z.string().uuid('Invalid session attempt ID'),
    decisionId: z.string(),
    choice: z.string(),
    context: z.record(z.unknown()).optional(),
  }),
});

// AI interaction schemas
export const aiPromptSchema = z.object({
  body: z.object({
    scenarioId: z.string().uuid('Invalid scenario ID'),
    sessionAttemptId: z.string().uuid().optional(),
    prompt: z.string().min(1, 'Prompt is required').max(4000),
    npcName: z.string().optional(),
    npcRole: z.string().optional(),
  }),
});

// Analytics schemas
export const analyticsQuerySchema = z.object({
  query: z.object({
    period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
});

// Pagination schema
export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

// Export types
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>['body'];
export type InviteUserInput = z.infer<typeof inviteUserSchema>['body'];
export type SubmitDecisionInput = z.infer<typeof submitDecisionSchema>['body'];
export type AIPromptInput = z.infer<typeof aiPromptSchema>['body'];
