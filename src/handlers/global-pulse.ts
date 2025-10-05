import { APIResponse } from '../types/api';
import { Env } from '../index';

export interface GlobalPulseData {
  timestamp: number;
  regions: {
    name: string;
    health: number;
    latency: number;
    threats: number;
    traffic: number;
    status: 'healthy' | 'degraded' | 'critical';
  }[];
  globalHealth: number;
  activeThreats: number;
  totalTraffic: number;
  insights: string[];
}

export async function getGlobalPulse(env: Env): Promise<APIResponse<GlobalPulseData>> {
  try {
    // Simulate real-time global internet health data
    // In a real implementation, this would aggregate data from multiple sources
    const regions = [
      { name: 'North America', baseHealth: 95, baseLatency: 50, baseThreats: 2 },
      { name: 'Europe', baseHealth: 92, baseLatency: 75, baseThreats: 3 },
      { name: 'Asia Pacific', baseHealth: 88, baseLatency: 120, baseThreats: 5 },
      { name: 'South America', baseHealth: 85, baseLatency: 150, baseThreats: 4 },
      { name: 'Africa', baseHealth: 78, baseLatency: 200, baseThreats: 7 },
      { name: 'Middle East', baseHealth: 82, baseLatency: 180, baseThreats: 6 },
    ];

    const globalData: GlobalPulseData = {
      timestamp: Date.now(),
      regions: regions.map(region => {
        const variation = (Math.random() - 0.5) * 10;
        const health = Math.max(0, Math.min(100, region.baseHealth + variation));
        const latency = Math.max(10, region.baseLatency + (Math.random() - 0.5) * 20);
        const threats = Math.max(0, region.baseThreats + Math.floor((Math.random() - 0.5) * 4));
        const traffic = Math.random() * 100;
        
        return {
          name: region.name,
          health: Math.round(health),
          latency: Math.round(latency),
          threats,
          traffic: Math.round(traffic),
          status: health >= 90 ? 'healthy' : health >= 70 ? 'degraded' : 'critical',
        };
      }),
      globalHealth: 0,
      activeThreats: 0,
      totalTraffic: 0,
      insights: generateGlobalInsights(),
    };

    // Calculate global metrics
    globalData.globalHealth = Math.round(
      globalData.regions.reduce((sum, region) => sum + region.health, 0) / globalData.regions.length
    );
    globalData.activeThreats = globalData.regions.reduce((sum, region) => sum + region.threats, 0);
    globalData.totalTraffic = globalData.regions.reduce((sum, region) => sum + region.traffic, 0);

    return {
      success: true,
      data: globalData,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to retrieve global pulse',
      timestamp: Date.now(),
    };
  }
}

function generateGlobalInsights(): string[] {
  const insights = [
    "Southeast Asia experiencing elevated latency due to regional infrastructure maintenance",
    "European traffic patterns showing 15% increase during peak business hours",
    "North American security posture remains strong with minimal threat activity",
    "Global SSL adoption rate reaches 95% milestone across monitored regions",
    "CDN performance optimization showing 23% improvement in content delivery speeds",
    "Zero-day vulnerability detection systems active across all major regions",
  ];

  // Return 2-4 random insights
  const numInsights = 2 + Math.floor(Math.random() * 3);
  return insights.sort(() => Math.random() - 0.5).slice(0, numInsights);
}
