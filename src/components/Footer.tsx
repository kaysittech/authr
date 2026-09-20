import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenRegister }) => {
  const handleSelect = (tab: string) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-white border-t border-[#e9eaf0] pt-12 text-slate-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
          
          {/* Column 1: Brand Logo & Info */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleSelect('dashboard')}>
              <div className="w-9 h-9 rounded-xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">Authr</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              The independent creator rights & royalty network providing identity registration, C2PA cryptographic watermarking, AI model scrape radar, and automated statutory royalty clearing.
            </p>
          </div>

          {/* Column 2: Company (4 items) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">Company</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => handleSelect('get_started')} className="hover:text-[#0144e4] transition-colors text-left">
                  Get Started
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('about')} className="hover:text-[#0144e4] transition-colors text-left">
                  About Authr
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('blog')} className="hover:text-[#0144e4] transition-colors text-left">
                  Blog &amp; Creator Insights
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('careers')} className="hover:text-[#0144e4] transition-colors text-left">
                  Careers &amp; Open Roles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Features (4 items) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">Features</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => handleSelect('page_detection')} className="hover:text-[#0144e4] transition-colors text-left">
                  AI Radar &amp; Scrape Monitor
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('page_biometrics')} className="hover:text-[#0144e4] transition-colors text-left">
                  Biometric Likeness Registry
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('page_assets')} className="hover:text-[#0144e4] transition-colors text-left">
                  C2PA Vault &amp; Watermarking
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('page_settlement')} className="hover:text-[#0144e4] transition-colors text-left">
                  Royalty Settlement Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Security (4 items) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">Legal &amp; Security</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => handleSelect('page_legal')} className="hover:text-[#0144e4] transition-colors text-left">
                  DMCA &amp; Takedown Studio
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('page_financials')} className="hover:text-[#0144e4] transition-colors text-left">
                  Statutory Earnings Ledger
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('privacy')} className="hover:text-[#0144e4] transition-colors text-left">
                  Privacy Policy &amp; BIPA
                </button>
              </li>
              <li>
                <button onClick={() => handleSelect('terms')} className="hover:text-[#0144e4] transition-colors text-left">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Full Width Royal Blue Bar */}
      <div className="bg-[#0144e4] text-white py-4 px-4 text-center text-xs font-semibold font-mono">
        © 2026 All Rights Reserved Authr Platform
      </div>
    </footer>
  );
};
