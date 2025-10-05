import React, { useState, useEffect } from 'react';
import { Globe, Activity, Shield, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface GlobalPulseData {
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
  overallStatus?: 'healthy' | 'degraded' | 'critical';
}

interface GlobalPulseProps {
  onRegionClick?: (region: string) => void;
}

export const GlobalPulse: React.FC<GlobalPulseProps> = ({ onRegionClick }) => {
  const [pulseData, setPulseData] = useState<GlobalPulseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalPulse();
    const interval = setInterval(fetchGlobalPulse, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchGlobalPulse = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8787'}/pulse`);
      const data = await response.json();
      if (data.success) {
        setPulseData(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch global pulse:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'degraded':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'critical':
        return 'text-red-400 bg-red-900/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="card text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-white animate-pulse" />
        </div>
        <p className="text-xl text-gray-400">Loading global monitoring data...</p>
      </div>
    );
  }

  if (!pulseData) {
    return (
      <div className="card text-center py-12 bg-red-900/20 border-red-500/30 text-red-400">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
        <p className="text-xl font-medium">Failed to load monitoring data</p>
        <p className="text-sm mt-2">Unable to connect to global monitoring systems</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold gradient-text">Global Monitor</h3>
            <p className="text-gray-400">Real-time internet health monitoring</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(pulseData.overallStatus || 'healthy')}`}>
            {pulseData.overallStatus ? (pulseData.overallStatus.charAt(0).toUpperCase() + pulseData.overallStatus.slice(1)) : 'Healthy'}
          </div>
        </div>

        <p className="text-gray-400 mb-8 text-lg">
          Monitor global internet health across regions with real-time data on latency, threats, and traffic patterns.
        </p>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="metric-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{pulseData.globalHealth}%</div>
            <div className="text-gray-400">Global Health</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{pulseData.activeThreats}</div>
            <div className="text-gray-400">Active Threats</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{pulseData.totalTraffic}</div>
            <div className="text-gray-400">Total Traffic</div>
          </div>
        </div>
      </div>

      {/* Regional Data */}
      <div className="card">
        <h4 className="text-xl font-bold mb-6 gradient-text">Regional Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pulseData.regions.map((region, index) => (
            <div
              key={index}
              className="metric-card hover:border-gray-700 cursor-pointer transition-all duration-200"
              onClick={() => onRegionClick?.(region.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-lg text-white">{region.name}</h5>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(region.status)}`}>
                  {region.status}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Health
                  </span>
                  <span className="font-semibold text-white">{region.health}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Latency
                  </span>
                  <span className="font-semibold text-white">{region.latency}ms</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Threats
                  </span>
                  <span className="font-semibold text-white">{region.threats}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Traffic
                  </span>
                  <span className="font-semibold text-white">{region.traffic}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      {pulseData.insights && pulseData.insights.length > 0 && (
        <div className="card">
          <h4 className="text-xl font-bold mb-6 gradient-text">System Insights</h4>
          <div className="space-y-4">
            {pulseData.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="text-center text-sm text-gray-500">
        Last updated: {new Date(pulseData.timestamp).toLocaleString()}
      </div>
    </div>
  );
};