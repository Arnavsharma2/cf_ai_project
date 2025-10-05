import React from 'react';
import { PerformanceAnalysis } from '../types/analysis';
import { Zap, Clock, TrendingUp, Globe } from 'lucide-react';

interface PerformancePanelProps {
  performance: PerformanceAnalysis;
}

export const PerformancePanel: React.FC<PerformancePanelProps> = ({ performance }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-900/20 border-green-500/30';
    if (score >= 70) return 'bg-yellow-900/20 border-yellow-500/30';
    return 'bg-red-900/20 border-red-500/30';
  };

  const coreWebVitals = [
    {
      name: 'FCP',
      value: performance.firstContentfulPaint,
      unit: 'ms',
      threshold: 1800,
      description: 'First Contentful Paint'
    },
    {
      name: 'LCP',
      value: performance.largestContentfulPaint,
      unit: 'ms',
      threshold: 2500,
      description: 'Largest Contentful Paint'
    },
    {
      name: 'CLS',
      value: performance.cumulativeLayoutShift,
      unit: '',
      threshold: 0.1,
      description: 'Cumulative Layout Shift'
    },
    {
      name: 'FID',
      value: performance.firstInputDelay,
      unit: 'ms',
      threshold: 100,
      description: 'First Input Delay'
    },
    {
      name: 'TBT',
      value: performance.totalBlockingTime,
      unit: 'ms',
      threshold: 200,
      description: 'Total Blocking Time'
    }
  ];

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold gradient-text">Performance Analysis</h3>
      </div>

      {/* Performance Score */}
      <div className="mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Performance Score</span>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${performance.performanceScore}%` }}
                ></div>
              </div>
              <span className={`font-bold text-lg ${getScoreColor(performance.performanceScore)}`}>
                {performance.performanceScore}/100
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Load Time</span>
            <span className="text-white font-semibold">{performance.loadTime}ms</span>
          </div>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">Core Web Vitals</h4>
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          {coreWebVitals.map((vital) => {
            const isGood = vital.value <= vital.threshold;
            return (
              <div key={vital.name} className="flex items-center justify-between">
                <div>
                  <span className="text-gray-300 font-mono text-sm">{vital.name}</span>
                  <p className="text-xs text-gray-500">{vital.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`font-bold ${isGood ? 'text-green-400' : 'text-red-400'}`}>
                    {vital.name === 'CLS' ? vital.value.toFixed(3) : vital.value.toFixed(1)}{vital.unit}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${isGood ? 'bg-green-400' : 'bg-red-400'}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Performance */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3">Global Performance</h4>
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          {performance.globalMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{metric.region}</span>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">{metric.loadTime.toFixed(0)}ms</div>
                <div className="text-xs text-gray-500">{metric.availability.toFixed(1)}% uptime</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};