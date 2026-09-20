import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, Sparkles } from 'lucide-react';

interface UnderConstructionViewProps {
  onGoogleSignIn: () => void;
}

export const UnderConstructionView: React.FC<UnderConstructionViewProps> = ({ onGoogleSignIn }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-8 p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
        
        {/* Brand Logo */}
        <div className="flex items-center justify-center space-x-3 cursor-default">
          <div className="w-12 h-12 rounded-2xl bg-[#0144e4] text-white flex items-center justify-center font-bold shadow-lg shadow-blue-600/30">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-white font-display">Authr</span>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold font-mono uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>🚧 Site Under Construction</span>
        </div>

        {/* Main Headings */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Platform Maintenance In Progress
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
            Authr is currently undergoing scheduled system upgrades. Public access is temporarily restricted.
          </p>
        </div>

        {/* Exclusive Google Sign-In Action Block */}
        <div className="pt-4 pb-2 space-y-4 max-w-xs mx-auto">
          <button
            onClick={onGoogleSignIn}
            className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group cursor-pointer border border-slate-200"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="group-hover:text-[#0144e4] transition-colors">Sign in with Google</span>
          </button>

          <p className="text-[11px] text-slate-500 font-mono font-medium flex items-center justify-center space-x-1">
            <Lock className="w-3 h-3 text-slate-500" />
            <span>Admin &amp; Authorized Staff Access Only</span>
          </p>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
          © 2026 Authr Platform System Status: Scheduled Maintenance
        </div>

      </div>
    </div>
  );
};
