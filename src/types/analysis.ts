export interface WebsiteAnalysis {
  url: string;
  timestamp: number;
  status: 'success' | 'error' | 'warning';
  responseTime: number;
  statusCode: number;
  security: SecurityAnalysis;
  performance: PerformanceAnalysis;
  aiInsights: AIInsights;
  recommendations: string[];
}

export interface SecurityAnalysis {
  ssl: {
    valid: boolean;
    grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
    issuer: string;
    expiry: string;
    protocol: string;
  };
  headers: {
    hsts: boolean;
    csp: boolean;
    xFrameOptions: boolean;
    xContentTypeOptions: boolean;
    referrerPolicy: boolean;
    permissionsPolicy: boolean;
  };
  vulnerabilities: {
    level: 'low' | 'medium' | 'high' | 'critical';
    count: number;
    details: string[];
  };
  threatScore: number; // 0-100, higher = more secure
}

export interface PerformanceAnalysis {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  totalBlockingTime: number;
  performanceScore: number; // 0-100
  globalMetrics: {
    region: string;
    loadTime: number;
    availability: number;
  }[];
}

export interface AIInsights {
  overallScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  strengths: string[];
  weaknesses: string[];
  threats: string[];
  optimizationSuggestions: string[];
}

export interface AnalysisRequest {
  url: string;
  includeGlobalMetrics?: boolean;
  includeThreatDetection?: boolean;
  includeAIInsights?: boolean;
}
