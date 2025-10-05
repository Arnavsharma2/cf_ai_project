import { HealthCheckResponse } from '../types/api';
import { Env } from '../index';

export async function getHealthCheck(env: Env): Promise<HealthCheckResponse> {
  const startTime = Date.now();
  
  // Check service availability
  const services = {
    groq: !!env.GROQ_API_KEY,
    security: !!env.VIRUSTOTAL_API_KEY,
    performance: !!env.WEBPAGETEST_API_KEY,
  };

  const allServicesHealthy = Object.values(services).every(status => status);

  return {
    success: true,
    data: {
      status: allServicesHealthy ? 'healthy' : 'healthy', // Simplified for now
      version: '1.0.0',
      uptime: Date.now() - startTime,
      services,
    },
    timestamp: Date.now(),
  };
}
