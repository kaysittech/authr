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
  Server,
  Layers,
  Sliders,
  BarChart3,
  BookOpen,
  X,
  ArrowLeft,
  Settings,
  Activity,
  Users,
  MessageSquare,
  KeyRound,
  Globe
} from 'lucide-react';
import { PolicyMode } from '../types';
import { UserSession } from './AuthModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeAdminTab?: string;
  setActiveAdminTab?: (tab: string) => void;
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
  activeAdminTab = 'overview',
  setActiveAdminTab,
  policyMode,
  setPolicyMode,
  pendingClaimsCount,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onSelectDiscipline
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const currentAdminTab = activeAdminTab;

  const disc = currentUser?.discipline || '';
  const isLikenessAndVoice = disc.includes('Likeness') || disc === '';
  const isMusician = disc.includes('Musicians');
  const isVisualArtist = disc.includes('Visual');
  const isVideoCreator = disc.includes('Video');
  const isAuthor = disc.includes('Authors');
  const isBrand = disc.includes('Brands');

  const isAdminUser = currentUser && (
    currentUser.role === 'admin' ||
    currentUser.email === 'admin@authr.id' ||
    currentUser.email === 'christiana.obafunwa@gmail.com' ||
    currentUser.email === 'kaysitsolutions@gmail.com' ||
    currentUser.handle === '@site_admin' ||
    Boolean(currentUser.token && currentUser.token.includes('admin'))
  );

  const appSubmenus: { id: string; label: string; icon: any; badge?: number; desc: string }[] = [];

  if (isAdminUser) {
    appSubmenus.push({ id: 'admin', label: 'Admin Ops Portal', icon: ShieldCheck, desc: 'Master admin controls & user management' });
  }

  appSubmenus.push({ id: 'dashboard', label: 'Overview & Royalties', icon: Zap, desc: 'Real-time telemetry and revenue' });

  if (isLikenessAndVoice) {
    appSubmenus.push({ id: 'biometrics', label: 'Likeness & Voice Registry', icon: UserCheck, desc: '128-node face & voice vectors' });
  } else if (isMusician) {
    appSubmenus.push({ id: 'biometrics', label: 'Vocal & Audio Registry', icon: UserCheck, desc: 'Acoustic spectral fingerprints' });
    appSubmenus.push({ id: 'assets', label: 'Audio Masters & Stems', icon: Video, desc: 'C2PA stem signatures' });
  } else if (isVisualArtist) {
    appSubmenus.push({ id: 'biometrics', label: 'Visual Art Registry', icon: UserCheck, desc: 'Artistic style fingerprint' });
    appSubmenus.push({ id: 'assets', label: 'Artwork & Portfolio', icon: Video, desc: 'Digital asset vault' });
  } else if (isVideoCreator) {
    appSubmenus.push({ id: 'biometrics', label: 'Video & Face Mesh Registry', icon: UserCheck, desc: '3D facial mesh vectors' });
    appSubmenus.push({ id: 'assets', label: 'Video & Podcast Vault', icon: Video, desc: 'Video fingerprint vault' });
  } else if (isAuthor) {
    appSubmenus.push({ id: 'biometrics', label: 'Text & Manuscript Registry', icon: UserCheck, desc: 'Stylometric fingerprint' });
    appSubmenus.push({ id: 'assets', label: 'Manuscripts & Articles', icon: Video, desc: 'Literary asset vault' });
  } else if (isBrand) {
    appSubmenus.push({ id: 'biometrics', label: 'Brand IP Registry', icon: UserCheck, desc: 'Corporate brand vectors' });
    appSubmenus.push({ id: 'assets', label: 'Brand Asset Vault', icon: Video, desc: 'Trademark asset vault' });
  }

  const detectionLabel = isBrand ? 'Brand Impersonation Monitor' : 'Scrape & AI Monitor';

  appSubmenus.push(
    { id: 'detection', label: detectionLabel, icon: Radar, desc: 'Real-time AI & social scrape radar' },
    { id: 'settlement', label: 'Licensing Gate', icon: Scale, badge: pendingClaimsCount, desc: 'Automated settlement invoicing' },
    { id: 'legal', label: 'Legal & DMCA Notices', icon: FileText, desc: '17 U.S.C. § 512 statutory filings' },
    { id: 'financials', label: 'Royalty Ledger', icon: DollarSign, desc: 'Stripe payouts & Polygon L2' },
    { id: 'webservices', label: 'Web Services Telemetry', icon: Server, desc: 'Cloud Run API diagnostics' },
    { id: 'blog', label: 'Blog & IP Journal', icon: BookOpen, desc: 'BIPA & C2PA legal insights' }
  );

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const renderUserProfileDropdown = () => {
    if (!currentUser) return null;

    const userFirstName = currentUser.fullName ? currentUser.fullName.split(' ')[0] : 'Account';

    return (
      <div 
        className="relative py-2"
        onMouseEnter={() => setActiveDropdown('user_menu')}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'user_menu' ? null : 'user_menu')}
            className="px-5 py-2.5 rounded-[12px] bg-[#0144e4] hover:bg-[#0038c7] text-white font-bold text-[15px] transition-all flex items-center space-x-2.5 shadow-md hover:shadow-lg cursor-pointer"
          >
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.fullName} 
              className="w-6 h-6 rounded-full object-cover ring-2 ring-white/50" 
            />
            <span>{userFirstName}</span>
            <ChevronDown className="w-4 h-4 text-white/90 stroke-[2.5]" />
          </button>

          <button
            onClick={onLogout}
            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* User Profile Dropdown Menu */}
        {activeDropdown === 'user_menu' && (
          <div className="absolute top-full right-0 w-80 bg-white border border-[#e9eaf0] rounded-2xl shadow-2xl p-3.5 space-y-3.5 z-50 animate-fadeIn text-left mt-1.5">
            
            {/* User Profile Header */}
            <div className="flex items-center space-x-3 pb-3 border-b border-[#e9eaf0]">
              <img 
                src={currentUser.avatarUrl} 
                alt={currentUser.fullName} 
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#0144e4]/30" 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold text-slate-900 truncate">{currentUser.fullName}</p>
                <p className="text-[11px] text-slate-400 font-mono truncate">{currentUser.handle}</p>
              </div>
              {isAdminUser && (
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0144e4] font-mono text-[10px] font-extrabold uppercase flex-shrink-0 border border-blue-200">
                  ADMIN
                </span>
              )}
            </div>

            {/* Portal Navigation Section */}
            <div className="space-y-1.5">
              <div className="px-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                Portal Navigation
              </div>

              {/* 1. Main Website */}
              <button
                onClick={() => {
                  handleTabSelect('landing');
                  setActiveDropdown(null);
                }}
                className={`w-full p-2.5 rounded-xl text-left transition-all border flex items-center justify-between group cursor-pointer ${
                  activeTab === 'landing' || activeTab === 'public_landing'
                    ? 'bg-blue-50/80 border-[#0144e4] text-[#0144e4] shadow-2xs font-extrabold'
                    : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-blue-50/50 hover:border-blue-300 hover:text-[#0144e4]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    activeTab === 'landing' || activeTab === 'public_landing' ? 'bg-[#0144e4] text-white' : 'bg-white border border-slate-200 text-slate-600 group-hover:border-blue-300 group-hover:text-[#0144e4]'
                  }`}>
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-none">🌐 Main Website</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Public Landing & Features</p>
                  </div>
                </div>
                {(activeTab === 'landing' || activeTab === 'public_landing') && (
                  <Check className="w-4 h-4 text-[#0144e4] stroke-[3]" />
                )}
              </button>

              {/* 2. Application */}
              <button
                onClick={() => {
                  handleTabSelect('dashboard');
                  setActiveDropdown(null);
                }}
                className={`w-full p-2.5 rounded-xl text-left transition-all border flex items-center justify-between group cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-50/80 border-[#0144e4] text-[#0144e4] shadow-2xs font-extrabold'
                    : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-blue-50/50 hover:border-blue-300 hover:text-[#0144e4]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    activeTab === 'dashboard' ? 'bg-[#0144e4] text-white' : 'bg-white border border-slate-200 text-slate-600 group-hover:border-blue-300 group-hover:text-[#0144e4]'
                  }`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-none">⚡ Creator Vault App</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Telemetry & Works Dashboard</p>
                  </div>
                </div>
                {activeTab === 'dashboard' && (
                  <Check className="w-4 h-4 text-[#0144e4] stroke-[3]" />
                )}
              </button>

              {/* 3. Admin Portal (if Admin) */}
              {isAdminUser && (
                <button
                  onClick={() => {
                    handleTabSelect('admin');
                    setActiveDropdown(null);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition-all border flex items-center justify-between group cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-blue-50/80 border-[#0144e4] text-[#0144e4] shadow-2xs font-extrabold'
                      : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-blue-50/50 hover:border-blue-300 hover:text-[#0144e4]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      activeTab === 'admin' ? 'bg-[#0144e4] text-white' : 'bg-white border border-slate-200 text-slate-600 group-hover:border-blue-300 group-hover:text-[#0144e4]'
                    }`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none">🛡️ Admin Ops Portal</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Under Construction & Controls</p>
                    </div>
                  </div>
                  {activeTab === 'admin' && (
                    <Check className="w-4 h-4 text-[#0144e4] stroke-[3]" />
                  )}
                </button>
              )}
            </div>

            {/* Licensing Policy Mode */}
            <div className="space-y-1.5 border-t border-[#e9eaf0] pt-2.5">
              <div className="px-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                Licensing Policy Mode
              </div>

              {/* Strict Privacy Option */}
              <button
                onClick={() => setPolicyMode('strict_privacy')}
                className={`w-full p-2 rounded-lg text-left transition-all border cursor-pointer ${
                  policyMode === 'strict_privacy'
                    ? 'bg-rose-50 border-rose-300 text-rose-950 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-bold text-xs">
                    <Lock className={`w-3.5 h-3.5 ${policyMode === 'strict_privacy' ? 'text-rose-600' : 'text-slate-400'}`} />
                    <span>Strict Privacy Mode</span>
                  </div>
                  {policyMode === 'strict_privacy' && (
                    <Check className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight font-medium">
                  Zero-tolerance DMCA takedowns for all unauthorized uses.
                </p>
              </button>

              {/* Royalty Licensing Option */}
              <button
                onClick={() => setPolicyMode('micro_monetization')}
                className={`w-full p-2 rounded-lg text-left transition-all border cursor-pointer ${
                  policyMode === 'micro_monetization'
                    ? 'bg-blue-50 border-blue-300 text-blue-950 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-bold text-xs">
                    <Coins className={`w-3.5 h-3.5 ${policyMode === 'micro_monetization' ? 'text-[#0144e4]' : 'text-slate-400'}`} />
                    <span>Royalty Monetization</span>
                  </div>
                  {policyMode === 'micro_monetization' && (
                    <Check className="w-3.5 h-3.5 text-[#0144e4] stroke-[3]" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight font-medium">
                  Commercial micro-licensing ($0.08/query, $250/ad).
                </p>
              </button>
            </div>

            {/* Sign Out Button */}
            <div className="border-t border-[#e9eaf0] pt-2">
              <button
                onClick={() => {
                  onLogout();
                  setActiveDropdown(null);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Sign Out</span>
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // DEDICATED ADMIN HEADER WITH TOP MENU BAR DROPDOWNS
  if (activeTab === 'admin') {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-[#e9eaf0] shadow-2xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Clean Authr Admin Logo */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer" 
              onClick={() => handleTabSelect('admin')}
            >
              <div className="w-9 h-9 rounded-xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight font-display flex items-center space-x-1.5">
                <span>Authr</span>
                <span className="text-[#0144e4] text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 font-sans">Admin</span>
              </span>
            </div>

            {/* Middle: 3 Grouped Top Menu Bar Dropdowns matching Home Page Header Style */}
            <nav className="hidden lg:flex items-center space-x-6 text-[15px] font-medium text-slate-800">
              
              {/* 1. Operations & Security */}
              <div 
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown('admin_ops')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'admin_ops' ? null : 'admin_ops')}
                  className={`flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors py-2 font-bold text-sm ${
                    ['overview', 'matches', 'audit'].includes(currentAdminTab) ? 'text-[#0144e4]' : 'text-slate-800'
                  }`}
                >
                  <Activity className="w-4 h-4 text-[#0144e4]" />
                  <span>Operations & Security</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                </button>

                {activeDropdown === 'admin_ops' && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2.5 space-y-1 z-50 animate-fadeIn text-left">
                    <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                      Operations & Security
                    </div>
                    {[
                      { id: 'overview', label: 'Platform Overview & Ops', icon: Activity, desc: 'Master telemetry & node status' },
                      { id: 'matches', label: 'Infringement Clearinghouse', icon: Scale, desc: 'Flagged scrapes & DMCA claims' },
                      { id: 'audit', label: 'Security & BIPA Audit Log', icon: Lock, desc: 'Immutable compliance ledger' }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isActive = currentAdminTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (setActiveAdminTab) setActiveAdminTab(item.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-all ${
                            isActive
                              ? 'bg-[#0144e4] text-white shadow-2xs'
                              : 'text-slate-700 hover:bg-blue-50 hover:text-[#0144e4]'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0144e4]'}`} />
                            <div>
                              <p className="font-extrabold text-xs">{item.label}</p>
                              <p className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. CMS & Commercial */}
              <div 
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown('admin_cms')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'admin_cms' ? null : 'admin_cms')}
                  className={`flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors py-2 font-bold text-sm ${
                    ['pages', 'pricing', 'reviews'].includes(currentAdminTab) ? 'text-[#0144e4]' : 'text-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#0144e4]" />
                  <span>CMS & Commercial</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                </button>

                {activeDropdown === 'admin_cms' && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2.5 space-y-1 z-50 animate-fadeIn text-left">
                    <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                      CMS & Commercial
                    </div>
                    {[
                      { id: 'pages', label: 'Page Content CMS', icon: BookOpen, desc: 'Manage landing & career content' },
                      { id: 'pricing', label: 'Plans & Pricing Manager', icon: DollarSign, desc: 'Subscription tiers & take-rate' },
                      { id: 'reviews', label: 'Customer Reviews', icon: MessageSquare, desc: 'Testimonials & case studies' }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isActive = currentAdminTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (setActiveAdminTab) setActiveAdminTab(item.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-all ${
                            isActive
                              ? 'bg-[#0144e4] text-white shadow-2xs'
                              : 'text-slate-700 hover:bg-blue-50 hover:text-[#0144e4]'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0144e4]'}`} />
                            <div>
                              <p className="font-extrabold text-xs">{item.label}</p>
                              <p className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. Users & Infrastructure */}
              <div 
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown('admin_users')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'admin_users' ? null : 'admin_users')}
                  className={`flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors py-2 font-bold text-sm ${
                    ['users', 'system', 'webservices'].includes(currentAdminTab) ? 'text-[#0144e4]' : 'text-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4 text-[#0144e4]" />
                  <span>Users & Infrastructure</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                </button>

                {activeDropdown === 'admin_users' && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2.5 space-y-1 z-50 animate-fadeIn text-left">
                    <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                      Users & Infrastructure
                    </div>
                    {[
                      { id: 'users', label: 'Creator Vault & Directory', icon: Users, desc: 'Accounts & KYC approvals' },
                      { id: 'system', label: 'Crawler & Swarm Nodes', icon: Server, desc: '1,420 distributed scrapers' },
                      { id: 'system', label: 'Invite-Only & Access Control', icon: KeyRound, desc: 'VIP codes & sign-up mode' },
                      { id: 'webservices', label: 'Web Services Telemetry', icon: Radar, desc: 'API endpoints & diagnostics' }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isActive = currentAdminTab === item.id;
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            if (setActiveAdminTab) setActiveAdminTab(item.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-all ${
                            isActive
                              ? 'bg-[#0144e4] text-white shadow-2xs'
                              : 'text-slate-700 hover:bg-blue-50 hover:text-[#0144e4]'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0144e4]'}`} />
                            <div>
                              <p className="font-extrabold text-xs">{item.label}</p>
                              <p className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </nav>

            {/* Right: Logged In Admin Profile Dropdown */}
            {currentUser && renderUserProfileDropdown()}

          </div>
        </div>
      </header>
    );
  }

  const isPublicMainWebsite = activeTab === 'landing' || activeTab === 'public_landing' || ['blog', 'compliance', 'developers', 'counsel'].includes(activeTab);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e9eaf0] shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer flex-shrink-0" 
            onClick={() => handleTabSelect(isPublicMainWebsite ? 'landing' : 'dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">Authr</span>
            </div>
          </div>

          {/* Right-aligned Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[15px] font-medium text-slate-800 ml-auto mr-7">
            {isPublicMainWebsite ? (
              <>
                {/* Home */}
                <button 
                  onClick={() => handleTabSelect('landing')}
                  className="hover:text-[#0144e4] transition-colors py-2 font-semibold"
                >
                  <span>Home</span>
                </button>

                {/* Features Dropdown */}
                <div 
                  className="relative py-2"
                  onMouseEnter={() => setActiveDropdown('features')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors">
                    <span>Features</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                  </button>

                  {activeDropdown === 'features' && (
                    <div className="absolute top-full left-0 w-64 bg-white border border-[#e9eaf0] rounded-lg shadow-xl p-2 space-y-1 z-50 animate-fadeIn text-left">
                      {[
                        { label: 'Biometric & Likeness Vault', desc: '128-node face & voice prints' },
                        { label: 'C2PA Watermarking', desc: 'SHA-256 cryptographic provenance' },
                        { label: 'Web Scrape Radar', desc: 'YouTube, TikTok & Meta monitoring' },
                        { label: 'DMCA Notice Studio', desc: '17 U.S.C. § 512 legal filings' },
                        { label: 'Stripe Licensing Gate', desc: 'Automated settlement invoicing' },
                        { label: 'Polygon L2 Provenance', desc: 'On-chain royalty ledger' }
                      ].map((feat) => (
                        <a
                          key={feat.label}
                          href="#features"
                          onClick={() => handleTabSelect('landing')}
                          className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0144e4] transition-all"
                        >
                          <div className="font-bold text-slate-900">{feat.label}</div>
                          <div className="text-[10px] text-slate-400 font-mono font-medium">{feat.desc}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <a 
                  href="#pricing" 
                  onClick={() => handleTabSelect('landing')} 
                  className="hover:text-[#0144e4] transition-colors py-2"
                >
                  Pricing
                </a>

                {/* Blog */}
                <button 
                  onClick={() => handleTabSelect('blog')} 
                  className="hover:text-[#0144e4] transition-colors py-2"
                >
                  <span>Blog</span>
                </button>

                {/* About Dropdown */}
                <div 
                  className="relative py-2"
                  onMouseEnter={() => setActiveDropdown('about')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors">
                    <span>About</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                  </button>

                  {activeDropdown === 'about' && (
                    <div className="absolute top-full left-0 w-56 bg-white border border-[#e9eaf0] rounded-lg shadow-xl p-2 space-y-1 z-50 animate-fadeIn text-left">
                      {[
                        { label: 'Statutory Compliance', desc: 'BIPA & DMCA 17 U.S.C. § 512', tab: 'compliance' },
                        { label: 'Developer API', desc: 'FastAPI REST Telemetry', tab: 'developers' },
                        { label: 'Contact Counsel', desc: '24/7 Legal rights support', tab: 'counsel' }
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleTabSelect(item.tab)}
                          className="w-full text-left block px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0144e4] transition-all"
                        >
                          <div className="font-bold text-slate-900">{item.label}</div>
                          <div className="text-[10px] text-slate-400 font-mono font-medium">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Logged in view: Modules split across top horizontal menu into 3 grouped items */}
                
                {/* 1. Vault & Registries */}
                <div 
                  className="relative py-2"
                  onMouseEnter={() => setActiveDropdown('group_vault')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors">
                    <Zap className="w-4 h-4 text-[#0144e4]" />
                    <span>Vault & Registries</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                  </button>

                  {activeDropdown === 'group_vault' && (
                    <div className="absolute top-full left-0 w-72 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2.5 space-y-1 z-50 animate-fadeIn text-left">
                      <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                        Vault & Registries
                      </div>
                      {appSubmenus.filter(m => ['dashboard', 'biometrics', 'assets'].includes(m.id)).map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleTabSelect(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-all ${
                              isActive
                                ? 'bg-[#0144e4] text-white shadow-2xs'
                                : 'text-slate-700 hover:bg-blue-50 hover:text-[#0144e4]'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0144e4]'}`} />
                              <div>
                                <p className="font-extrabold text-xs">{item.label}</p>
                                <p className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. Rights & Enforcement */}
                <div 
                  className="relative py-2"
                  onMouseEnter={() => setActiveDropdown('group_rights')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors">
                    <Radar className="w-4 h-4 text-[#0144e4]" />
                    <span>Rights & Enforcement</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                    {pendingClaimsCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
                        {pendingClaimsCount}
                      </span>
                    )}
                  </button>

                  {activeDropdown === 'group_rights' && (
                    <div className="absolute top-full left-0 w-72 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2.5 space-y-1 z-50 animate-fadeIn text-left">
                      <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                        Protection & Enforcement
                      </div>
                      {appSubmenus.filter(m => ['detection', 'settlement', 'legal'].includes(m.id)).map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleTabSelect(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-all ${
                              isActive
                                ? 'bg-[#0144e4] text-white shadow-2xs'
                                : 'text-slate-700 hover:bg-blue-50 hover:text-[#0144e4]'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0144e4]'}`} />
                              <div>
                                <p className="font-extrabold text-xs">{item.label}</p>
                                <p className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                            {item.badge !== undefined && item.badge > 0 && (
                              <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. Financials & Telemetry */}
                <div 
                  className="relative py-2"
                  onMouseEnter={() => setActiveDropdown('group_financials')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors">
                    <DollarSign className="w-4 h-4 text-[#0144e4]" />
                    <span>Financials & Telemetry</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                  </button>

                  {activeDropdown === 'group_financials' && (
                    <div className="absolute top-full left-0 w-72 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2.5 space-y-1 z-50 animate-fadeIn text-left">
                      <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                        Financials & Analytics
                      </div>
                      {appSubmenus.filter(m => ['financials', 'webservices', 'blog'].includes(m.id)).map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleTabSelect(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-all ${
                              isActive
                                ? 'bg-[#0144e4] text-white shadow-2xs'
                                : 'text-slate-700 hover:bg-blue-50 hover:text-[#0144e4]'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0144e4]'}`} />
                              <div>
                                <p className="font-extrabold text-xs">{item.label}</p>
                                <p className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* End of Application Vault Header Nav */}
              </>
            )}
          </nav>

          {/* Right Header Actions (Exact Krazy Button & Search Icon Layout) */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            
            {/* User Profile Button with Dropdown Menu */}
            {currentUser ? renderUserProfileDropdown() : (
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={onOpenAuthModal}
                  className="hidden sm:flex items-center space-x-2 px-3.5 py-2.5 rounded-[6px] bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-[13px] transition-all shadow-2xs group"
                  title="Sign in with Google"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span className="group-hover:text-[#0144e4]">Google Sign-In</span>
                </button>
                <button
                  onClick={onOpenAuthModal}
                  className="px-6 py-2.5 rounded-[6px] bg-[#0144e4] hover:bg-[#0038c7] text-white font-semibold text-[15px] transition-all shadow-2xs"
                >
                  Get Started
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
