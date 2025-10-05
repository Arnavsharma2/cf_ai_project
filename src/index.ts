import { WebsiteAnalysis, AnalysisRequest } from './types/analysis';
import { APIResponse, ErrorResponse } from './types/api';
import { analyzeWebsite } from './handlers/analyze';
import { getHealthCheck } from './handlers/health';
import { getGlobalPulse } from './handlers/global-pulse';
import { detectThreats } from './handlers/storm-seer';

export interface Env {
  OPENAI_KEY: string;
  VIRUSTOTAL_API_KEY: string;
  WEBPAGETEST_API_KEY: string;
  ANALYSIS_CACHE?: KVNamespace;
  CLOUDFLARE_AI?: any; // Cloudflare AI binding
}

// Project Atlas: The Digital Sentinel's Central Nervous System
// This Worker serves as the instantaneous, global nervous system,
// processing requests at the edge where the action is.

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      // Atlas API Routes - The Digital Sentinel's Command Center
      
      // The Sentinel's Heartbeat - Health Check
      if (path === '/health' && method === 'GET') {
        const healthCheck = await getHealthCheck(env);
        return new Response(JSON.stringify(healthCheck), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // The Global Pulse - Internet's Living Heartbeat
      if (path === '/pulse' && method === 'GET') {
        const globalPulse = await getGlobalPulse(env);
        return new Response(JSON.stringify(globalPulse), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // The Storm-Seer - Threat Detection
      if (path === '/threats' && method === 'POST') {
        const body = await request.json() as { url: string; patterns?: any };
        const threats = await detectThreats(body.url, env);
        return new Response(JSON.stringify(threats), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // The Watchtower - Strategic Security Analysis
      if (path === '/watchtower' && method === 'POST') {
        const body = await request.json() as AnalysisRequest;
        const analysis = await analyzeWebsite(body, env, ctx);
        return new Response(JSON.stringify(analysis), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // The Oracle - AI-Powered Wisdom
      if (path === '/oracle' && method === 'POST') {
        const body = await request.json() as AnalysisRequest;
        const analysis = await analyzeWebsite(body, env, ctx);
        return new Response(JSON.stringify(analysis), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Legacy analyze endpoint for backward compatibility
      if (path === '/analyze' && method === 'POST') {
        const body = await request.json() as AnalysisRequest;
        const analysis = await analyzeWebsite(body, env, ctx);
        return new Response(JSON.stringify(analysis), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (path === '/analyze' && method === 'GET') {
        const url = new URL(request.url);
        const targetUrl = url.searchParams.get('url');
        
        if (!targetUrl) {
          const error: ErrorResponse = {
            success: false,
            error: 'URL parameter is required',
            timestamp: Date.now(),
          };
          return new Response(JSON.stringify(error), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const analysis = await analyzeWebsite({ url: targetUrl }, env, ctx);
        return new Response(JSON.stringify(analysis), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 404 for unknown routes
      const error: ErrorResponse = {
        success: false,
        error: 'Not Found',
        timestamp: Date.now(),
      };
      return new Response(JSON.stringify(error), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Worker error:', error);
      const errorResponse: ErrorResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
        timestamp: Date.now(),
      };
      return new Response(JSON.stringify(errorResponse), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
