import React, { useState } from 'react';
import { WebServicesDashboard } from './WebServicesDashboard';
import { 
  ShieldCheck, 
  Users, 
  Radar, 
  DollarSign, 
  Activity, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  SlidersHorizontal, 
  Filter, 
  Eye, 
  UserCheck, 
  FileText, 
  Scale, 
  RefreshCw, 
  Trash2, 
  Sparkles,
  Server,
  Zap,
  Globe,
  CheckCircle,
  XCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { DetectionMatch, SettlementClaim } from '../types';

interface AdminPanelProps {
  matches: DetectionMatch[];
  claims: SettlementClaim[];
  onResolveMatch?: (id: string, action?: 'approve' | 'reject') => void;
  onSimulateScan?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  matches,
  claims,
  onResolveMatch = () => {},
  onSimulateScan = () => {}
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'pricing' | 'users' | 'matches' | 'system' | 'webservices' | 'audit'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKycFilter, setSelectedKycFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Pricing & Commission Take-Rate State
  const [platformTakeRate, setPlatformTakeRate] = useState<number>(15.0);
  const [singleModuleFee, setSingleModuleFee] = useState<number>(29.00);
  const [allAccessFee, setAllAccessFee] = useState<number>(79.00);
  const [gracePeriodHours, setGracePeriodHours] = useState<number>(48);

  // Per-Discipline Benchmark Floor Rates State
  const [disciplineRates, setDisciplineRates] = useState({
    music: { name: 'Musicians & Composers', queryRate: 0.08, adRate: 250.00, status: 'Active' },
    visual: { name: 'Visual & Fine Artists', queryRate: 0.15, adRate: 350.00, status: 'Active' },
    video: { name: 'Video Creators & Podcasters', queryRate: 0.12, adRate: 450.00, status: 'Active' },
    literary: { name: 'Authors & Literary Writers', queryRate: 0.05, adRate: 500.00, status: 'Active' }
  });
  
  // Inspection Modal State
  const [selectedUserDocModal, setSelectedUserDocModal] = useState<any | null>(null);

  // Mock User Directory for Admin Management
  const [usersList, setUsersList] = useState<Array<{
    id: string;
    email: string;
    fullName: string;
    handle: string;
    discipline: string;
    kycStatus: 'verified' | 'pending' | 'review_required';
    idDocumentType: string;
    idMatchScore: number;
    registeredAssetsCount: number;
    totalEarnings: number;
    joinedDate: string;
    bipaHash: string;
  }>>([
    {
      id: 'usr_892314',
      email: 'alex@authr.id',
      fullName: 'Alex Rivera',
      handle: '@arivera_official',
      discipline: 'Musicians & Composers',
      kycStatus: 'verified',
      idDocumentType: "Driver's License (IL-90218)",
      idMatchScore: 99.4,
      registeredAssetsCount: 5,
      totalEarnings: 1521.92,
      joinedDate: '2026-07-15',
      bipaHash: 'bipa_hash_0x892314_vocal_mesh'
    },
    {
      id: 'usr_902184',
      email: 'sarah.conner@authr.id',
      fullName: 'Sarah Conner',
      handle: '@sconner_art',
      discipline: 'Visual & Fine Artists',
      kycStatus: 'verified',
      idDocumentType: 'Passport (US-88102)',
      idMatchScore: 98.7,
      registeredAssetsCount: 12,
      totalEarnings: 3420.00,
      joinedDate: '2026-07-20',
      bipaHash: 'bipa_hash_0x902184_art_signature'
    },
    {
      id: 'usr_441092',
      email: 'jane.doe@authr.id',
      fullName: 'Jane Doe',
      handle: '@janedoe_podcasts',
      discipline: 'Video Creators & Podcasters',
      kycStatus: 'review_required',
      idDocumentType: 'State ID Card (NY-44019)',
      idMatchScore: 88.2,
      registeredAssetsCount: 3,
      totalEarnings: 450.00,
      joinedDate: '2026-08-01',
      bipaHash: 'bipa_hash_0x441092_voice_print'
    },
    {
      id: 'usr_119284',
      email: 'licensing@brandcorp.com',
      fullName: 'BrandCorp Media Agency',
      handle: '@brandcorp_hq',
      discipline: 'Commercial Brands & Agencies',
      kycStatus: 'verified',
      idDocumentType: 'Articles of Incorporation (DE-0012)',
      idMatchScore: 99.9,
      registeredAssetsCount: 28,
      totalEarnings: 14850.00,
      joinedDate: '2026-06-10',
      bipaHash: 'bipa_hash_0x119284_corporate_vault'
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveKyc = (userId: string) => {
    setUsersList(usersList.map(u => u.id === userId ? { ...u, kycStatus: 'verified', idMatchScore: 99.1 } : u));
    showToast(`KYC Verification manually approved for User ID: ${userId}`);
  };

  const handleToggleSuspendUser = (userId: string) => {
    showToast(`User status updated for User ID: ${userId}`);
  };

  const filteredUsers = usersList.filter(u => {
    const matchesQuery = u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.handle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKyc = selectedKycFilter === 'all' || u.kycStatus === selectedKycFilter;
    return matchesQuery && matchesKyc;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Admin Panel Hero Header - BRIGHT LIGHT DESIGN */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden text-slate-900">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-black uppercase tracking-widest bg-amber-400 text-slate-950 rounded-full flex items-center gap-1.5 font-mono shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                SUPERUSER ADMIN OPS
              </span>
              <span className="text-xs text-slate-500 font-mono">Node #SW-ADMIN-PROD-01 • Mode: Superuser Master</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-display">
              Independent Rights & Network Operations Panel
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-medium">
              Global clearinghouse analytics, Government ID KYC approval queue, crawler swarm health, and biometric vector registry management.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <button
              onClick={() => { onSimulateScan(); showToast('Global Crawler Swarm Sweep Dispatched Across 1,420 Nodes!'); }}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center space-x-2 whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>Trigger Global Crawler Sweep</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Active Creator Vaults</span>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 font-mono">8,942</div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1 font-mono">✓ 99.2% KYC Verified</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Gross Volume Cleared</span>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-emerald-700 font-mono">$1,248,920</div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">Platform Fee (15%): $187,338</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Active Crawler Swarms</span>
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Radar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-indigo-700 font-mono">1,420 Nodes</div>
            <p className="text-[11px] text-indigo-600 font-bold mt-1 font-mono">● 0.04ms Latency Feed</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">BIPA & C2PA Compliance</span>
            <div className="p-3 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-purple-700 font-mono">100% Compliant</div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">Zero Security Failures</p>
          </div>
        </div>
      </div>

      {/* Admin Operations 6-Tab Sub-Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {[
          { id: 'overview', label: 'Platform Overview & Ops', icon: Activity },
          { id: 'pricing', label: 'Discipline Rates & App Commission', icon: DollarSign },
          { id: 'users', label: 'Creator Vault & KYC Directory', icon: Users },
          { id: 'matches', label: 'Infringement Clearinghouse Queue', icon: Scale },
          { id: 'system', label: 'Crawler Swarms & Node Infrastructure', icon: Server },
          { id: 'webservices', label: 'Web Services Telemetry', icon: Server },
          { id: 'audit', label: 'BIPA & Security Audit Log', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ---------------- ADMIN TAB 1: OVERVIEW & SYSTEM OPS ---------------- */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Clearinghouse Volume & Settlement Flow</h3>
                <p className="text-xs text-slate-500">Real-time breakdown of automated DMCA licensing settlements across disciplines.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full font-mono text-xs font-bold">
                98.4% Resolution Rate
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 font-mono">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Visual Art Settlements</span>
                <span className="text-lg font-black text-slate-900">$482,100</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Voice & Acoustic Licensing</span>
                <span className="text-lg font-black text-slate-900">$390,450</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Music Master Stems</span>
                <span className="text-lg font-black text-slate-900">$376,370</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-400 font-mono uppercase">Superuser Master System Controls</span>
                <span className="text-[10px] text-slate-400 font-mono">Node Status: HEALTHY</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => showToast('Triggered full clearinghouse re-index sweep!')}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Flush Redis Cache</span>
                </button>
                <button
                  onClick={() => showToast('Master Cryptographic C2PA Keys Rotated Successfully!')}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center justify-center space-x-2"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Rotate C2PA Keys</span>
                </button>
                <button
                  onClick={() => showToast('Dispatched BIPA Statutory Compliance Audit across 8,942 accounts!')}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Audit BIPA Logs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scrape Daemon & Crawler Cluster Controls */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-sm border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <Radar className="w-5 h-5 text-amber-400 animate-pulse" />
                    <h3 className="text-base font-extrabold text-white">Global Background Scrape Daemon Controls</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Configures automated cron scrape interval for 1,420 distributed crawler nodes across YouTube, TikTok & LLM datasets.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
                    ● Daemon Running (Interval: 6 Hours)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => showToast('Scrape Daemon frequency set to Every 1 Hour')}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 text-left space-y-1 transition-all"
                >
                  <span className="text-[10px] text-amber-400 uppercase font-mono block font-bold">Ultra High Frequency</span>
                  <span className="text-sm font-extrabold block">Every 1 Hour</span>
                  <span className="text-[10px] text-slate-400 block font-normal">High System Bandwidth</span>
                </button>

                <button
                  onClick={() => showToast('Scrape Daemon frequency set to Every 6 Hours (Default)')}
                  className="p-3 rounded-2xl bg-amber-400 text-slate-950 border border-amber-300 text-left space-y-1 font-extrabold shadow-sm transition-all"
                >
                  <span className="text-[10px] text-slate-950 uppercase font-mono block font-extrabold">Recommended (Active)</span>
                  <span className="text-sm font-black block">Every 6 Hours</span>
                  <span className="text-[10px] text-slate-900 block font-semibold">Balanced Node Performance</span>
                </button>

                <button
                  onClick={() => showToast('Scrape Daemon frequency set to Every 12 Hours')}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 text-left space-y-1 transition-all"
                >
                  <span className="text-[10px] text-amber-400 uppercase font-mono block font-bold">Standard Frequency</span>
                  <span className="text-sm font-extrabold block">Every 12 Hours</span>
                  <span className="text-[10px] text-slate-400 block font-normal">Eco Mode Crawl</span>
                </button>

                <button
                  onClick={() => {
                    onSimulateScan();
                    showToast('Emergency Swarm Scrape Job Dispatched across 1,420 Nodes!');
                  }}
                  className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500 text-left space-y-1 shadow-sm transition-all"
                >
                  <span className="text-[10px] text-indigo-200 uppercase font-mono block font-bold">Emergency Trigger</span>
                  <span className="text-sm font-extrabold block flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Run Full Sweep</span>
                  </span>
                  <span className="text-[10px] text-indigo-200 block font-normal">Immediate Redis Job Queue</span>
                </button>
              </div>
            </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Platform Health & Swarm Metrics</h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500 font-bold">PostgreSQL Main DB:</span>
                <span className="text-emerald-700 font-bold">● Connected (1.2ms)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500 font-bold">Faiss Vector Index:</span>
                <span className="text-emerald-700 font-bold">● 4.2M Vectors Loaded</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500 font-bold">C2PA Signature Engine:</span>
                <span className="text-emerald-700 font-bold">● Active (HSM-v2)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500 font-bold">BIPA Verification Node:</span>
                <span className="text-emerald-700 font-bold">● Operational</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB: DISCIPLINE RATES & APP COMMISSION ---------------- */}
      {activeAdminTab === 'pricing' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Platform Take-Rate & Pricing Control Suite</h2>
                <p className="text-xs text-slate-500 mt-0.5">Configure global app license commission percentages, cross-discipline add-on subscription fees, and default floor rates across all 4 disciplines.</p>
              </div>

              <button
                onClick={() => showToast(`Global platform pricing & ${platformTakeRate}% take-rate configuration saved!`)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center space-x-2 whitespace-nowrap self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Save Pricing Configuration</span>
              </button>
            </div>

            {/* Global Take-Rate & Add-on Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <span className="text-[11px] font-bold text-amber-900 font-mono uppercase block">App Platform Commission Fee</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.5"
                    value={platformTakeRate}
                    onChange={(e) => setPlatformTakeRate(parseFloat(e.target.value) || 0)}
                    className="w-24 bg-white border border-amber-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-sm font-black font-mono text-amber-900">%</span>
                </div>
                <p className="text-[10px] text-amber-800 font-medium">Applied to gross settlement claims & license clearings.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 font-mono uppercase block">Single Discipline Add-on</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-black font-mono text-slate-700">$</span>
                  <input
                    type="number"
                    value={singleModuleFee}
                    onChange={(e) => setSingleModuleFee(parseFloat(e.target.value) || 0)}
                    className="w-24 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none"
                  />
                  <span className="text-xs text-slate-500 font-mono">/ mo</span>
                </div>
                <p className="text-[10px] text-slate-500">Per additional discipline module add-on.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 font-mono uppercase block">All-Access Creator Pass</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-black font-mono text-slate-700">$</span>
                  <input
                    type="number"
                    value={allAccessFee}
                    onChange={(e) => setAllAccessFee(parseFloat(e.target.value) || 0)}
                    className="w-24 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none"
                  />
                  <span className="text-xs text-slate-500 font-mono">/ mo</span>
                </div>
                <p className="text-[10px] text-slate-500">Unlocks all 4 creative discipline modules.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 font-mono uppercase block">Statutory Grace Period</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={gracePeriodHours}
                    onChange={(e) => setGracePeriodHours(parseInt(e.target.value) || 0)}
                    className="w-24 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none"
                  />
                  <span className="text-xs text-slate-500 font-mono">Hours</span>
                </div>
                <p className="text-[10px] text-slate-500">Grace period before automated DMCA takedown.</p>
              </div>
            </div>

            {/* Discipline Default Floor Rates Matrix */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-extrabold text-slate-900">Per-Discipline Default Floor Rates & Commercial Caps</h3>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-4 font-sans">Creative Discipline</th>
                      <th className="p-4 font-sans">AI Training / Scrape Query Floor</th>
                      <th className="p-4 font-sans">Commercial Ad / Placement Floor</th>
                      <th className="p-4 font-sans">Discipline Status</th>
                      <th className="p-4 text-right font-sans">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {Object.entries(disciplineRates).map(([key, disc]) => (
                      <tr key={key} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-slate-900 font-sans">
                          {disc.name}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-500 font-bold">$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={disc.queryRate}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setDisciplineRates({
                                  ...disciplineRates,
                                  [key]: { ...disc, queryRate: val }
                                });
                              }}
                              className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900"
                            />
                            <span className="text-[10px] text-slate-400 font-sans">/ query</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-500 font-bold">$</span>
                            <input
                              type="number"
                              value={disc.adRate}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setDisciplineRates({
                                  ...disciplineRates,
                                  [key]: { ...disc, adRate: val }
                                });
                              }}
                              className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900"
                            />
                            <span className="text-[10px] text-slate-400 font-sans">/ ad</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold uppercase font-sans">
                            {disc.status}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => showToast(`Floor rates updated for ${disc.name}!`)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 font-sans"
                          >
                            Update Floor
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Commission Revenue Calculator Box */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Live Platform Revenue Split Model</span>
                <span className="text-[10px] text-slate-400">Current App Take Rate: {platformTakeRate}%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Gross Volume Cleared</span>
                  <span className="text-lg font-black text-white">$1,248,920.00</span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <span className="text-[10px] text-amber-400 uppercase font-bold block">App Take-Rate Revenue ({platformTakeRate}%)</span>
                  <span className="text-lg font-black text-amber-400">${(1248920 * (platformTakeRate / 100)).toFixed(2)}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">Net Creator Payout ({(100 - platformTakeRate).toFixed(1)}%)</span>
                  <span className="text-lg font-black text-emerald-400">${(1248920 * (1 - (platformTakeRate / 100))).toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB 2: CREATOR VAULT DIRECTORY ---------------- */}
      {activeAdminTab === 'users' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">User Identity & KYC Directory</h2>
              <p className="text-xs text-slate-500 mt-0.5">Inspect registered creator accounts, biometric KYC match scores, and settlement balances.</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search user name or handle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <select
                value={selectedKycFilter}
                onChange={(e) => setSelectedKycFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold focus:border-amber-400 focus:outline-none"
              >
                <option value="all">All KYC Statuses</option>
                <option value="verified">Verified Only</option>
                <option value="review_required">Review Required</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  <th className="p-4">User / Creator</th>
                  <th className="p-4">Discipline Profile</th>
                  <th className="p-4">Government ID KYC</th>
                  <th className="p-4">Match Score</th>
                  <th className="p-4">Registered Works</th>
                  <th className="p-4">Total Revenue</th>
                  <th className="p-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <span>{u.fullName}</span>
                          <span className="text-[10px] font-mono text-slate-400">({u.handle})</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{u.email} • ID: {u.id}</div>
                      </div>
                    </td>

                    <td className="p-4 font-bold text-slate-700">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-mono">
                        {u.discipline}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 w-fit ${
                        u.kycStatus === 'verified'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border border-amber-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.kycStatus === 'verified' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        <span>{u.kycStatus === 'verified' ? 'KYC VERIFIED' : 'REVIEW REQUIRED'}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1 font-mono">{u.idDocumentType}</span>
                    </td>

                    <td className="p-4">
                      <span className="font-mono font-bold text-slate-900 text-xs">{u.idMatchScore}% Match</span>
                    </td>

                    <td className="p-4 font-mono font-bold text-slate-800">
                      {u.registeredAssetsCount} Works
                    </td>

                    <td className="p-4 font-mono font-bold text-amber-700">
                      ${u.totalEarnings.toFixed(2)}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedUserDocModal(u)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] border border-slate-200 transition-all flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-600" />
                          <span>Inspect ID Doc</span>
                        </button>

                        {u.kycStatus !== 'verified' && (
                          <button
                            onClick={() => handleApproveKyc(u.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all shadow-xs"
                          >
                            Approve KYC
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleSuspendUser(u.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-[11px] border border-rose-200 transition-all"
                        >
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB 3: GLOBAL INFRINGEMENT QUEUE ---------------- */}
      {activeAdminTab === 'matches' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Global Infringement Clearinghouse Queue</h2>
              <p className="text-xs text-slate-500 mt-0.5">Review system-wide detected web scrapes, AI voice clones, and automated DMCA notices.</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-mono text-xs font-bold">
              {matches.length} Total Matches Flagged
            </span>
          </div>

          <div className="space-y-3">
            {matches.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900">{m.assetTitle}</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-white text-slate-700 border border-slate-200">
                      {m.targetPlatform}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-amber-100 text-amber-900">
                      {m.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    Uploader: <strong className="text-slate-800">{m.uploaderName}</strong> • Similarity: <strong className="text-amber-700">{m.visualSimilarity || m.audioSimilarity}%</strong> • Est. Views: {m.viewCount.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-right">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Calculated Fee</span>
                    <span className="text-sm font-black text-amber-700 font-mono">${m.estimatedLostRevenue.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => showToast(`DMCA Legal Takedown Notice forcefully dispatched to ${m.targetPlatform}!`)}
                    className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-300 transition-all whitespace-nowrap"
                  >
                    Force DMCA
                  </button>

                  <a
                    href={m.infringingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB 4: SYSTEM CRAWLER NODES ---------------- */}
      {activeAdminTab === 'system' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Crawler Swarms & Node Infrastructure</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time status of cross-platform scraping detection nodes across social platforms and AI model datasets.</p>
            </div>
            <button
              onClick={() => showToast('All 1,420 Crawler Swarm Nodes restarted!')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs transition-all flex items-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Restart Swarms</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'YouTube Shorts Crawler Swarm', nodes: 380, status: 'Operational', ping: '12ms', platform: 'YouTube' },
              { name: 'TikTok Video Stream Scraper', nodes: 420, status: 'Operational', ping: '18ms', platform: 'TikTok' },
              { name: 'Instagram Reels Media Node', nodes: 290, status: 'Operational', ping: '15ms', platform: 'Instagram' },
              { name: 'Common Crawl AI Dataset Scanner', nodes: 180, status: 'Operational', ping: '42ms', platform: 'Common Crawl' },
              { name: 'Midjourney & SD Image Scraper', nodes: 150, status: 'Operational', ping: '38ms', platform: 'AI Generators' },
            ].map((crawler, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{crawler.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {crawler.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-600 pt-2 border-t border-slate-200">
                  <span>Nodes: <strong>{crawler.nodes} Active</strong></span>
                  <span>Latency: <strong>{crawler.ping}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB 5: BIPA & SECURITY AUDIT LOG ---------------- */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">BIPA & Security Event Audit Feed</h2>
            <p className="text-xs text-slate-500 mt-0.5">Real-time immutable compliance ledger for biometric vectors, C2PA signatures, and DMCA legal notice dispatches.</p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { time: '2026-08-09 00:28:12', event: 'KYC VERIFICATION PASSED', user: 'Alex Rivera (usr_892314)', detail: 'BIPA biometric face vector and voice spectral print matched with 99.4% confidence.' },
              { time: '2026-08-09 00:24:05', event: 'C2PA SIGNATURE ISSUED', user: 'Sarah Conner (usr_902184)', detail: 'Cryptographic master signature 0x89f2a4b8 attached to original digital art.' },
              { time: '2026-08-09 00:19:40', event: 'SETTLEMENT FEE COLLECTED', user: 'BrandCorp HQ (usr_119284)', detail: '$750.00 retroactive license fee collected from GlobalFashionVendor_99.' },
              { time: '2026-08-09 00:12:00', event: 'BIPA CEASE & DESIST DISPATCHED', user: 'Jane Doe (usr_441092)', detail: 'Formal statutory notice dispatched to SyntheticVoices_Lab.' }
            ].map((log, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-slate-400">{log.time}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-900 text-amber-400">{log.event}</span>
                    <span className="text-slate-800 font-bold">{log.user}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB: WEB SERVICES & DAEMON HEALTH ---------------- */}
      {activeAdminTab === 'webservices' && (
        <WebServicesDashboard />
      )}

      {/* Government ID Document Inspection Modal */}
      {selectedUserDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Government ID & OCR Document Data</h3>
              </div>
              <button onClick={() => setSelectedUserDocModal(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">User Name:</span>
                <span className="font-bold text-slate-900">{selectedUserDocModal.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Document Type:</span>
                <span className="font-bold text-slate-900">{selectedUserDocModal.idDocumentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">KYC Facial Match Score:</span>
                <span className="font-bold text-emerald-700">{selectedUserDocModal.idMatchScore}% Match</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">BIPA Biometric Vector Hash:</span>
                <span className="font-bold text-slate-700 text-[10px]">{selectedUserDocModal.bipaHash}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-mono">
              ✓ Government ID verified against state driver database. Facial geometry match score exceeds statutory 95.0% threshold.
            </div>

            <button
              onClick={() => setSelectedUserDocModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs"
            >
              Close Inspection Window
            </button>
          </div>
        </div>
      )}

      {/* Admin Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl font-bold text-xs flex items-center space-x-3 animate-fadeIn border border-slate-700">
          <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

    </div>
  );
};
