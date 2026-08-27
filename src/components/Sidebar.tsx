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
  Sparkles,
  ChevronRight,
  LogOut,
  LogIn,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  Plus,
  Server
} from 'lucide-react';
import { PolicyMode } from '../types';
import { UserSession } from './AuthModal';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  policyMode: PolicyMode;
  setPolicyMode: (mode: PolicyMode) => void;
  pendingClaimsCount: number;
  currentUser: UserSession | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onSelectDiscipline?: (newDiscipline: string) => void;
  onOpenUpgradeModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  policyMode,
  setPolicyMode,
  pendingClaimsCount,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onSelectDiscipline,
  onOpenUpgradeModal
}) => {
  const [isDisciplineDropdownOpen, setIsDisciplineDropdownOpen] = React.useState(false);

  return (
    <aside className="w-80 flex-shrink-0 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between p-5 shadow-sm z-30">
      
      {/* Top Section: Brand & Nav Links */}
      <div className="space-y-6">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer pt-1" onClick={() => setActiveTab('dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
            <ShieldCheck className="w-5.5 h-5.5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">Authr</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded font-mono">Vault</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono font-medium">Independent Creator Rights</p>
          </div>
        </div>

        {/* Active Discipline Profile Switcher Dropdown */}
        {currentUser && (
          <div className="relative animate-fadeIn">
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">Active Rights Profile</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <button
              onClick={() => setIsDisciplineDropdownOpen(!isDisciplineDropdownOpen)}
              className="w-full p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-left transition-all flex items-center justify-between shadow-xs"
            >
              <div className="truncate pr-2">
                <p className="text-xs font-extrabold text-slate-900 truncate">
                  {currentUser.discipline || 'Likeness & Voice Protection'}
                </p>
                <p className="text-[10px] font-bold text-amber-800 font-mono">
                  ● Module Active & Protected
                </p>
              </div>
              {isDisciplineDropdownOpen ? <ChevronUp className="w-4 h-4 text-amber-900 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-amber-900 flex-shrink-0" />}
            </button>

            {/* Dropdown Menu */}
            {isDisciplineDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 animate-fadeIn">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block px-2 py-1 font-mono">
                  Switch Active Discipline
                </span>

                {[
                  { name: 'Likeness & Voice Protection', icon: '🎭' },
                  { name: 'Musicians & Composers', icon: '🎵' },
                  { name: 'Visual & Fine Artists', icon: '🎨' },
                  { name: 'Video Creators & Podcasters', icon: '🎬' },
                  { name: 'Authors & Literary Writers', icon: '✍️' },
                  { name: 'Commercial Brands & Agencies', icon: '🏢' },
                ].map((disc) => {
                  const isSelected = currentUser.discipline === disc.name;
                  return (
                    <button
                      key={disc.name}
                      onClick={() => {
                        if (onSelectDiscipline) onSelectDiscipline(disc.name);
                        setIsDisciplineDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 font-extrabold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span>{disc.icon}</span>
                        <span className="truncate">{disc.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 flex-shrink-0" />}
                    </button>
                  );
                })}

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsDisciplineDropdownOpen(false);
                      if (onOpenUpgradeModal) onOpenUpgradeModal();
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-extrabold text-amber-900 bg-amber-50 hover:bg-amber-100 flex items-center space-x-2 transition-all border border-amber-200"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-700" />
                    <span>Add More Modules ($29/mo)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Global Enforcement Mode Selector */}
        {currentUser ? (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Enforcement Policy
              </span>
              <span className="text-[9px] font-mono font-bold text-slate-400">Active Settings</span>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => setPolicyMode('strict_privacy')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  policyMode === 'strict_privacy'
                    ? 'bg-rose-500 text-white shadow-sm font-extrabold'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
                title="Strict Privacy: Automatically issues DMCA cease-and-desist takedowns for all unauthorized uses."
              >
                <div className="flex items-center space-x-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Strict Privacy</span>
                </div>
                {policyMode === 'strict_privacy' && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
              </button>

              <button
                onClick={() => setPolicyMode('micro_monetization')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  policyMode === 'micro_monetization'
                    ? 'bg-amber-400 text-slate-950 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
                title="Royalty Licensing: Generates retroactive licensing invoices & settlement checkout gates."
              >
                <div className="flex items-center space-x-2">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Royalty Licensing</span>
                </div>
                {policyMode === 'micro_monetization' && <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Enforcement Policy
              </span>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">
              Sign in to configure strict legal takedowns vs. commercial royalty licensing.
            </p>
          </div>
        )}

        {/* Vertical Navigation Menu */}
        <nav className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-3 mb-2">
            Main Menu
          </span>
          {(() => {
            const disc = currentUser?.discipline || '';
            const isLikenessAndVoice = disc.includes('Likeness') || disc === '';
            const isMusician = disc.includes('Musicians');
            const isVisualArtist = disc.includes('Visual');
            const isVideoCreator = disc.includes('Video');
            const isAuthor = disc.includes('Authors');
            const isBrand = disc.includes('Brands');

            const menuItems: { id: string; label: string; icon: any; badge?: number }[] = [
              { id: 'dashboard', label: 'Overview & Royalties', icon: Zap }
            ];

            if (isLikenessAndVoice) {
              menuItems.push({ id: 'biometrics', label: 'Likeness & Voice Registry', icon: UserCheck });
            } else if (isMusician) {
              menuItems.push({ id: 'biometrics', label: 'Vocal & Audio Registry', icon: UserCheck });
              menuItems.push({ id: 'assets', label: 'Audio Masters & Stems', icon: Video });
            } else if (isVisualArtist) {
              menuItems.push({ id: 'biometrics', label: 'Visual Art Registry', icon: UserCheck });
              menuItems.push({ id: 'assets', label: 'Artwork & Portfolio', icon: Video });
            } else if (isVideoCreator) {
              menuItems.push({ id: 'biometrics', label: 'Video & Face Mesh Registry', icon: UserCheck });
              menuItems.push({ id: 'assets', label: 'Video & Podcast Vault', icon: Video });
            } else if (isAuthor) {
              menuItems.push({ id: 'biometrics', label: 'Text & Manuscript Registry', icon: UserCheck });
              menuItems.push({ id: 'assets', label: 'Manuscripts & Articles', icon: Video });
            } else if (isBrand) {
              menuItems.push({ id: 'biometrics', label: 'Brand IP Registry', icon: UserCheck });
              menuItems.push({ id: 'assets', label: 'Brand Asset Vault', icon: Video });
            }

            const detectionLabel = isBrand ? 'Brand Impersonation Monitor' : 'Scrape & AI Monitor';

            menuItems.push(
              { id: 'detection', label: detectionLabel, icon: Radar },
              { id: 'settlement', label: 'Licensing Gate', icon: Scale, badge: pendingClaimsCount },
              { id: 'legal', label: 'Legal & DMCA Notices', icon: FileText },
              { id: 'financials', label: 'Royalty Ledger', icon: DollarSign },
              { id: 'webservices', label: 'Web Services Telemetry', icon: Server }
            );

            return menuItems;
          })().map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                    : 'text-slate-600 font-semibold hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap text-xs font-bold">{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 ? (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-950" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Standalone Admin Site Subdomain Launcher (Superusers Only) */}
        {currentUser?.role === 'admin' && (
          <div className="pt-2">
            <a
              href="?portal=admin"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-xs hover:bg-slate-800 transition-all border border-slate-800"
            >
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Launch admin.authr.id</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        )}

      </div>

      {/* Bottom User Profile / Auth Section */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        {currentUser ? (
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 truncate">
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.fullName}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-amber-400" 
                />
                <div className="text-left leading-tight truncate">
                  <p className="text-xs font-bold text-slate-900 truncate">{currentUser.fullName}</p>
                  <p className="text-[10px] text-amber-700 font-mono font-bold truncate">{currentUser.handle}</p>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="w-full py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4 text-slate-950" />
            <span>Sign In / Create Account</span>
          </button>
        )}

        <p className="text-[10px] text-slate-400 text-center font-mono">
          Authr Independent Network © 2026
        </p>
      </div>

    </aside>
  );
};
