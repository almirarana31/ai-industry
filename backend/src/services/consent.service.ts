/**
 * Consent Management Service
 * Handles user consent preferences with Privasimu integration
 */

import { PrismaClient } from '@prisma/client';
import { privasimuService } from './privasimu.service';

const prisma = new PrismaClient();

export interface ConsentPreference {
  code: string;
  name: string;
  description: string;
  is_agree: boolean;
}

export interface UserConsentData {
  userId: string;
  consents: ConsentPreference[];
  lastSyncedAt: Date | null;
  consentVersion: string;
}

export class ConsentService {
  /**
   * Get user's consent preferences
   * Fetches from database and syncs with Privasimu if needed
   */
  async getUserConsent(userId: string): Promise<UserConsentData | null> {
    try {
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, firstName: true, lastName: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Get existing consent record
      let consentRecord = await prisma.userConsent.findUnique({
        where: { userId },
      });

      // If no record exists or token expired, generate new token and fetch from Privasimu
      if (!consentRecord || this.isTokenExpired(consentRecord.privasimuTokenExpiry)) {
        console.log('[ConsentService] Generating new Privasimu token for user:', userId);
        
        const fullName = `${user.firstName} ${user.lastName}`;
        const tokenResponse = await privasimuService.generateToken(user.email, fullName);

        if (!tokenResponse.success) {
          throw new Error('Failed to generate Privasimu token');
        }

        const token = tokenResponse.data.token;
        const tokenExpiry = new Date(tokenResponse.data.expired);

        // Fetch consents from Privasimu
        const consentsResponse = await privasimuService.getConsents(token);

        if (!consentsResponse.success) {
          throw new Error('Failed to fetch consents from Privasimu');
        }

        // Update or create consent record
        consentRecord = await prisma.userConsent.upsert({
          where: { userId },
          create: {
            userId,
            privasimuToken: token,
            privasimuTokenExpiry: tokenExpiry,
            consents: consentsResponse.data,
            lastSyncedAt: new Date(),
          },
          update: {
            privasimuToken: token,
            privasimuTokenExpiry: tokenExpiry,
            consents: consentsResponse.data,
            lastSyncedAt: new Date(),
          },
        });
      }

      return {
        userId: consentRecord.userId,
        consents: consentRecord.consents as ConsentPreference[],
        lastSyncedAt: consentRecord.lastSyncedAt,
        consentVersion: consentRecord.consentVersion,
      };
    } catch (error: any) {
      console.error('[ConsentService] Get user consent failed:', error);
      throw error;
    }
  }

  /**
   * Update user's consent preferences
   * Saves to Privasimu and updates local database
   */
  async updateUserConsent(
    userId: string,
    consentUpdates: { code: string; is_agree: boolean }[]
  ): Promise<UserConsentData> {
    try {
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, firstName: true, lastName: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Get existing consent record
      let consentRecord = await prisma.userConsent.findUnique({
        where: { userId },
      });

      // Generate new token if needed
      if (!consentRecord || this.isTokenExpired(consentRecord.privasimuTokenExpiry)) {
        const fullName = `${user.firstName} ${user.lastName}`;
        const tokenResponse = await privasimuService.generateToken(user.email, fullName);

        if (!tokenResponse.success) {
          throw new Error('Failed to generate Privasimu token');
        }

        const token = tokenResponse.data.token;
        const tokenExpiry = new Date(tokenResponse.data.expired);

        consentRecord = await prisma.userConsent.upsert({
          where: { userId },
          create: {
            userId,
            privasimuToken: token,
            privasimuTokenExpiry: tokenExpiry,
            consents: [],
            lastSyncedAt: new Date(),
          },
          update: {
            privasimuToken: token,
            privasimuTokenExpiry: tokenExpiry,
          },
        });
      }

      // Prepare data for Privasimu
      const consentCodes = consentUpdates.map(c => c.code);
      const isAgreeArray = consentUpdates.map(c => c.is_agree);

      // Save to Privasimu
      const saveResponse = await privasimuService.saveConsents(
        consentRecord.privasimuToken!,
        consentCodes,
        isAgreeArray
      );

      if (!saveResponse.success) {
        throw new Error('Failed to save consents to Privasimu');
      }

      // Fetch updated consents from Privasimu
      const consentsResponse = await privasimuService.getConsents(consentRecord.privasimuToken!);

      if (!consentsResponse.success) {
        throw new Error('Failed to fetch updated consents');
      }

      // Update local database
      const updatedRecord = await prisma.userConsent.update({
        where: { userId },
        data: {
          consents: consentsResponse.data,
          lastSyncedAt: new Date(),
        },
      });

      return {
        userId: updatedRecord.userId,
        consents: updatedRecord.consents as ConsentPreference[],
        lastSyncedAt: updatedRecord.lastSyncedAt,
        consentVersion: updatedRecord.consentVersion,
      };
    } catch (error: any) {
      console.error('[ConsentService] Update user consent failed:', error);
      throw error;
    }
  }

  /**
   * Sync user consent with Privasimu
   * Forces a refresh from the external service
   */
  async syncUserConsent(userId: string): Promise<UserConsentData> {
    try {
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, firstName: true, lastName: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Generate new token
      const fullName = `${user.firstName} ${user.lastName}`;
      const tokenResponse = await privasimuService.generateToken(user.email, fullName);

      if (!tokenResponse.success) {
        throw new Error('Failed to generate Privasimu token');
      }

      const token = tokenResponse.data.token;
      const tokenExpiry = new Date(tokenResponse.data.expired);

      // Fetch consents from Privasimu
      const consentsResponse = await privasimuService.getConsents(token);

      if (!consentsResponse.success) {
        throw new Error('Failed to fetch consents from Privasimu');
      }

      // Update database
      const updatedRecord = await prisma.userConsent.upsert({
        where: { userId },
        create: {
          userId,
          privasimuToken: token,
          privasimuTokenExpiry: tokenExpiry,
          consents: consentsResponse.data,
          lastSyncedAt: new Date(),
        },
        update: {
          privasimuToken: token,
          privasimuTokenExpiry: tokenExpiry,
          consents: consentsResponse.data,
          lastSyncedAt: new Date(),
        },
      });

      return {
        userId: updatedRecord.userId,
        consents: updatedRecord.consents as ConsentPreference[],
        lastSyncedAt: updatedRecord.lastSyncedAt,
        consentVersion: updatedRecord.consentVersion,
      };
    } catch (error: any) {
      console.error('[ConsentService] Sync user consent failed:', error);
      throw error;
    }
  }

  /**
   * Check if Privasimu token is expired
   */
  private isTokenExpired(expiryDate: Date | null): boolean {
    if (!expiryDate) return true;
    return new Date() >= expiryDate;
  }

  /**
   * Get consent history (audit trail)
   * Returns audit logs related to consent changes
   */
  async getConsentHistory(userId: string, limit: number = 50): Promise<any[]> {
    try {
      const auditLogs = await prisma.auditLog.findMany({
        where: {
          userId,
          resourceType: 'consent',
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });

      return auditLogs;
    } catch (error: any) {
      console.error('[ConsentService] Get consent history failed:', error);
      throw error;
    }
  }

  /**
   * Log consent change to audit trail
   */
  async logConsentChange(
    userId: string,
    organizationId: string,
    action: string,
    details: any,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          organizationId,
          action: 'SETTINGS_CHANGED',
          resourceType: 'consent',
          resourceId: userId,
          details: {
            action,
            ...details,
          },
          ipAddress,
          userAgent,
        },
      });
    } catch (error: any) {
      console.error('[ConsentService] Log consent change failed:', error);
      // Don't throw - logging failure shouldn't break the main flow
    }
  }
}

// Export singleton instance
export const consentService = new ConsentService();
