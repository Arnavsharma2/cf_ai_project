import { SecurityAnalysis } from '../types/analysis';
import { Env } from '../index';

export async function analyzeSecurity(
  url: string,
  response: Response,
  env: Env
): Promise<SecurityAnalysis> {
  const urlObj = new URL(url);
  const isHttps = urlObj.protocol === 'https:';
  
  // Analyze SSL/TLS if HTTPS
  const ssl = isHttps ? await analyzeSSL(url) : {
    valid: false,
    grade: 'F' as const,
    issuer: 'N/A',
    expiry: 'N/A',
    protocol: 'N/A',
  };

  // Analyze security headers
  const headers = analyzeSecurityHeaders(response);

  // Check for vulnerabilities (simplified)
  const vulnerabilities = await checkVulnerabilities(url, env);

  // Calculate threat score
  const threatScore = calculateThreatScore(ssl, headers, vulnerabilities);

  return {
    ssl,
    headers,
    vulnerabilities,
    threatScore,
  };
}

async function analyzeSSL(url: string): Promise<SecurityAnalysis['ssl']> {
  try {
    // In a real implementation, you would use a proper SSL analysis service
    // For now, we'll simulate basic SSL analysis
    const response = await fetch(url, { method: 'HEAD' });
    
    // Basic SSL validation
    const isValid = response.ok && url.startsWith('https://');
    
    return {
      valid: isValid,
      grade: isValid ? 'A' : 'F',
      issuer: isValid ? 'Simulated CA' : 'N/A',
      expiry: isValid ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : 'N/A',
      protocol: isValid ? 'TLS 1.3' : 'N/A',
    };
  } catch (error) {
    return {
      valid: false,
      grade: 'F',
      issuer: 'N/A',
      expiry: 'N/A',
      protocol: 'N/A',
    };
  }
}

function analyzeSecurityHeaders(response: Response): SecurityAnalysis['headers'] {
  const headers = response.headers;
  
  return {
    hsts: headers.has('strict-transport-security'),
    csp: headers.has('content-security-policy'),
    xFrameOptions: headers.has('x-frame-options'),
    xContentTypeOptions: headers.has('x-content-type-options'),
    referrerPolicy: headers.has('referrer-policy'),
    permissionsPolicy: headers.has('permissions-policy'),
  };
}

async function checkVulnerabilities(url: string, env: Env): Promise<SecurityAnalysis['vulnerabilities']> {
  // In a real implementation, you would integrate with security scanning services
  // like VirusTotal, SecurityHeaders.com, etc.
  
  // Simulate vulnerability check
  const vulnerabilities = [];
  
  // Check for common vulnerabilities (simplified)
  if (url.includes('http://')) {
    vulnerabilities.push('Insecure HTTP protocol detected');
  }
  
  // If VirusTotal API is available, use it
  if (env.VIRUSTOTAL_API_KEY) {
    try {
      // This would be a real VirusTotal API call
      // const vtResponse = await fetch(`https://www.virustotal.com/api/v3/urls/${encodeURIComponent(url)}`, {
      //   headers: { 'X-Apikey': env.VIRUSTOTAL_API_KEY }
      // });
    } catch (error) {
      console.log('VirusTotal API not available');
    }
  }
  
  const level = vulnerabilities.length === 0 ? 'low' : 
                vulnerabilities.length <= 2 ? 'medium' :
                vulnerabilities.length <= 4 ? 'high' : 'critical';
  
  return {
    level,
    count: vulnerabilities.length,
    details: vulnerabilities,
  };
}

function calculateThreatScore(
  ssl: SecurityAnalysis['ssl'],
  headers: SecurityAnalysis['headers'],
  vulnerabilities: SecurityAnalysis['vulnerabilities']
): number {
  let score = 100;
  
  // SSL scoring
  if (!ssl.valid) score -= 30;
  else if (ssl.grade === 'A+') score += 0;
  else if (ssl.grade === 'A') score -= 5;
  else if (ssl.grade === 'B') score -= 15;
  else if (ssl.grade === 'C') score -= 25;
  else score -= 35;
  
  // Headers scoring
  const headerCount = Object.values(headers).filter(Boolean).length;
  score -= (6 - headerCount) * 5;
  
  // Vulnerability scoring
  if (vulnerabilities.level === 'critical') score -= 40;
  else if (vulnerabilities.level === 'high') score -= 25;
  else if (vulnerabilities.level === 'medium') score -= 15;
  else if (vulnerabilities.level === 'low') score -= 5;
  
  return Math.max(0, Math.min(100, score));
}
