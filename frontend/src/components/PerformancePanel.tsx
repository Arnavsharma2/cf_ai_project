import React from 'react';
import { PerformanceAnalysis } from '../types/analysis';
import { Zap, Globe, Clock, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformancePanelProps {
  performance: PerformanceAnalysis;
}

export const PerformancePanel: React.FC<PerformancePanelProps> = ({ performance }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600 bg-success-50';
    if (score >= 70) return 'text-warning-600 bg-warning-50';
    return 'text-danger-600 bg-danger-50';
  };

  const coreWebVitals = [
    {
      name: 'FCP',
      value: performance.firstContentfulPaint,
      threshold: 1800,
      label: 'First Contentful Paint',
    },
    {
      name: 'LCP',
      value: performance.largestContentfulPaint,
      threshold: 2500,
      label: 'Largest Contentful Paint',
    },
    {
      name: 'CLS',
      value: performance.cumulativeLayoutShift,
      threshold: 0.1,
      label: 'Cumulative Layout Shift',
    },
    {
      name: 'FID',
      value: performance.firstInputDelay,
      threshold: 100,
      label: 'First Input Delay',
    },
    {
      name: 'TBT',
      value: performance.totalBlockingTime,
      threshold: 200,
      label: 'Total Blocking Time',
    },
  ];

  const chartData = coreWebVitals.map(vital => ({
    name: vital.name,
    value: vital.value,
    threshold: vital.threshold,
  }));

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="w-6 h-6 text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">Performance Analysis</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(performance.performanceScore)}`}>
          {performance.performanceScore}/100
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Web Vitals */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Core Web Vitals</span>
          </h4>
          <div className="space-y-3">
            {coreWebVitals.map((vital, index) => {
              const isGood = vital.value <= vital.threshold;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{vital.label}</div>
                    <div className="text-sm text-gray-600">Threshold: {vital.name === 'CLS' ? vital.threshold : vital.threshold + 'ms'}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${isGood ? 'text-success-600' : 'text-danger-600'}`}>
                      {vital.name === 'CLS' ? vital.value.toFixed(3) : vital.value.toFixed(1)}{vital.name === 'CLS' ? '' : 'ms'}
                    </div>
                    <div className={`text-xs ${isGood ? 'text-success-600' : 'text-danger-600'}`}>
                      {isGood ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Chart */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    `${value}ms`, 
                    name === 'value' ? 'Current' : 'Threshold'
                  ]}
                />
                <Bar dataKey="value" fill="#3b82f6" name="Current" />
                <Bar dataKey="threshold" fill="#ef4444" name="Threshold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Global Performance */}
      {performance.globalMetrics.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Global Performance</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performance.globalMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{metric.region}</span>
                  <span className="text-sm text-gray-600">{metric.availability.toFixed(1)}% uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-lg font-bold text-gray-900">{metric.loadTime.toFixed(0)}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
