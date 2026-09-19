import React, { useState } from 'react';
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
  Search,
  ChevronDown,
  LogOut,
  LogIn,
  ExternalLink,
  Plus,
  Check,
  Server
} from 'lucide-react';
import { PolicyMode } from '../types';
import { UserSession } from './AuthModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  policyMode: PolicyMode;
  setPolicyMode: (mode: PolicyMode) => void;
  pendingClaimsCount: number;
  currentUser: UserSession | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onSelectDiscipline?: (newDiscipline: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  policyMode,
  setPolicyMode,
  pendingClaimsCount,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onSelectDiscipline
}) => {
  const [isDisciplineDropdownOpen, setIsDisciplineDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e9eaf0] shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand & Discipline Switcher Dropdown */}
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-2.5 cursor-pointer" 
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">Authr</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0144e4] bg-blue-50 px-2 py-0.5 rounded font-mono border border-blue-100">
                    Vault
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono font-medium hidden sm:block">
                  Sovereign Creator Rights
                </p>
              </div>
            </div>

            {/* Discipline Dropdown Switcher */}
            {currentUser && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsDisciplineDropdownOpen(!isDisciplineDropdownOpen)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 text-xs font-bold text-slate-800 flex items-center space-x-2 transition-all"
                >
                  <span className="text-[#0144e4]">●</span>
                  <span className="truncate max-w-[160px]">
                    {currentUser.discipline || 'Likeness & Voice'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0144e4]" />
                </button>

                {isDisciplineDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-[#e9eaf0] rounded-2xl shadow-xl p-2 space-y-1 z-50 animate-fadeIn">
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
                    ].map((discItem) => {
                      const isSelected = currentUser.discipline === discItem.name;
                      return (
                        <button
                          key={discItem.name}
                          onClick={() => {
                            if (onSelectDiscipline) onSelectDiscipline(discItem.name);
                            setIsDisciplineDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-[#0144e4] text-white'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span>{discItem.icon}</span>
                            <span className="truncate">{discItem.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center: Global Policy Mode Switcher */}
          {currentUser && (
            <div className="hidden lg:flex items-center p-1 bg-slate-100 border border-[#e9eaf0] rounded-xl space-x-1">
              <button
                onClick={() => setPolicyMode('strict_privacy')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  policyMode === 'strict_privacy'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Strict Privacy: Automatically issues DMCA cease-and-desist takedowns."
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Strict Privacy</span>
              </button>

              <button
                onClick={() => setPolicyMode('micro_monetization')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  policyMode === 'micro_monetization'
                    ? 'bg-[#0144e4] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Royalty Licensing: Generates retroactive licensing invoices & checkout gates."
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Royalty Licensing</span>
              </button>
            </div>
          )}

          {/* Right: Actions, Search, Notifications, Admin Launcher & Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Search Input Bar / Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2 animate-fadeIn">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="px-3 py-1.5 text-xs border border-[#e9eaf0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0144e4] w-36 sm:w-48"
                    autoFocus
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-slate-600 hover:text-[#0144e4] transition-colors"
                  title="Search site"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Notifications */}
            {currentUser && (
              <button 
                onClick={() => setActiveTab('settlement')}
                className="relative p-2 text-slate-600 hover:text-[#0144e4] rounded-xl transition-all"
                title="Active Claims & Settlements"
              >
                <Bell className="w-5 h-5" />
                {pendingClaimsCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full">
                    {pendingClaimsCount}
                  </span>
                )}
              </button>
            )}

            {/* Admin Launcher (Superusers) */}
            {currentUser?.role === 'admin' && (
              <a
                href="?portal=admin"
                className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-xs hover:bg-slate-800 transition-all border border-slate-800"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0144e4]" />
                <span>admin.authr.id</span>
              </a>
            )}

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-[#e9eaf0]">
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.fullName}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-blue-500/40" 
                />
                <div className="text-left leading-tight hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[110px]">{currentUser.fullName}</p>
                  <p className="text-[10px] text-[#0144e4] font-mono font-bold">{currentUser.handle}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0144e4] transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onOpenAuthModal}
                  className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Bottom Horizontal Main Menu Bar (Replaces Left Sidebar) */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2.5 scrollbar-none border-t border-[#e9eaf0]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0144e4] text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
                    {item.badge}
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
