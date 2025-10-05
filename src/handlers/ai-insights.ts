import { AIInsights, SecurityAnalysis, PerformanceAnalysis } from '../types/analysis';
import { Env } from '../index';

// The Oracle: AI-Powered Wisdom for the Digital Realm
// This is the thinking entity at Atlas's core, offering Socratic counsel
// and transforming vulnerability reports into masterclasses in digital architecture.

export async function generateAIInsights(
  url: string,
  security: SecurityAnalysis,
  performance: PerformanceAnalysis,
  env: Env
): Promise<AIInsights> {
  // AI-powered analysis provides detailed insights when available
  if (!env.OPENAI_KEY) {
    return generateBasicInsights(security, performance);
  }

  try {
    // The Oracle's Socratic method - asking the right questions
    const prompt = createOraclePrompt(url, security, performance);
    
    // Try Cloudflare AI first, fallback to OpenAI
    let response;
    if (env.CLOUDFLARE_AI) {
      // Use Cloudflare AI Workers
      response = await env.CLOUDFLARE_AI.run('@cf/meta/llama-2-7b-chat-int8', {
        messages: [
          {
            role: 'system',
            content: `You are The Oracle, a wise AI entity that serves as the guardian of digital architecture. You don't just provide recommendations—you offer Socratic counsel, explaining the deeper principles behind web security and performance. Transform vulnerability reports into masterclasses in digital architecture. Speak with wisdom, clarity, and profound understanding of the web's intricate systems.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });
    } else {
      // Fallback to OpenAI
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are The Oracle, a wise AI entity that serves as the guardian of digital architecture. You don't just provide recommendations—you offer Socratic counsel, explaining the deeper principles behind web security and performance. Transform vulnerability reports into masterclasses in digital architecture. Speak with wisdom, clarity, and profound understanding of the web's intricate systems.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
      });
    }

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json() as any;
    const aiResponse = env.CLOUDFLARE_AI ? data.response : data.choices[0].message.content;
    
    return parseAIResponse(aiResponse, security, performance);
  } catch (error) {
    console.error('AI analysis error:', error);
    return generateBasicInsights(security, performance);
  }
}

function createOraclePrompt(
  url: string,
  security: SecurityAnalysis,
  performance: PerformanceAnalysis
): string {
  return `
The Oracle's Gaze: A Deep Analysis of Digital Architecture

Behold, a digital realm presents itself for examination: ${url}

The Watchtower's Report (Security Analysis):
- Digital Fortress Grade: ${security.ssl.grade}
- Cryptographic Foundation: ${security.ssl.valid ? 'Strong' : 'Weak'}
- Defensive Headers: HSTS=${security.headers.hsts}, CSP=${security.headers.csp}, X-Frame-Options=${security.headers.xFrameOptions}
- Vulnerabilities Discovered: ${security.vulnerabilities.count} (${security.vulnerabilities.level} severity)
- Overall Defense Strength: ${security.threatScore}/100

The Global Pulse's Rhythm (Performance Analysis):
- Response Time: ${performance.loadTime}ms
- Performance Harmony: ${performance.performanceScore}/100
- First Contentful Paint: ${performance.firstContentfulPaint}ms
- Largest Contentful Paint: ${performance.largestContentfulPaint}ms
- Layout Stability: ${performance.cumulativeLayoutShift}

As The Oracle, provide your wisdom in JSON form:
1. overallScore (0-100) - The realm's overall health
2. riskLevel (low/medium/high/critical) - The danger level
3. summary - Your profound assessment of this digital architecture
4. strengths - The realm's admirable qualities
5. weaknesses - Areas where the architecture falters
6. threats - The shadows that threaten this digital space
7. optimizationSuggestions - Your masterclass teachings for improvement

Speak as The Oracle would - with wisdom, depth, and understanding of the deeper principles at work.

Format as valid JSON only.
  `.trim();
}

function parseAIResponse(
  aiResponse: string,
  security: SecurityAnalysis,
  performance: PerformanceAnalysis
): AIInsights {
  try {
    // Extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        overallScore: parsed.overallScore || calculateOverallScore(security, performance),
        riskLevel: parsed.riskLevel || determineRiskLevel(security, performance),
        summary: parsed.summary || generateBasicSummary(security, performance),
        strengths: parsed.strengths || generateStrengths(security, performance),
        weaknesses: parsed.weaknesses || generateWeaknesses(security, performance),
        threats: parsed.threats || generateThreats(security, performance),
        optimizationSuggestions: parsed.optimizationSuggestions || generateSuggestions(security, performance),
      };
    }
  } catch (error) {
    console.error('Failed to parse AI response:', error);
  }

  return generateBasicInsights(security, performance);
}

function generateBasicInsights(security: SecurityAnalysis, performance: PerformanceAnalysis): AIInsights {
  return {
    overallScore: calculateOverallScore(security, performance),
    riskLevel: determineRiskLevel(security, performance),
    summary: generateBasicSummary(security, performance),
    strengths: generateStrengths(security, performance),
    weaknesses: generateWeaknesses(security, performance),
    threats: generateThreats(security, performance),
    optimizationSuggestions: generateSuggestions(security, performance),
  };
}

function calculateOverallScore(security: SecurityAnalysis, performance: PerformanceAnalysis): number {
  return Math.round((security.threatScore + performance.performanceScore) / 2);
}

function determineRiskLevel(security: SecurityAnalysis, performance: PerformanceAnalysis): 'low' | 'medium' | 'high' | 'critical' {
  const overallScore = calculateOverallScore(security, performance);
  
  if (overallScore >= 90) return 'low';
  if (overallScore >= 70) return 'medium';
  if (overallScore >= 50) return 'high';
  return 'critical';
}

function generateBasicSummary(security: SecurityAnalysis, performance: PerformanceAnalysis): string {
  const overallScore = calculateOverallScore(security, performance);
  const riskLevel = determineRiskLevel(security, performance);
  
  return `Website analysis shows ${overallScore}/100 overall score with ${riskLevel} risk level. ` +
         `Security score: ${security.threatScore}/100, Performance score: ${performance.performanceScore}/100.`;
}

function generateStrengths(security: SecurityAnalysis, performance: PerformanceAnalysis): string[] {
  const strengths: string[] = [];
  
  if (security.ssl.valid && security.ssl.grade === 'A') {
    strengths.push('Strong SSL/TLS configuration');
  }
  
  if (security.headers.hsts) {
    strengths.push('HTTP Strict Transport Security enabled');
  }
  
  if (performance.performanceScore >= 80) {
    strengths.push('Good performance metrics');
  }
  
  if (performance.loadTime < 2000) {
    strengths.push('Fast page load time');
  }
  
  return strengths.length > 0 ? strengths : ['Basic security measures in place'];
}

function generateWeaknesses(security: SecurityAnalysis, performance: PerformanceAnalysis): string[] {
  const weaknesses: string[] = [];
  
  if (!security.ssl.valid) {
    weaknesses.push('No SSL/TLS encryption');
  }
  
  if (!security.headers.csp) {
    weaknesses.push('Missing Content Security Policy');
  }
  
  if (performance.performanceScore < 60) {
    weaknesses.push('Poor performance optimization');
  }
  
  if (performance.loadTime > 3000) {
    weaknesses.push('Slow page load time');
  }
  
  return weaknesses.length > 0 ? weaknesses : ['No major issues detected'];
}

function generateThreats(security: SecurityAnalysis, performance: PerformanceAnalysis): string[] {
  const threats: string[] = [];
  
  if (security.vulnerabilities.count > 0) {
    threats.push(`${security.vulnerabilities.count} security vulnerabilities detected`);
  }
  
  if (!security.headers.xFrameOptions) {
    threats.push('Potential clickjacking vulnerability');
  }
  
  if (security.threatScore < 50) {
    threats.push('High security risk level');
  }
  
  return threats.length > 0 ? threats : ['No immediate threats detected'];
}

function generateSuggestions(security: SecurityAnalysis, performance: PerformanceAnalysis): string[] {
  const suggestions: string[] = [];
  
  if (!security.ssl.valid) {
    suggestions.push('Implement HTTPS with valid SSL certificate');
  }
  
  if (!security.headers.hsts) {
    suggestions.push('Enable HTTP Strict Transport Security header');
  }
  
  if (performance.loadTime > 2000) {
    suggestions.push('Optimize images and enable compression');
  }
  
  if (performance.performanceScore < 80) {
    suggestions.push('Implement lazy loading and code splitting');
  }
  
  return suggestions.length > 0 ? suggestions : ['Continue monitoring and regular updates'];
}
