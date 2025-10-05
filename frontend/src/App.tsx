import React, { useState } from 'react';
import { AnalysisForm } from './components/AnalysisForm';
import { Results } from './components/Results';
import { GlobalPulse } from './components/GlobalPulse';
import { useAnalysis } from './hooks/useAnalysis';
import { Shield, Globe, Brain, Zap, ArrowRight } from 'lucide-react';
import './index.css';

function App() {
  const { analysis, loading, error, analyzeWebsite, clearAnalysis } = useAnalysis();
  const [activeView, setActiveView] = useState<'analyzer' | 'monitor' | 'docs'>('analyzer');

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
              <button
                onClick={() => setActiveView('docs')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeView === 'docs'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Documentation
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
            <button 
              onClick={() => setActiveView('analyzer')}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
            <button 
              onClick={() => setActiveView('docs')}
              className="btn-secondary text-lg px-8 py-4"
            >
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
        ) : activeView === 'monitor' ? (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Global Monitoring</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Real-time internet health monitoring across global regions
              </p>
            </div>
            <GlobalPulse />
          </div>
        ) : (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Documentation</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Learn how to use Project Atlas for comprehensive website analysis
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Getting Started */}
              <div className="card">
                <h3 className="text-2xl font-bold gradient-text mb-6">Getting Started</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Enter Website URL</h4>
                      <p className="text-gray-400">Enter any website URL you want to analyze for security and performance issues.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Click Analyze</h4>
                      <p className="text-gray-400">Click "Analyze Website" to start the comprehensive security and performance scan.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Review Results</h4>
                      <p className="text-gray-400">Get detailed insights, security scores, performance metrics, and AI-powered recommendations.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="card">
                <h3 className="text-2xl font-bold gradient-text mb-6">Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-orange-400" />
                    <div>
                      <h4 className="font-semibold text-white">Security Analysis</h4>
                      <p className="text-gray-400 text-sm">SSL/TLS configuration, security headers, vulnerability detection</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <div>
                      <h4 className="font-semibold text-white">Performance Metrics</h4>
                      <p className="text-gray-400 text-sm">Core Web Vitals, load times, global performance data</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-orange-400" />
                    <div>
                      <h4 className="font-semibold text-white">AI Insights</h4>
                      <p className="text-gray-400 text-sm">Intelligent recommendations and detailed explanations</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-orange-400" />
                    <div>
                      <h4 className="font-semibold text-white">Global Monitoring</h4>
                      <p className="text-gray-400 text-sm">Real-time internet health across global regions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Documentation */}
            <div className="card">
              <h3 className="text-2xl font-bold gradient-text mb-6">API Endpoints</h3>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 bg-green-600 text-white text-xs font-mono rounded">POST</span>
                    <code className="text-orange-400 font-mono">/oracle</code>
                  </div>
                  <p className="text-gray-400 text-sm">Analyze a website for security and performance issues</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Body:</strong> <code>{"{ \"url\": \"https://example.com\" }"}</code>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-mono rounded">GET</span>
                    <code className="text-orange-400 font-mono">/pulse</code>
                  </div>
                  <p className="text-gray-400 text-sm">Get real-time global internet health data</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-mono rounded">GET</span>
                    <code className="text-orange-400 font-mono">/health</code>
                  </div>
                  <p className="text-gray-400 text-sm">Check API health status</p>
                </div>
              </div>
            </div>

            {/* Built With */}
            <div className="card text-center">
              <h3 className="text-2xl font-bold gradient-text mb-6">Built With</h3>
              <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span>Cloudflare Workers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span>OpenAI GPT-4</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span>React & TypeScript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <span>Tailwind CSS</span>
                </div>
              </div>
            </div>
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