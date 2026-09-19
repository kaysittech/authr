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
  X
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e9eaf0] shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Single Krazy Header Row */}
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer flex-shrink-0" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">Authr</span>
            </div>
          </div>

          {/* Right-aligned Navigation Links (Pushed right next to Get Started button) */}
          <nav className="hidden lg:flex items-center space-x-7 text-[15px] font-medium text-slate-800 ml-auto mr-7">
            
            {/* Home */}
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`relative py-2 transition-colors hover:text-[#0144e4] ${
                activeTab === 'dashboard' ? 'text-[#0144e4] font-semibold' : ''
              }`}
            >
              <span>Home</span>
              {activeTab === 'dashboard' && (
                <span className="absolute bottom-[-4px] left-0 right-0 h-[2.5px] bg-[#0144e4] rounded-full" />
              )}
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
                      onClick={() => setActiveTab('dashboard')}
                      className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0144e4] transition-all"
                    >
                      <div className="font-bold text-slate-900">{feat.label}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-medium">{feat.desc}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Vault / App Main Menu Submenu Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('vault_menu')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1.5 hover:text-[#0144e4] transition-colors text-[#0144e4] font-bold">
                <Layers className="w-4 h-4 text-[#0144e4]" />
                <span>Vault Modules</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#0144e4] stroke-[2.5]" />
                {pendingClaimsCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
                    {pendingClaimsCount}
                  </span>
                )}
              </button>

              {activeDropdown === 'vault_menu' && (
                <div className="absolute top-full left-0 w-72 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2.5 space-y-1 z-50 animate-fadeIn text-left">
                  <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                    Select Vault Module
                  </div>
                  {appSubmenus.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
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

            {/* Pricing */}
            <a 
              href="#pricing" 
              onClick={() => setActiveTab('dashboard')} 
              className="hover:text-[#0144e4] transition-colors py-2"
            >
              Pricing
            </a>

            {/* Blog */}
            <button 
              onClick={() => setActiveTab('blog')} 
              className={`relative py-2 transition-colors hover:text-[#0144e4] ${
                activeTab === 'blog' ? 'text-[#0144e4] font-semibold' : ''
              }`}
            >
              <span>Blog</span>
              {activeTab === 'blog' && (
                <span className="absolute bottom-[-4px] left-0 right-0 h-[2.5px] bg-[#0144e4] rounded-full" />
              )}
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
                    { label: 'Statutory Compliance', desc: 'BIPA & DMCA 17 U.S.C. § 512' },
                    { label: 'Developer API', desc: 'FastAPI REST Telemetry' },
                    { label: 'Contact Counsel', desc: '24/7 Legal rights support' }
                  ].map((item) => (
                    <a
                      key={item.label}
                      href="#about"
                      onClick={() => setActiveTab('dashboard')}
                      className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0144e4] transition-all"
                    >
                      <div className="font-bold text-slate-900">{item.label}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-medium">{item.desc}</div>
                    </a>
                  ))}
                  {currentUser?.role === 'admin' && (
                    <a
                      href="?portal=admin"
                      className="block px-3 py-2 rounded-md text-xs font-bold text-[#0144e4] bg-blue-50 hover:bg-blue-100 transition-all border border-blue-100"
                    >
                      🚀 Launch admin.authr.id
                    </a>
                  )}
                </div>
              )}
            </div>

          </nav>

          {/* Right Header Actions (Exact Krazy Button & Search Icon Layout) */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            
            {/* Policy Toggle Pill (Authenticated) */}
            {currentUser && (
              <div className="hidden xl:flex items-center p-1 bg-slate-100 border border-[#e9eaf0] rounded-lg space-x-1">
                <button
                  onClick={() => setPolicyMode('strict_privacy')}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    policyMode === 'strict_privacy'
                      ? 'bg-rose-500 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Strict Privacy Mode"
                >
                  <Lock className="w-3 h-3" />
                  <span>Strict</span>
                </button>
                <button
                  onClick={() => setPolicyMode('micro_monetization')}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    policyMode === 'micro_monetization'
                      ? 'bg-[#0144e4] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Royalty Licensing Mode"
                >
                  <Coins className="w-3 h-3" />
                  <span>Royalty</span>
                </button>
              </div>
            )}

            {/* Primary 'Get Started' Blue Button (Exact match: rounded-[6px], vibrant royal blue) */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                {isAdminUser && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3.5 py-2.5 rounded-[6px] font-extrabold text-xs transition-all flex items-center space-x-1.5 border shadow-2xs ${
                      activeTab === 'admin'
                        ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50'
                        : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-amber-400/40'
                    }`}
                    title="Open Master Site Admin Portal"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Admin Portal</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-6 py-2.5 rounded-[6px] bg-[#0144e4] hover:bg-[#0038c7] text-white font-semibold text-[15px] transition-all flex items-center space-x-2"
                >
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.fullName} 
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-white" 
                  />
                  <span>{currentUser.fullName.split(' ')[0]} Vault</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
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

            {/* Search Toggle Icon (Solid Blue Magnifying Glass) */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2 animate-fadeIn">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Vault..."
                    className="px-3 py-1.5 text-xs border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4] w-36 sm:w-44"
                    autoFocus
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1 text-[#0144e4] hover:text-[#0038c7] transition-colors"
                  title="Search"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
