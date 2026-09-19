import React, { useState } from 'react';
import { ShieldCheck, Search, ChevronDown, Lock } from 'lucide-react';

interface PublicHeaderProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  onOpenRegister,
  onOpenLogin
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e9eaf0] shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">Authr</span>
            </div>
          </div>

          {/* Center Navigation Links (Exact Krazy Menu Structure) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-700">
            
            <a href="#" className="hover:text-[#0144e4] transition-colors py-2">Home</a>

            {/* Features Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 hover:text-[#0144e4] transition-colors">
                <span>Features</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {activeDropdown === 'features' && (
                <div className="absolute top-full left-0 w-64 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2 space-y-1 animate-fadeIn">
                  {[
                    'Biometric & Likeness Vault',
                    'C2PA Cryptographic Watermarking',
                    'Automated Web Scrape Radar',
                    'DMCA & Legal Notice Studio',
                    'Stripe Royalty Checkout Gate',
                    'Polygon L2 Provenance Ledger'
                  ].map((item) => (
                    <a
                      key={item}
                      href="#features"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0144e4] transition-all"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#pricing" className="hover:text-[#0144e4] transition-colors py-2">Pricing</a>
            <a href="#blog" className="hover:text-[#0144e4] transition-colors py-2">Resource Center</a>

            {/* About Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 hover:text-[#0144e4] transition-colors">
                <span>About</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-52 bg-white border border-[#e9eaf0] rounded-xl shadow-xl p-2 space-y-1 animate-fadeIn">
                  {['Statutory Compliance', 'Developer API', 'Contact Rights Counsel'].map((item) => (
                    <a
                      key={item}
                      href="#about"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0144e4] transition-all"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>

          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-4">
            
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

            <button
              onClick={onOpenLogin}
              className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs group"
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
              onClick={onOpenLogin}
              className="hidden md:flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0144e4] transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#0144e4]" />
              <span>Sign In</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              Get Started
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
