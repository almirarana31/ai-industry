import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import { TokenPayload } from '../types';

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// JWT utilities
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.accessExpiry,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpiry,
  });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, config.jwt.secret) as TokenPayload;
  } catch {
    return null;
  }
};

// Slug generation
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Date utilities
export const getExpiryDate = (duration: string): Date => {
  const now = new Date();
  const match = duration.match(/^(\d+)([smhd])$/);
  
  if (!match) {
    return new Date(now.getTime() + 15 * 60 * 1000); // Default 15 minutes
  }

  const [, amount, unit] = match;
  const value = parseInt(amount, 10);

  switch (unit) {
    case 's':
      return new Date(now.getTime() + value * 1000);
    case 'm':
      return new Date(now.getTime() + value * 60 * 1000);
    case 'h':
      return new Date(now.getTime() + value * 60 * 60 * 1000);
    case 'd':
      return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() + 15 * 60 * 1000);
  }
};

// Score calculation utilities
export const calculateComplianceScore = (
  riskDetection: number,
  ethicalJudgment: number,
  policyAdherence: number,
  promptSafety: number,
  escalation: number
): number => {
  const weights = {
    riskDetection: 0.25,
    ethicalJudgment: 0.2,
    policyAdherence: 0.25,
    promptSafety: 0.2,
    escalation: 0.1,
  };

  return (
    riskDetection * weights.riskDetection +
    ethicalJudgment * weights.ethicalJudgment +
    policyAdherence * weights.policyAdherence +
    promptSafety * weights.promptSafety +
    escalation * weights.escalation
  );
};

export const calculateRiskLevel = (score: number): 'low' | 'medium' | 'high' | 'critical' => {
  if (score >= 80) return 'low';
  if (score >= 60) return 'medium';
  if (score >= 40) return 'high';
  return 'critical';
};

// Pagination helper
export const getPaginationParams = (
  page?: number | string,
  limit?: number | string
) => {
  const pageNum = Math.max(1, parseInt(String(page || 1), 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(String(limit || 10), 10)));
  const skip = (pageNum - 1) * limitNum;

  return { page: pageNum, limit: limitNum, skip };
};

// Error formatting
export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};
