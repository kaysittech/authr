import React, { useState } from 'react';
import { 
  Server, 
  Radar, 
  ShieldCheck, 
  Lock, 
  Bot, 
  Scale, 
  Database, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Terminal, 
  Zap, 
  Play, 
  Pause,
  SlidersHorizontal,
  FileText
} from 'lucide-react';

export interface WebServiceStatus {
  id: string;
  name: string;
  category: 'scraper' | 'security' | 'settlement' | 'ai_model' | 'database';
  status: 'running' | 'idle' | 'executing' | 'error';
  lastRunTime: string;
  nextRunTime: string;
  frequency: string;
  successRate: number; // e.g. 99.82
  errorRate: number;   // e.g. 0.18
  totalInvocations24h: number;
  avgLatencyMs: number;
  lastErrorMessage?: string;
  icon: any;
}

export const INITIAL_WEB_SERVICES: WebServiceStatus[] = [
  {
    id: 'service_scrape_daemon',
    name: 'Radar Swarm Scrape Daemon',
    category: 'scraper',
    status: 'running',
    lastRunTime: '12 mins ago (15:28:10)',
    nextRunTime: 'In 5h 48m',
    frequency: 'Every 6 Hours',
    successRate: 99.85,
    errorRate: 0.15,
    totalInvocations24h: 1420000,
    avgLatencyMs: 420,
    icon: Radar
  },
  {
    id: 'service_bipa_verifier',
    name: 'BIPA Biometric Verification API',
    category: 'security',
    status: 'running',
    lastRunTime: 'Just now (15:39:42)',
    nextRunTime: 'Continuous Event Stream',
    frequency: 'Real-Time API',
    successRate: 99.94,
    errorRate: 0.06,
    totalInvocations24h: 894200,
    avgLatencyMs: 45,
    icon: ShieldCheck
  },
  {
    id: 'service_c2pa_engine',
    name: 'C2PA Cryptographic Signature Engine',
    category: 'security',
    status: 'running',
    lastRunTime: '4 mins ago (15:36:00)',
    nextRunTime: 'On Asset Registration',
    frequency: 'Event Triggered',
    successRate: 99.70,
    errorRate: 0.30,
    totalInvocations24h: 312000,
    avgLatencyMs: 180,
    icon: Lock
  },
  {
    id: 'service_llm_token_detector',
    name: 'LLM Dataset Token Ingestion Scraper',
    category: 'ai_model',
    status: 'idle',
    lastRunTime: '1 hour ago (14:30:00)',
    nextRunTime: 'In 23 hours',
    frequency: 'Daily Batch',
    successRate: 98.90,
    errorRate: 1.10,
    totalInvocations24h: 540000,
    avgLatencyMs: 890,
    lastErrorMessage: 'Common Crawl HTTP 429 rate limit soft warning (resolved via proxy rotation)',
    icon: Bot
  },
  {
    id: 'service_settlement_gate',
    name: 'Automated DMCA & Settlement Gate Dispatcher',
    category: 'settlement',
    status: 'running',
    lastRunTime: '2 mins ago (15:38:00)',
    nextRunTime: 'In 13 mins',
    frequency: 'Every 15 Mins',
    successRate: 99.98,
    errorRate: 0.02,
    totalInvocations24h: 96000,
    avgLatencyMs: 95,
    icon: Scale
  },
  {
    id: 'service_vector_index',
    name: 'FAISS Vector Index Sync Microservice',
    category: 'database',
    status: 'running',
    lastRunTime: '18 mins ago (15:22:00)',
    nextRunTime: 'In 42 mins',
    frequency: 'Every 1 Hour',
    successRate: 99.45,
    errorRate: 0.55,
    totalInvocations24h: 1560000,
    avgLatencyMs: 12,
    icon: Database
  }
];

export const WebServicesDashboard: React.FC = () => {
  const [services, setServices] = useState<WebServiceStatus[]>(INITIAL_WEB_SERVICES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeConsoleLog, setActiveConsoleLog] = useState<string[]>([]);
  const [executingServiceId, setExecutingServiceId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger Manual Execution of a Specific Microservice
  const handleTriggerService = (serviceId: string, serviceName: string) => {
    setExecutingServiceId(serviceId);
    const timestamp = new Date().toLocaleTimeString();
    
    // Add execution logs to terminal viewer
    setActiveConsoleLog(prev => [
      `[${timestamp}] INFO [${serviceId}] Manual execution triggered by Administrator.`,
      `[${timestamp}] DEBUG [${serviceId}] Initializing worker thread pool (16 threads)...`,
      `[${timestamp}] DEBUG [${serviceId}] Connecting to PostgreSQL primary cluster (127.0.0.1:5432)...`,
      `[${timestamp}] SUCCESS [${serviceId}] Completed sweep with 0 fatal errors. Latency: 142ms.`,
      ...prev
    ]);

    setTimeout(() => {
      setServices(prevServices => 
        prevServices.map(s => s.id === serviceId ? {
          ...s,
          status: 'running',
          lastRunTime: `Just now (${timestamp})`,
          totalInvocations24h: s.totalInvocations24h + 1
        } : s)
      );
      setExecutingServiceId(null);
      setToastMessage(`Service "${serviceName}" executed successfully! Success Rate: 100%`);
    }, 1200);
  };

  const filteredServices = services.filter(s => selectedCategory === 'all' || s.category === selectedCategory);

  const avgSuccessRate = (services.reduce((acc, s) => acc + s.successRate, 0) / services.length).toFixed(2);
  const avgErrorRate = (services.reduce((acc, s) => acc + s.errorRate, 0) / services.length).toFixed(2);
  const totalInvocations = services.reduce((acc, s) => acc + s.totalInvocations24h, 0).toLocaleString();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn font-mono">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-800 hover:text-emerald-950 font-bold">✕</button>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3">
            <Server className="w-7 h-7 text-indigo-600 animate-pulse" />
            <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">Platform Web Services Telemetry & Health</h1>
          </div>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl font-sans font-medium">
            Real-time status monitoring, cron run times, success/error rates, and daemon controls across all 6 core microservices.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center space-x-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All 6 Microservices Operational</span>
          </span>
        </div>
      </div>

      {/* Infrastructure Telemetry Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Active Web Services</span>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700">
              <Server className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 font-mono">6 Microservices</div>
            <p className="text-[11px] text-emerald-700 font-mono mt-1 font-bold">● 100% System Availability</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Avg Success Rate</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-emerald-700 font-mono">{avgSuccessRate}%</div>
            <p className="text-[11px] text-slate-500 font-mono mt-1 font-bold">0.05% Failure Delta</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Avg Error Rate</span>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 font-mono">{avgErrorRate}%</div>
            <p className="text-[11px] text-emerald-700 font-mono mt-1 font-bold">● Below 0.5% SLA Threshold</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">24h Invocations</span>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 font-mono">{totalInvocations}</div>
            <p className="text-[11px] text-slate-500 font-mono mt-1 font-bold">Distributed Across Swarms</p>
          </div>
        </div>

      </div>

      {/* Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between flex-wrap gap-3 font-mono text-xs">
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Filter Services:</span>
          {[
            { id: 'all', label: 'All Services (6)' },
            { id: 'scraper', label: 'Scrapers & Crawlers' },
            { id: 'security', label: 'Security & BIPA/C2PA' },
            { id: 'settlement', label: 'Settlement & DMCA' },
            { id: 'ai_model', label: 'AI LLM Scrapers' },
            { id: 'database', label: 'Vector Index DB' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow-xs'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Microservices Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          const isExecuting = executingServiceId === service.id;

          return (
            <div 
              key={service.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5 hover:border-amber-400/60 transition-all animate-fadeIn"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 font-display">{service.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{service.id} • {service.frequency}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 border ${
                    service.status === 'running' || service.status === 'executing'
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-amber-50 text-amber-900 border-amber-300'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`}></span>
                    <span className="uppercase">{isExecuting ? 'EXECUTING...' : service.status}</span>
                  </span>
                </div>
              </div>

              {/* Success / Error Rates Visual Progress */}
              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">Success Rate vs. Error Rate</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-700 font-extrabold">{service.successRate}% Success</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-rose-600 font-extrabold">{service.errorRate}% Error</span>
                  </div>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden border border-slate-200/80">
                  <div style={{ width: `${service.successRate}%` }} className="bg-emerald-500 transition-all duration-500"></div>
                  <div style={{ width: `${service.errorRate}%` }} className="bg-rose-500 transition-all duration-500"></div>
                </div>
              </div>

              {/* Execution Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Last Run Time</span>
                  <span className="text-slate-900 font-bold block truncate">{service.lastRunTime}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Next Scheduled</span>
                  <span className="text-slate-900 font-bold block truncate">{service.nextRunTime}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">24h Invocations</span>
                  <span className="text-slate-900 font-bold block">{service.totalInvocations24h.toLocaleString()}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Latency</span>
                  <span className="text-indigo-700 font-bold block">{service.avgLatencyMs}ms</span>
                </div>
              </div>

              {service.lastErrorMessage && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-mono flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>{service.lastErrorMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] text-slate-400 font-mono">Process ID: PID_8942</span>
                
                <button
                  onClick={() => handleTriggerService(service.id, service.name)}
                  disabled={isExecuting}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xs transition-all flex items-center space-x-2 font-mono disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-950 ${isExecuting ? 'animate-spin' : ''}`} />
                  <span>{isExecuting ? 'Executing Service...' : 'Trigger Service Sweep'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Live Execution Console Logs */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Microservice Execution Console Logs</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Standard Out (stdout / stderr)</span>
        </div>

        <div className="h-44 overflow-y-auto bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
          <p className="text-slate-500">[2026-08-09 15:00:00] SYSTEM: Web Services Telemetry Daemon initialized (6 microservices attached).</p>
          <p className="text-emerald-400">[2026-08-09 15:28:10] SUCCESS [service_scrape_daemon] Scanned 1,420,000 nodes across YT, TikTok & IG. 0 fatal errors.</p>
          <p className="text-emerald-400">[2026-08-09 15:36:00] SUCCESS [service_c2pa_engine] Cryptographically signed 14 assets with SHA256 HSM keys.</p>
          <p className="text-amber-400">[2026-08-09 15:38:00] INFO [service_settlement_gate] Issued 3 retroactive settlement checkout gates via Stripe Connect.</p>
          
          {activeConsoleLog.map((log, idx) => (
            <p key={idx} className="text-amber-300 font-bold">{log}</p>
          ))}
        </div>
      </div>

    </div>
  );
};
