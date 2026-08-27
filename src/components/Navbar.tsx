import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Video, 
  Radar, 
  Scale, 
  FileText, 
  DollarSign, 
  Zap, 
  Lock, 
  Coins,
  Bell,
  Sparkles
} from 'lucide-react';
import { PolicyMode } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  policyMode: PolicyMode;
  setPolicyMode: (mode: PolicyMode) => void;
  pendingClaimsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  policyMode,
  setPolicyMode,
  pendingClaimsCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0D1117]/95 border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-indigo-600 shadow-md shadow-amber-500/10">
              <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-display">
                  Rights<span className="text-amber-400">Guard</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-md">
                  Independent Network
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Likeness Registry & Royalty Clearinghouse for Artists & Creators
              </p>
            </div>
          </div>

          {/* Mode Switcher: Strict Privacy vs Royalty Monetization */}
          <div className="hidden md:flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setPolicyMode('strict_privacy')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                policyMode === 'strict_privacy'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Automatic BIPA, DMCA & Copyright Enforcement"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Strict Privacy Mode</span>
            </button>
            <button
              onClick={() => setPolicyMode('micro_monetization')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                policyMode === 'micro_monetization'
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Allow Automated Commercial & AI Micro-Licensing"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Royalty Licensing Mode</span>
            </button>
          </div>

          {/* User Profile & Notification Center */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button 
                onClick={() => setActiveTab('settlement')}
                className="relative p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-xl transition-all"
                title="Active Claims & Settlements"
              >
                <Bell className="w-5 h-5" />
                {pendingClaimsCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full">
                    {pendingClaimsCount}
                  </span>
                )}
              </button>
            </div>

            <div className="hidden lg:flex items-center space-x-2.5 pl-3 border-l border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="Alex Rivera"
                className="w-8 h-8 rounded-full ring-2 ring-amber-400/40 object-cover" 
              />
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-slate-200">Alex Rivera</p>
                <p className="text-[10px] text-amber-400 font-mono font-semibold">Artist ID #8923</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/40">
          {[
            { id: 'dashboard', label: 'Overview & Royalties', icon: Zap },
            { id: 'biometrics', label: 'Likeness & Voice Registry', icon: UserCheck },
            { id: 'assets', label: 'Art & Asset Vault', icon: Video },
            { id: 'detection', label: 'Web Scrape Monitor', icon: Radar },
            { id: 'settlement', label: 'Licensing Gate', icon: Scale, badge: pendingClaimsCount },
            { id: 'legal', label: 'DMCA & Legal Notices', icon: FileText },
            { id: 'financials', label: 'Royalty Ledger', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800/90 text-amber-300 border border-amber-400/30 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
