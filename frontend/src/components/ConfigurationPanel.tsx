import React, { useState, useEffect } from 'react';
import { Settings, Globe, Shield, Zap, Clock, AlertTriangle } from 'lucide-react';

interface ConfigurationPanelProps {
  onConfigChange?: (config: any) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ onConfigChange }) => {
  const [config, setConfig] = useState({
    // Health Check Configuration
    healthCheck: {
      enabled: true,
      interval: 30, // seconds
      timeout: 5000, // milliseconds
      retries: 3,
      services: {
        openai: true,
        security: true,
        performance: true
      }
    },
    // Pulse Monitoring Configuration
    pulseMonitoring: {
      enabled: true,
      interval: 30, // seconds
      regions: ['North America', 'Europe', 'Asia Pacific', 'South America', 'Africa', 'Middle East'],
      metrics: {
        latency: true,
        threats: true,
        traffic: true,
        health: true
      }
    },
    // Analysis Configuration
    analysis: {
      includeGlobalMetrics: true,
      includeThreatDetection: true,
      includeAIInsights: true,
      cacheResults: true,
      cacheTTL: 300 // seconds
    }
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Load saved configuration from localStorage
    const savedConfig = localStorage.getItem('atlas-config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig({ ...config, ...parsed });
      } catch (error) {
        console.error('Failed to load configuration:', error);
      }
    }
  }, []);

  const handleConfigChange = (section: string, key: string, value: any) => {
    const newConfig = {
      ...config,
      [section]: {
        ...config[section as keyof typeof config],
        [key]: value
      }
    };
    setConfig(newConfig);
    localStorage.setItem('atlas-config', JSON.stringify(newConfig));
    onConfigChange?.(newConfig);
  };

  const handleServiceToggle = (service: string) => {
    const newConfig = {
      ...config,
      healthCheck: {
        ...config.healthCheck,
        services: {
          ...config.healthCheck.services,
          [service]: !config.healthCheck.services[service as keyof typeof config.healthCheck.services]
        }
      }
    };
    setConfig(newConfig);
    localStorage.setItem('atlas-config', JSON.stringify(newConfig));
    onConfigChange?.(newConfig);
  };

  const handleMetricToggle = (metric: string) => {
    const newConfig = {
      ...config,
      pulseMonitoring: {
        ...config.pulseMonitoring,
        metrics: {
          ...config.pulseMonitoring.metrics,
          [metric]: !config.pulseMonitoring.metrics[metric as keyof typeof config.pulseMonitoring.metrics]
        }
      }
    };
    setConfig(newConfig);
    localStorage.setItem('atlas-config', JSON.stringify(newConfig));
    onConfigChange?.(newConfig);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold gradient-text">Configuration Settings</h3>
            <p className="text-gray-400">Customize monitoring and analysis behavior</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-8">
          {/* Health Check Configuration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-green-400" />
              <h4 className="text-lg font-semibold text-white">Health Check Configuration</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Check Interval (seconds)
                </label>
                <input
                  type="number"
                  value={config.healthCheck.interval}
                  onChange={(e) => handleConfigChange('healthCheck', 'interval', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  min="10"
                  max="300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timeout (milliseconds)
                </label>
                <input
                  type="number"
                  value={config.healthCheck.timeout}
                  onChange={(e) => handleConfigChange('healthCheck', 'timeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  min="1000"
                  max="30000"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">Monitor Services</label>
              <div className="space-y-2">
                {Object.entries(config.healthCheck.services).map(([service, enabled]) => (
                  <label key={service} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => handleServiceToggle(service)}
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-gray-300 capitalize">{service} Service</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Pulse Monitoring Configuration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-semibold text-white">Pulse Monitoring Configuration</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Update Interval (seconds)
                </label>
                <input
                  type="number"
                  value={config.pulseMonitoring.interval}
                  onChange={(e) => handleConfigChange('pulseMonitoring', 'interval', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  min="10"
                  max="300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monitor Regions
                </label>
                <select
                  multiple
                  value={config.pulseMonitoring.regions}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    handleConfigChange('pulseMonitoring', 'regions', selected);
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  size={3}
                >
                  {config.pulseMonitoring.regions.map(region => (
                    <option key={region} value={region} className="bg-gray-700">
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">Track Metrics</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(config.pulseMonitoring.metrics).map(([metric, enabled]) => (
                  <label key={metric} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => handleMetricToggle(metric)}
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-gray-300 capitalize">{metric}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Configuration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-5 h-5 text-orange-400" />
              <h4 className="text-lg font-semibold text-white">Analysis Configuration</h4>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cache TTL (seconds)
                  </label>
                  <input
                    type="number"
                    value={config.analysis.cacheTTL}
                    onChange={(e) => handleConfigChange('analysis', 'cacheTTL', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    min="60"
                    max="3600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {Object.entries(config.analysis).filter(([key]) => key !== 'cacheTTL').map(([key, enabled]) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={enabled as boolean}
                      onChange={(e) => handleConfigChange('analysis', key, e.target.checked)}
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Current Status</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">✓</div>
                <div className="text-sm text-gray-400">Health Check</div>
                <div className="text-xs text-gray-500">Every {config.healthCheck.interval}s</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">✓</div>
                <div className="text-sm text-gray-400">Pulse Monitor</div>
                <div className="text-xs text-gray-500">Every {config.pulseMonitoring.interval}s</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">✓</div>
                <div className="text-sm text-gray-400">Analysis</div>
                <div className="text-xs text-gray-500">AI-Powered</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
