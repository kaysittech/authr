import React from 'react';
import { Lock, ShieldCheck, UserCheck, KeyRound, ArrowRight } from 'lucide-react';

interface AuthGuardProps {
  title: string;
  description: string;
  onOpenAuthModal: () => void;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  title,
  description,
  onOpenAuthModal
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 text-center max-w-xl mx-auto space-y-6 animate-fadeIn">
      
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-lg">
          <Lock className="w-10 h-10 stroke-[2.5]" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center border-2 border-white shadow-md">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold uppercase tracking-wider border border-slate-200 inline-block font-mono">
          Authentication Required
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <button
          onClick={onOpenAuthModal}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2.5"
        >
          <UserCheck className="w-4 h-4 text-slate-950" />
          <span>Sign In / Create Verified Account</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1 w-full text-xs font-mono">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Zero-Knowledge Vault Standard</div>
        <div className="text-slate-700 font-semibold">
          All biometrics, C2PA media assets, and royalty payout ledgers are cryptographically isolated per user account.
        </div>
      </div>

    </div>
  );
};
