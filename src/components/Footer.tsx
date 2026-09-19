import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenRegister }) => {
  return (
    <footer className="bg-white border-t border-[#e9eaf0] pt-12 text-slate-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
          
          {/* Column 1: Brand Logo & Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
              <div className="w-9 h-9 rounded-xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">Authr</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-sm">
              Sovereign creator identity registration, C2PA cryptographic watermarking, and automated statutory royalty clearing.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">Company</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={onOpenRegister} className="hover:text-[#0144e4] transition-colors text-left">
                  Get Started
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-[#0144e4] transition-colors text-left">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('careers')} className="hover:text-[#0144e4] transition-colors text-left">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-[#0144e4] transition-colors text-left">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('blog')} className="hover:text-[#0144e4] transition-colors text-left">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('privacy')} className="hover:text-[#0144e4] transition-colors text-left">
                  Privacy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Features */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">Features</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => onSelectTab('detection')} className="hover:text-[#0144e4] transition-colors text-left">
                  Machine Learning &amp; Radar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('biometrics')} className="hover:text-[#0144e4] transition-colors text-left">
                  User Journey &amp; Biometrics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('legal')} className="hover:text-[#0144e4] transition-colors text-left">
                  Automated Legal Reports
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('financials')} className="hover:text-[#0144e4] transition-colors text-left">
                  User Analytics &amp; Ledger
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('assets')} className="hover:text-[#0144e4] transition-colors text-left">
                  Adaptive C2PA Testing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-[#0144e4] transition-colors text-left">
                  Customized Dashboard
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Full Width Royal Blue Bar */}
      <div className="bg-[#0144e4] text-white py-4 px-4 text-center text-xs font-semibold font-mono">
        © 2026 All Rights Reserved and Powered by Authr Platform Engine
      </div>
    </footer>
  );
};
