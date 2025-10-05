import React, { useState } from 'react';
import { AnalysisForm } from './components/AnalysisForm';
import { Results } from './components/Results';
import { GlobalPulse } from './components/GlobalPulse';
import { useAnalysis } from './hooks/useAnalysis';
import { Shield, Globe, Brain, Zap, ArrowRight } from 'lucide-react';
import './index.css';

function App() {
  const { analysis, loading, error, analyzeWebsite, clearAnalysis } = useAnalysis();
  const [activeView, setActiveView] = useState<'analyzer' | 'monitor'>('analyzer');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Project Atlas</h1>
                <p className="text-sm text-gray-400">AI-Powered Security & Performance Analysis</p>
              </div>
            </div>
            
            <div className="flex space-x-1 bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setActiveView('analyzer')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeView === 'analyzer'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Brain className="w-4 h-4 inline mr-2" />
                Security Analyzer
              </button>
              <button
                onClick={() => setActiveView('monitor')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeView === 'monitor'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 inline mr-2" />
                Global Monitor
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section pt-20">
        <div className="hero-bg"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">Project Atlas</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The Platform For <em className="gradient-text font-semibold">Building</em> Secure Web Applications.
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-4xl mx-auto">
            AI-powered security analysis and performance monitoring that goes beyond traditional tools by integrating 
            autonomous threat detection, real-time global monitoring, and intelligent recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary text-lg px-8 py-4">
              Get Started
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {activeView === 'analyzer' ? (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Security Analysis</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive security scanning with AI-powered insights and recommendations
              </p>
            </div>
            <AnalysisForm onAnalyze={analyzeWebsite} loading={loading} />
            {error && (
              <div className="card bg-red-900/20 border-red-500/30 text-red-400">
                <p className="font-medium">Analysis Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}
            {analysis && <Results analysis={analysis} onClear={clearAnalysis} />}
          </div>
        ) : (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Global Monitoring</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Real-time internet health monitoring across global regions
              </p>
            </div>
            <GlobalPulse />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            Built with Cloudflare Workers • Powered by AI • Securing the Digital World
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;