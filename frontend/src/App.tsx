import React, { useState } from 'react';
import { AnalysisForm } from './components/AnalysisForm';
import { Results } from './components/Results';
import { GlobalPulse } from './components/GlobalPulse';
import { useAnalysis } from './hooks/useAnalysis';
import { Eye, Globe, Brain } from 'lucide-react';
import './index.css';

function App() {
  const { analysis, loading, error, analyzeWebsite, clearAnalysis } = useAnalysis();
  const [activeView, setActiveView] = useState<'oracle' | 'pulse'>('oracle');

  const navigationItems = [
    { id: 'oracle', label: 'The Oracle', icon: Brain, description: 'Invoke wisdom for any digital realm' },
    { id: 'pulse', label: 'Global Pulse', icon: Globe, description: 'Witness the internet\'s heartbeat' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Project Atlas
                </h1>
                <p className="text-xs text-gray-500">A Guardian for the Digital World</p>
              </div>
            </div>
            
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as 'oracle' | 'pulse')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {activeView === 'oracle' && (
          <>
            <AnalysisForm onAnalyze={analyzeWebsite} loading={loading} />
            
            {error && (
              <div className="mt-6 max-w-2xl mx-auto">
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 text-danger-600">⚠</div>
                    <span className="text-danger-800 font-medium">The Oracle's Vision Clouded</span>
                  </div>
                  <p className="text-danger-700 mt-1">{error}</p>
                  <button
                    onClick={clearAnalysis}
                    className="mt-3 text-danger-600 hover:text-danger-700 underline text-sm"
                  >
                    Seek counsel again
                  </button>
                </div>
              </div>
            )}

            {analysis && <Results analysis={analysis} />}
          </>
        )}

        {activeView === 'pulse' && <GlobalPulse />}
      </div>
    </div>
  );
}

export default App;
