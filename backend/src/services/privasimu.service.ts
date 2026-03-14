/**
 * Privasimu API Client Service
 * External consent management integration
 * 
 * API Documentation: /consent/Dokumentasi API Client.pdf
 */

import axios, { AxiosInstance } from 'axios';

interface PrivasimuConfig {
  baseUrl: string;
  secretKey: string;
  clientId: string;
  collectionPointCode: string;
}

interface GenerateTokenRequest {
  user_id: string;  // email
  name: string;     // full name
}

interface GenerateTokenResponse {
  success: boolean;
  message: string;
  data: {
    token_type: string;
    token: string;
    expired: string;
  };
}

interface ConsentItem {
  code: string;
  name: string;
  description: string;
  is_agree: boolean;
}

interface GetConsentsResponse {
  success: boolean;
  message: string;
  data: ConsentItem[];
}

interface SaveConsentRequest {
  consents: string[];   // Array of consent codes
  is_agree: number[];   // Array of 1 (agree) or 0 (disagree)
}

interface SaveConsentResponse {
  success: boolean;
  message: string;
  data: any[];
}

export class PrivasimuService {
  private client: AxiosInstance;
  private config: PrivasimuConfig;

  constructor() {
    this.config = {
      baseUrl: process.env.PRIVASIMU_BASE_URL || 'https://api.privasimu.com',
      secretKey: process.env.PRIVASIMU_SECRET_KEY || '',
      clientId: process.env.PRIVASIMU_CLIENT_ID || '',
      collectionPointCode: process.env.PRIVASIMU_COLLECTION_POINT_CODE || '',
    };

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[Privasimu] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[Privasimu] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('[Privasimu] Response error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Generate JWT token for user consent management
   * POST /user/consents/request-token
   */
  async generateToken(userId: string, name: string): Promise<GenerateTokenResponse> {
    try {
      const response = await this.client.post<GenerateTokenResponse>(
        '/user/consents/request-token',
        {
          user_id: userId,
          name: name,
        },
        {
          headers: {
            'secret-key': this.config.secretKey,
            'client-id': this.config.clientId,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('[Privasimu] Generate token failed:', error.response?.data || error.message);
      throw new Error(`Failed to generate Privasimu token: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get available consents for a collection point
   * GET /user/consents/{collection_point_code}
   */
  async getConsents(token: string, collectionPointCode?: string): Promise<GetConsentsResponse> {
    const code = collectionPointCode || this.config.collectionPointCode;

    try {
      const response = await this.client.get<GetConsentsResponse>(
        `/user/consents/${code}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('[Privasimu] Get consents failed:', error.response?.data || error.message);
      throw new Error(`Failed to get consents: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Save user's consent selections
   * POST /user/consents/{collection_point_code}
   */
  async saveConsents(
    token: string,
    consents: string[],
    isAgree: boolean[],
    collectionPointCode?: string
  ): Promise<SaveConsentResponse> {
    const code = collectionPointCode || this.config.collectionPointCode;

    // Convert boolean array to number array (1 = agree, 0 = disagree)
    const isAgreeNumbers = isAgree.map(agree => agree ? 1 : 0);

    try {
      const response = await this.client.post<SaveConsentResponse>(
        `/user/consents/${code}`,
        {
          consents: consents,
          is_agree: isAgreeNumbers,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('[Privasimu] Save consents failed:', error.response?.data || error.message);
      throw new Error(`Failed to save consents: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(expiryDate: Date): boolean {
    return new Date() >= expiryDate;
  }

  /**
   * Validate configuration
   */
  validateConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config.baseUrl) {
      errors.push('PRIVASIMU_BASE_URL is not configured');
    }
    if (!this.config.secretKey) {
      errors.push('PRIVASIMU_SECRET_KEY is not configured');
    }
    if (!this.config.clientId) {
      errors.push('PRIVASIMU_CLIENT_ID is not configured');
    }
    if (!this.config.collectionPointCode) {
      errors.push('PRIVASIMU_COLLECTION_POINT_CODE is not configured');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const privasimuService = new PrivasimuService();
