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
        return 'text-success-600 bg-success-50';
      case 'B':
        return 'text-warning-600 bg-warning-50';
      case 'C':
      case 'D':
      case 'F':
        return 'text-danger-600 bg-danger-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getVulnerabilityColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-success-600 bg-success-50';
      case 'medium':
        return 'text-warning-600 bg-warning-50';
      case 'high':
      return 'text-danger-600 bg-danger-50';
      case 'critical':
        return 'text-danger-700 bg-danger-100';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-6 h-6 text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">Security Analysis</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(security.ssl.grade)}`}>
          {security.ssl.grade}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SSL/TLS */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>SSL/TLS Certificate</span>
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Valid:</span>
              <span className={security.ssl.valid ? 'text-success-600' : 'text-danger-600'}>
                {security.ssl.valid ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grade:</span>
              <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(security.ssl.grade)}`}>
                {security.ssl.grade}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Protocol:</span>
              <span className="text-gray-900">{security.ssl.protocol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issuer:</span>
              <span className="text-gray-900 text-sm">{security.ssl.issuer}</span>
            </div>
          </div>
        </div>

        {/* Security Headers */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Security Headers</h4>
          <div className="space-y-2">
            {Object.entries(security.headers).map(([header, enabled]) => (
              <div key={header} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize">{header.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <div className="flex items-center space-x-1">
                  {enabled ? (
                    <CheckCircle className="w-4 h-4 text-success-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-danger-600" />
                  )}
                  <span className={enabled ? 'text-success-600' : 'text-danger-600'}>
                    {enabled ? 'Enabled' : 'Missing'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Vulnerabilities</span>
        </h4>
        <div className={`p-4 rounded-lg border ${getVulnerabilityColor(security.vulnerabilities.level)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">
              {security.vulnerabilities.count} vulnerabilities detected
            </span>
            <span className={`px-2 py-1 rounded text-sm font-medium ${getVulnerabilityColor(security.vulnerabilities.level)}`}>
              {security.vulnerabilities.level.toUpperCase()}
            </span>
          </div>
          {security.vulnerabilities.details.length > 0 && (
            <ul className="space-y-1">
              {security.vulnerabilities.details.map((detail, index) => (
                <li key={index} className="text-sm">• {detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
