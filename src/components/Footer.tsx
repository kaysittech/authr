import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#e9eaf0] pt-12 text-slate-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
          
          {/* Column 1: Brand Logo & Info */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">Authr</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Everything you need to make your business grow super fast with the Krazy Multi-Purpose Technology Theme layout.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">Company</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#register" className="hover:text-[#0144e4] transition-colors">Get Started</a></li>
              <li><a href="#pricing" className="hover:text-[#0144e4] transition-colors">Pricing</a></li>
              <li><a href="#careers" className="hover:text-[#0144e4] transition-colors">Careers</a></li>
              <li><a href="#about" className="hover:text-[#0144e4] transition-colors">About</a></li>
              <li><a href="#blog" className="hover:text-[#0144e4] transition-colors">Blog</a></li>
              <li><a href="#privacy" className="hover:text-[#0144e4] transition-colors">Privacy</a></li>
            </ul>
          </div>

          {/* Column 3: Features */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">Features</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#features" className="hover:text-[#0144e4] transition-colors">Machine Learning</a></li>
              <li><a href="#features" className="hover:text-[#0144e4] transition-colors">User Journey</a></li>
              <li><a href="#features" className="hover:text-[#0144e4] transition-colors">Automated Reports</a></li>
              <li><a href="#features" className="hover:text-[#0144e4] transition-colors">User Analytics</a></li>
              <li><a href="#features" className="hover:text-[#0144e4] transition-colors">Adaptive Testing</a></li>
              <li><a href="#features" className="hover:text-[#0144e4] transition-colors">Customized Dashboard</a></li>
            </ul>
          </div>

          {/* Column 4: System */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">System</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#system" className="hover:text-[#0144e4] transition-colors">404 Error Page</a></li>
              <li><a href="#system" className="hover:text-[#0144e4] transition-colors">500 Server Error</a></li>
              <li><a href="#system" className="hover:text-[#0144e4] transition-colors">Email Subscription Preferences</a></li>
              <li><a href="#system" className="hover:text-[#0144e4] transition-colors">Unsubscribe Backup Pages</a></li>
              <li><a href="#system" className="hover:text-[#0144e4] transition-colors">Password Prompt</a></li>
              <li><a href="#system" className="hover:text-[#0144e4] transition-colors">Search Results</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Full Width Royal Blue Bar */}
      <div className="bg-[#0144e4] text-white py-4 px-4 text-center text-xs font-semibold font-mono">
        © 2026 All Rights Reserved and Powered by Authr Krazy Theme Engine
      </div>
    </footer>
  );
};
