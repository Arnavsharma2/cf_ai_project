import React from 'react';
import { AIInsights as AIInsightsType } from '../types/analysis';
import { Brain, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface AIInsightsProps {
  insights: AIInsightsType;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-success-600 bg-success-50 border-success-200';
      case 'medium':
        return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'high':
        return 'text-danger-600 bg-danger-50 border-danger-200';
      case 'critical':
        return 'text-danger-700 bg-danger-100 border-danger-300';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-danger-600';
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">AI-Powered Insights</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(insights.riskLevel)}`}>
          {insights.riskLevel.toUpperCase()}
        </div>
      </div>

      {/* Overall Score and Summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-900">Overall Score</span>
          <span className={`text-3xl font-bold ${getScoreColor(insights.overallScore)}`}>
            {insights.overallScore}/100
          </span>
        </div>
        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
          {insights.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        {insights.strengths.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success-600" />
              <span>Strengths</span>
            </h4>
            <ul className="space-y-2">
              {insights.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-success-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {insights.weaknesses.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-danger-600" />
              <span>Areas for Improvement</span>
            </h4>
            <ul className="space-y-2">
              {insights.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-danger-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Threats */}
      {insights.threats.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning-600" />
            <span>Security Threats</span>
          </h4>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <ul className="space-y-2">
              {insights.threats.map((threat, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-warning-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{threat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Optimization Suggestions */}
      {insights.optimizationSuggestions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-primary-600" />
            <span>AI Recommendations</span>
          </h4>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <ul className="space-y-2">
              {insights.optimizationSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
