import axios from 'axios';
import { AnalysisRequest, AnalysisResponse, WebsiteAnalysis } from '../types/analysis';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8787';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analysisAPI = {
  async analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
    try {
      const response = await api.get<AnalysisResponse>('/analyze', {
        params: { url },
      });
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Analysis failed');
      }
      
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  },

  async analyzeWebsitePost(request: AnalysisRequest): Promise<WebsiteAnalysis> {
    try {
      const response = await api.post<AnalysisResponse>('/analyze', request);
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Analysis failed');
      }
      
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  },

  async getHealthCheck() {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  },
};

export default api;
