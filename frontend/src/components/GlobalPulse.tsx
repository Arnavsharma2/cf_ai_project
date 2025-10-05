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
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!pulseData) {
    return (
      <div className="card">
        <div className="text-center text-gray-500">
          <Globe className="w-12 h-12 mx-auto mb-4" />
          <p>Unable to connect to The Global Pulse</p>
        </div>
      </div>
    );
  }

  const chartData = pulseData.regions.map(region => ({
    name: region.name.split(' ')[0], // Shorten names for chart
    health: region.health,
    latency: region.latency,
    threats: region.threats,
    traffic: region.traffic,
  }));

  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Globe className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">The Global Pulse</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            pulseData.globalHealth >= 90 ? 'healthy' : 
            pulseData.globalHealth >= 70 ? 'degraded' : 'critical'
          )}`}>
            {pulseData.globalHealth}/100
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-gray-700">Global Health</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{pulseData.globalHealth}/100</p>
          </div>

          <div className="metric-card text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="font-medium text-gray-700">Active Threats</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{pulseData.activeThreats}</p>
          </div>

          <div className="metric-card text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-700">Total Traffic</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{pulseData.totalTraffic.toFixed(0)}%</p>
          </div>

          <div className="metric-card text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Regions Monitored</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{pulseData.regions.length}</p>
          </div>
        </div>

        {/* Global Health Chart */}
        <div className="h-64">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Internet Health by Region</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  `${value}${name === 'health' ? '%' : name === 'latency' ? 'ms' : ''}`, 
                  name === 'health' ? 'Health' : name === 'latency' ? 'Latency' : name
                ]}
              />
              <Bar dataKey="health" fill="#3b82f6" name="Health" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Status */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Regional Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pulseData.regions.map((region, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${getStatusColor(region.status)}`}
              onClick={() => onRegionClick?.(region.name)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{region.name}</h4>
                {getStatusIcon(region.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Health:</span>
                  <span className="font-medium">{region.health}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Latency:</span>
                  <span className="font-medium">{region.latency}ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Threats:</span>
                  <span className="font-medium">{region.threats}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Traffic:</span>
                  <span className="font-medium">{region.traffic.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      {pulseData.insights.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Activity className="w-6 h-6 text-primary-600" />
            <span>Global Insights</span>
          </h3>
          <div className="space-y-3">
            {pulseData.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
