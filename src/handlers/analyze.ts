import { WebsiteAnalysis, AnalysisRequest, SecurityAnalysis, PerformanceAnalysis, AIInsights } from '../types/analysis';
import { AnalysisResponse, ErrorResponse } from '../types/api';
import { Env } from '../index';
import { analyzeSecurity } from './security';
import { analyzePerformance } from './performance';
import { generateAIInsights } from './ai-insights';

export async function analyzeWebsite(
  request: AnalysisRequest,
  env: Env,
  ctx: ExecutionContext
): Promise<AnalysisResponse | ErrorResponse> {
  try {
    const { url } = request;
    
    // Validate URL
    if (!isValidUrl(url)) {
      return {
        success: false,
        error: 'Invalid URL provided',
        timestamp: Date.now(),
      };
    }

    // Check cache first (if KV is available)
    let cachedAnalysis: WebsiteAnalysis | null = null;
    if (env.ANALYSIS_CACHE) {
      const cacheKey = `analysis:${btoa(url)}`;
      const cached = await env.ANALYSIS_CACHE.get(cacheKey);
      
      if (cached) {
        cachedAnalysis = JSON.parse(cached) as WebsiteAnalysis;
        // Return cached result if less than 1 hour old
        if (Date.now() - cachedAnalysis.timestamp < 3600000) {
          return {
            success: true,
            data: cachedAnalysis,
            timestamp: Date.now(),
          };
        }
      }
    }

    const startTime = Date.now();
    
    // Perform basic HTTP request to get response time and status
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Internet-Health-Analyzer/1.0',
      },
    });

    const responseTime = Date.now() - startTime;
    const statusCode = response.status;

    // Run security analysis
    const security = await analyzeSecurity(url, response, env);

    // Run performance analysis
    const performance = await analyzePerformance(url, response, env, responseTime);

    // Generate AI insights
    const aiInsights = await generateAIInsights(url, security, performance, env);

    // Create analysis result
    const analysis: WebsiteAnalysis = {
      url,
      timestamp: Date.now(),
      status: statusCode >= 200 && statusCode < 300 ? 'success' : 'warning',
      responseTime,
      statusCode,
      security,
      performance,
      aiInsights,
      recommendations: generateRecommendations(security, performance, aiInsights),
    };

    // Cache the result (if KV is available)
    if (env.ANALYSIS_CACHE) {
      const cacheKey = `analysis:${btoa(url)}`;
      await env.ANALYSIS_CACHE.put(cacheKey, JSON.stringify(analysis), {
        expirationTtl: 3600, // 1 hour
      });
    }

    return {
      success: true,
      data: analysis,
      timestamp: Date.now(),
    };

  } catch (error) {
    console.error('Analysis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Analysis failed',
      timestamp: Date.now(),
    };
  }
}

function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

function generateRecommendations(
  security: SecurityAnalysis,
  performance: PerformanceAnalysis,
  aiInsights: AIInsights
): string[] {
  const recommendations: string[] = [];

  // Security recommendations
  if (security.ssl.grade !== 'A+' && security.ssl.grade !== 'A') {
    recommendations.push('Improve SSL/TLS configuration for better security grade');
  }

  if (!security.headers.hsts) {
    recommendations.push('Enable HTTP Strict Transport Security (HSTS) header');
  }

  if (!security.headers.csp) {
    recommendations.push('Implement Content Security Policy (CSP) header');
  }

  if (security.vulnerabilities.count > 0) {
    recommendations.push(`Address ${security.vulnerabilities.count} security vulnerabilities`);
  }

  // Performance recommendations
  if (performance.performanceScore < 80) {
    recommendations.push('Optimize website performance - current score is below 80');
  }

  if (performance.loadTime > 3000) {
    recommendations.push('Reduce page load time - currently over 3 seconds');
  }

  if (performance.largestContentfulPaint > 2500) {
    recommendations.push('Optimize Largest Contentful Paint (LCP)');
  }

  // AI-generated recommendations
  if (aiInsights.optimizationSuggestions && Array.isArray(aiInsights.optimizationSuggestions)) {
    recommendations.push(...aiInsights.optimizationSuggestions);
  }

  return recommendations;
}
