import React from 'react';
import { WebsiteAnalysis } from '../types/analysis';
import { SecurityPanel } from './SecurityPanel';
import { PerformancePanel } from './PerformancePanel';
import { AIInsights } from './AIInsights';
import { Shield, Zap, Brain, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ResultsProps {
  analysis: WebsiteAnalysis;
}

export const Results: React.FC<ResultsProps> = ({ analysis }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-danger-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'status-success';
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-danger';
      default:
        return 'status-warning';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            <p className="text-gray-600">{analysis.url}</p>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(analysis.status)}`}>
            {getStatusIcon(analysis.status)}
            <span className="font-medium capitalize">{analysis.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-gray-700">Response Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{analysis.responseTime}ms</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-gray-700">Security Score</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{analysis.security.threatScore}/100</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-gray-700">Overall Score</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{analysis.aiInsights.overallScore}/100</p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsights insights={analysis.aiInsights} />

      {/* Security Analysis */}
      <SecurityPanel security={analysis.security} />

      {/* Performance Analysis */}
      <PerformancePanel performance={analysis.performance} />

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
