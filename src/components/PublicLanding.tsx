import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  Fingerprint, 
  Scale, 
  DollarSign, 
  FileText, 
  Award, 
  Zap,
  UserCheck
} from 'lucide-react';

interface PublicLandingProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  onOpenRegister,
  onOpenLogin
}) => {
  return (
    <div className="space-y-12 py-4">
      
      {/* Hero Section - ORIGINAL OBSIDIAN THEME */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <span className="px-3.5 py-1 text-xs font-black uppercase tracking-widest bg-amber-400 text-slate-950 rounded-full font-mono flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Independent Creator Rights & Royalty Network
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Government ID Verified • C2PA & BIPA Protected
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display">
            Claim Independent Rights Over Your <span className="text-amber-400 font-black">Voice, Likeness</span> & Digital Media.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Authr is the automated identity, face, voice, and digital artwork clearinghouse. Protect your original works with tamper-proof C2PA cryptographic signatures, detect unauthorized AI training or web scraping, and issue automated settlement licenses.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenRegister}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2.5"
            >
              <UserCheck className="w-4 h-4 text-slate-950" />
              <span>Create Account (Government ID Required)</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={onOpenLogin}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Sign In to Independent Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* Network Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Royalties Cleared', value: '$1.2M+', icon: DollarSign, color: 'text-amber-600 bg-amber-50' },
          { label: 'C2PA Signed Master Works', value: '14,200+', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Facial Landmark Precision', value: '99.4%', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'BIPA Security Standard', value: '100% Compliant', icon: Lock, color: 'text-purple-600 bg-purple-50' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-mono uppercase">{stat.label}</span>
                <div className={`p-2 rounded-xl ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight font-display">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Key Network Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">How the Authr Independent Network Works</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Biometric identity verification and cryptographic provenance for modern creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Biometric & Government ID Vault</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Register your facial geometry vector mesh (128 nodes) and HD acoustic voice print. Verified against official Government ID documents (Driver's License / Passport).
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Automated Web & AI Scrape Monitor</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Continuous monitoring across YouTube, TikTok, Instagram, and AI model training sets for unauthorized voice cloning, face swaps, or stolen media assets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Settlement Gates & Instant Royalty Ledger</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Issue automated statutory licensing notices under 17 U.S.C. § 512(c) and BIPA. Collect licensing payouts via Stripe Connect directly into your bank.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
