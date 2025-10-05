import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

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
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Project Atlas
          </h1>
          <p className="text-lg text-gray-500 italic">
            A Guardian for the Digital World
          </p>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter any digital realm and witness The Oracle's wisdom unfold. Atlas doesn't just analyze—it reveals the deeper architecture of the web, offering Socratic counsel to build a better internet.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Digital Realm to Examine
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              disabled={loading}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          {url && !isValidUrl(url) && (
            <p className="mt-1 text-sm text-danger-600">Please enter a valid URL</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !url || !isValidUrl(url)}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>The Oracle Consults...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Invoke The Oracle</span>
              </>
            )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Begin your journey with these digital realms:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => onAnalyze('https://cloudflare.com')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            disabled={loading}
          >
            🏰 Cloudflare's Fortress
          </button>
          <button 
            onClick={() => onAnalyze('https://google.com')}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg text-sm hover:from-green-600 hover:to-blue-700 transition-all duration-200"
            disabled={loading}
          >
            🔍 Google's Realm
          </button>
          <button 
            onClick={() => onAnalyze('https://github.com')}
            className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg text-sm hover:from-gray-800 hover:to-black transition-all duration-200"
            disabled={loading}
          >
            💻 GitHub's Workshop
          </button>
        </div>
      </div>
    </div>
  );
};
