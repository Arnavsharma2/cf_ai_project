import React, { useState } from 'react';
import { Search, Loader2, Shield, Zap } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">
              Security Analysis
            </h2>
            <p className="text-gray-400">Comprehensive website security scanning</p>
          </div>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Analyze any website for security vulnerabilities, performance issues, and receive AI-powered recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
            Website URL to Analyze
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 text-lg"
              required
            />
            <Search className="absolute right-3 top-4 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={() => setUrl('https://cloudflare.com')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium flex items-center"
          >
            <Shield className="w-4 h-4 mr-2" />
            Cloudflare.com
          </button>
          <button
            type="button"
            onClick={() => setUrl('https://google.com')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium flex items-center"
          >
            <Zap className="w-4 h-4 mr-2" />
            Google.com
          </button>
          <button
            type="button"
            onClick={() => setUrl('https://github.com')}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            GitHub.com
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Scanning Website Security...
            </span>
          ) : (
            'Scan Website Security'
          )}
        </button>
      </form>
    </div>
  );
};