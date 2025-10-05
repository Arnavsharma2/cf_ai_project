import React from 'react';
import { SecurityAnalysis } from '../types/analysis';
import { Shield, Lock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SecurityPanelProps {
  security: SecurityAnalysis;
}

export const SecurityPanel: React.FC<SecurityPanelProps> = ({ security }) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'B':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'C':
      case 'D':
      case 'F':
        return 'text-red-400 bg-red-900/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getVulnerabilityColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'high':
        return 'text-red-400 bg-red-900/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getHeaderColor = (enabled: boolean) => {
    return enabled ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold gradient-text">Security Analysis</h3>
      </div>

      {/* SSL/TLS Configuration */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">SSL/TLS Configuration</h4>
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Certificate Grade</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(security.ssl.grade)}`}>
              {security.ssl.grade}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Valid Certificate</span>
            <div className="flex items-center space-x-2">
              {security.ssl.valid ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className={getHeaderColor(security.ssl.valid)}>
                {security.ssl.valid ? 'Valid' : 'Invalid'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Protocol</span>
            <span className="text-white font-mono">{security.ssl.protocol}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Issuer</span>
            <span className="text-white">{security.ssl.issuer}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Expires</span>
            <span className="text-white">{new Date(security.ssl.expiry).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Security Headers */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">Security Headers</h4>
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          {Object.entries(security.headers).map(([header, enabled]) => (
            <div key={header} className="flex items-center justify-between">
              <span className="text-gray-300 font-mono text-sm">{header}</span>
              <div className="flex items-center space-x-2">
                {enabled ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className={getHeaderColor(enabled)}>
                  {enabled ? 'Enabled' : 'Missing'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">Vulnerabilities</h4>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">Threat Level</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getVulnerabilityColor(security.vulnerabilities.level)}`}>
              {security.vulnerabilities.level.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">Vulnerabilities Found</span>
            <span className="text-white font-semibold">{security.vulnerabilities.count}</span>
          </div>
          {security.vulnerabilities.details.length > 0 && (
            <div className="space-y-2">
              <span className="text-gray-300 text-sm">Details:</span>
              <ul className="space-y-1">
                {security.vulnerabilities.details.map((vuln, index) => (
                  <li key={index} className="text-red-400 text-sm flex items-start space-x-2">
                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{vuln}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Security Score */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Security Score</span>
          <div className="flex items-center space-x-3">
            <div className="w-24 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${security.threatScore}%` }}
              ></div>
            </div>
            <span className="text-white font-bold text-lg">{security.threatScore}/100</span>
          </div>
        </div>
      </div>
    </div>
  );
};