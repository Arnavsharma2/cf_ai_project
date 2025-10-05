import React from 'react';
import { AIInsights as AIInsightsType } from '../types/analysis';
import { Brain, Lightbulb, AlertTriangle, CheckCircle, Target } from 'lucide-react';

interface AIInsightsProps {
  insights: AIInsightsType;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold gradient-text">AI-Powered Insights</h3>
      </div>

      {/* Overall Assessment */}
      <div className="mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">Overall Assessment</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${insights.overallScore}%` }}
                ></div>
              </div>
              <span className="text-white font-bold text-lg">{insights.overallScore}/100</span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">Risk Level</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
              insights.riskLevel === 'low' 
                ? 'text-green-400 bg-green-900/20 border-green-500/30'
                : insights.riskLevel === 'medium'
                ? 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30'
                : 'text-red-400 bg-red-900/20 border-red-500/30'
            }`}>
              {insights.riskLevel.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{insights.summary}</p>
        </div>
      </div>

      {/* Strengths */}
      {insights.strengths && insights.strengths.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            Strengths
          </h4>
          <div className="space-y-2">
            {insights.strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm">{strength}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weaknesses */}
      {insights.weaknesses && insights.weaknesses.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
            Areas for Improvement
          </h4>
          <div className="space-y-2">
            {insights.weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm">{weakness}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Threats */}
      {insights.threats && insights.threats.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            Security Threats
          </h4>
          <div className="space-y-2">
            {insights.threats.map((threat, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm">{threat}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimization Suggestions */}
      {insights.optimizationSuggestions && insights.optimizationSuggestions.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Lightbulb className="w-5 h-5 text-orange-400 mr-2" />
            Recommendations
          </h4>
          <div className="space-y-2">
            {insights.optimizationSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                <Target className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};