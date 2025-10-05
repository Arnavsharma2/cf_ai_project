import React from 'react';
import { WebsiteAnalysis } from '../types/analysis';
import { SecurityPanel } from './SecurityPanel';
import { PerformancePanel } from './PerformancePanel';
import { AIInsights } from './AIInsights';
import { Shield, Zap, Brain, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

interface ResultsProps {
  analysis: WebsiteAnalysis;
  onClear?: () => void;
}

export const Results: React.FC<ResultsProps> = ({ analysis, onClear }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'error':
        return 'text-red-400 bg-red-900/20 border-red-500/30';
      default:
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              {getStatusIcon(analysis.status)}
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text">Analysis Results</h2>
              <p className="text-gray-400 text-lg">{analysis.url}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-3xl font-bold gradient-text">
                {analysis.responseTime}ms
              </div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
            {onClear && (
              <button
                onClick={onClear}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Clear Results"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border w-fit ${getStatusColor(analysis.status)}`}>
          {getStatusIcon(analysis.status)}
          <span className="font-medium capitalize">{analysis.status}</span>
        </div>
      </div>

      {/* Analysis Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SecurityPanel security={analysis.security} />
        <PerformancePanel performance={analysis.performance} />
      </div>

      {/* AI Insights */}
      <AIInsights insights={analysis.aiInsights} />

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold gradient-text">Recommendations</h3>
          </div>
          <div className="space-y-3">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};