import { WebsiteAnalysis } from './analysis';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface AnalysisResponse extends APIResponse<WebsiteAnalysis> {}

export interface ErrorResponse extends APIResponse {
  success: false;
  error: string;
  code?: string;
}

export interface HealthCheckResponse extends APIResponse {
  data: {
    status: 'healthy';
    version: string;
    uptime: number;
    services: {
      openai: boolean;
      security: boolean;
      performance: boolean;
    };
  };
}
