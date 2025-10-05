import { useState, useCallback } from 'react';
import { WebsiteAnalysis } from '../types/analysis';
import { analysisAPI } from '../services/api';

export interface UseAnalysisReturn {
  analysis: WebsiteAnalysis | null;
  loading: boolean;
  error: string | null;
  analyzeWebsite: (url: string) => Promise<void>;
  clearAnalysis: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [analysis, setAnalysis] = useState<WebsiteAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeWebsite = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await analysisAPI.analyzeWebsite(url);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
  }, []);

  return {
    analysis,
    loading,
    error,
    analyzeWebsite,
    clearAnalysis,
  };
}
