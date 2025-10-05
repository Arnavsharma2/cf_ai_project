import { PerformanceAnalysis } from '../types/analysis';
import { Env } from '../index';

export async function analyzePerformance(
  url: string,
  response: Response,
  env: Env,
  responseTime: number
): Promise<PerformanceAnalysis> {
  // Use the actual response time from the main analysis
  const loadTime = responseTime;
  
  // Simulate Core Web Vitals (in a real implementation, you'd use WebPageTest API)
  const coreWebVitals = await simulateCoreWebVitals(url, env);
  
  // Calculate performance score
  const performanceScore = calculatePerformanceScore(loadTime, coreWebVitals);
  
  // Simulate global metrics (in a real implementation, you'd test from multiple regions)
  const globalMetrics = await simulateGlobalMetrics(url, env);
  
  return {
    loadTime,
    firstContentfulPaint: coreWebVitals.fcp,
    largestContentfulPaint: coreWebVitals.lcp,
    cumulativeLayoutShift: coreWebVitals.cls,
    firstInputDelay: coreWebVitals.fid,
    totalBlockingTime: coreWebVitals.tbt,
    performanceScore,
    globalMetrics,
  };
}

async function simulateCoreWebVitals(url: string, env: Env): Promise<{
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  tbt: number;
}> {
  // In a real implementation, you would use WebPageTest API or similar
  // For now, we'll simulate realistic values based on the URL
  
  const isFastSite = url.includes('google.com') || url.includes('cloudflare.com');
  const baseTime = isFastSite ? 1000 : 2000;
  
  return {
    fcp: baseTime + Math.random() * 500, // First Contentful Paint
    lcp: baseTime + Math.random() * 1000, // Largest Contentful Paint
    cls: Math.random() * 0.1, // Cumulative Layout Shift
    fid: Math.random() * 100, // First Input Delay
    tbt: Math.random() * 200, // Total Blocking Time
  };
}

async function simulateGlobalMetrics(url: string, env: Env): Promise<PerformanceAnalysis['globalMetrics']> {
  // Simulate performance from different regions
  const regions = [
    { region: 'US-East', multiplier: 1.0 },
    { region: 'US-West', multiplier: 1.1 },
    { region: 'Europe', multiplier: 1.3 },
    { region: 'Asia', multiplier: 1.5 },
    { region: 'Australia', multiplier: 1.4 },
  ];
  
  return regions.map(({ region, multiplier }) => ({
    region,
    loadTime: 1500 * multiplier + Math.random() * 500,
    availability: 99.5 + Math.random() * 0.5,
  }));
}

function calculatePerformanceScore(loadTime: number, coreWebVitals: any): number {
  let score = 100;
  
  // Load time scoring
  if (loadTime > 5000) score -= 40;
  else if (loadTime > 3000) score -= 25;
  else if (loadTime > 2000) score -= 15;
  else if (loadTime > 1000) score -= 5;
  
  // FCP scoring
  if (coreWebVitals.fcp > 3000) score -= 20;
  else if (coreWebVitals.fcp > 2000) score -= 10;
  else if (coreWebVitals.fcp > 1000) score -= 5;
  
  // LCP scoring
  if (coreWebVitals.lcp > 4000) score -= 20;
  else if (coreWebVitals.lcp > 2500) score -= 10;
  else if (coreWebVitals.lcp > 1500) score -= 5;
  
  // CLS scoring
  if (coreWebVitals.cls > 0.25) score -= 20;
  else if (coreWebVitals.cls > 0.1) score -= 10;
  else if (coreWebVitals.cls > 0.05) score -= 5;
  
  // FID scoring
  if (coreWebVitals.fid > 300) score -= 15;
  else if (coreWebVitals.fid > 100) score -= 10;
  else if (coreWebVitals.fid > 50) score -= 5;
  
  return Math.max(0, Math.min(100, score));
}
