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
  Zap,
  UserCheck,
  Globe,
  Layers,
  Award,
  Check,
  Sliders,
  BarChart3
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
    <div className="space-y-16 py-2">
      
      {/* Krazy Hero Section (kz-hero-1 style) */}
      <section className="relative overflow-hidden rounded-3xl bg-[#f7f8fa] border border-[#e9eaf0] p-8 sm:p-12 lg:p-16 shadow-sm">
        {/* Subtle Ambient Gradient Halos */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0144e4] text-xs font-bold font-mono uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0144e4]" />
              <span>Independent Creator Rights & Royalty Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-display">
              Grow Your Rights 10x with <span className="text-[#0144e4]">Authr</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
              The Authr platform brings all of your creator protection under one roof — biometric identity registration, digital artwork C2PA signing, automated web scraping detection, and instant statutory licensing settlements.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenRegister}
                className="px-7 py-4 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center space-x-2.5 group"
              >
                <UserCheck className="w-4.5 h-4.5 text-white" />
                <span>Create Account (Government ID)</span>
                <ArrowRight className="w-4.5 h-4.5 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenLogin}
                className="px-7 py-4 rounded-xl bg-white hover:bg-slate-100/80 text-slate-800 font-bold text-sm border border-[#e9eaf0] shadow-2xs transition-all flex items-center justify-center space-x-2"
              >
                <Lock className="w-4.5 h-4.5 text-[#0144e4]" />
                <span>Sign In to Vault</span>
              </button>
            </div>

            {/* Micro Specs */}
            <div className="pt-2 flex items-center space-x-6 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0144e4]" />
                BIPA Protected
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0144e4]" />
                C2PA Watermarked
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0144e4]" />
                Stripe Direct Payouts
              </span>
            </div>
          </div>

          {/* Hero Right Visual Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white p-6 rounded-2xl border border-[#e9eaf0] shadow-xl space-y-5">
              
              {/* Header card snippet */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0144e4] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Likeness & Voice Registry</h4>
                    <p className="text-[11px] text-slate-400 font-mono">ID Verified • Active Status</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono">
                  100% Protected
                </span>
              </div>

              {/* Stat Rows */}
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Fingerprint className="w-4 h-4 text-[#0144e4]" />
                    <span className="text-xs font-bold text-slate-700">Facial Vector Mesh</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900">128 Nodes Verified</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Radio className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-slate-700">Acoustic Voice Print</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900">FFT Spectrum Match</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-700">Total Royalties Cleared</span>
                  </div>
                  <span className="text-sm font-black font-display text-emerald-600">$1,248,500.00</span>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-slate-100">
                <span>C2PA Manifest #AUTHR-8923</span>
                <span className="text-[#0144e4] font-bold">Live Scan Operational →</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Krazy Logo Slider / Compliance Strip (kz-logo-slider) */}
      <section className="bg-white rounded-2xl border border-[#e9eaf0] p-6 shadow-2xs">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 font-mono text-center mb-4">
          Trusted Standards & Legal Compliance Partners
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center text-center">
          {[
            { label: 'C2PA Watermarking', desc: 'SHA-256 Provenance' },
            { label: 'BIPA Compliant', desc: 'Biometric Privacy Standard' },
            { label: '17 U.S.C. § 512', desc: 'DMCA Takedown Engine' },
            { label: 'Stripe Connect', desc: 'Instant Payout Gateway' },
            { label: 'Polygon L2', desc: 'On-Chain Ledger' }
          ].map((partner, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <p className="text-xs font-extrabold text-slate-800 font-display">{partner.label}</p>
              <p className="text-[10px] text-slate-400 font-mono">{partner.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Krazy Feature Cards Grid (kz-card-2 / Bespoke Solutions) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0144e4] text-xs font-bold font-mono uppercase tracking-widest">
            Our Bespoke Solutions
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            Sync Across All Devices & AI Networks
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Everything you need to protect and monetize your intellectual property super fast!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Dashboard Telemetry',
              desc: 'Real-time overview of active rights profiles, protected stems, web scrape matches, and instant payouts.',
              icon: BarChart3
            },
            {
              title: 'Custom Policy Rules',
              desc: 'Toggle seamlessly between Strict Privacy (DMCA Takedowns) and Commercial Royalty Licensing.',
              icon: Sliders
            },
            {
              title: 'Biometric Presets',
              desc: 'Store 128-node facial landmark meshes and FFT spectral voice prints verified against government IDs.',
              icon: Fingerprint
            },
            {
              title: 'Royalty Metrics & API',
              desc: 'Automated settlement invoices, Stripe Connect billing portals, and Polygon L2 provenance tracking.',
              icon: DollarSign
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-[#e9eaf0] shadow-sm hover:border-[#0144e4] hover:shadow-lg transition-all duration-200 group text-left space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0144e4] flex items-center justify-center group-hover:bg-[#0144e4] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Krazy Two-Column Content Showcase (kz-two-column-content-1) */}
      <section className="space-y-12">
        
        {/* Showcase 1: Left Image / Right Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#e9eaf0] shadow-2xs">
          <div className="lg:col-span-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0144e4] flex items-center justify-center">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-display">
              Biometric & Government ID Vault
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Register your facial geometry vector mesh and acoustic spectral voice vector. All biometric fingerprints are linked to official driver’s license or passport credentials, providing 100% legal standing in statutory litigation.
            </p>
            <button 
              onClick={onOpenRegister}
              className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-bold text-xs shadow-sm transition-all"
            >
              Learn More & Register
            </button>
          </div>
          <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 pb-2 border-b border-slate-200">
              <span>BIPA BIOMETRIC CERTIFICATE</span>
              <span className="text-[#0144e4]">VERIFIED</span>
            </div>
            <div className="space-y-2 text-xs font-mono text-slate-600">
              <div className="flex justify-between">
                <span>Facial Mesh Hashing:</span>
                <span className="font-bold text-slate-900">SHA-256 Vector</span>
              </div>
              <div className="flex justify-between">
                <span>Voice Spectral FFT:</span>
                <span className="font-bold text-slate-900">44.1kHz Multi-Band</span>
              </div>
              <div className="flex justify-between">
                <span>BIPA Security Standard:</span>
                <span className="font-bold text-emerald-600">100% Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase 2: Right Image / Left Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#e9eaf0] shadow-2xs">
          <div className="lg:col-span-6 order-2 lg:order-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 pb-2 border-b border-slate-200">
              <span>AUTOMATED DMCA & SETTLEMENT</span>
              <span className="text-emerald-600">INVOICE READY</span>
            </div>
            <div className="space-y-2 text-xs font-mono text-slate-600">
              <div className="flex justify-between">
                <span>Statutory Notice:</span>
                <span className="font-bold text-slate-900">17 U.S.C. § 512(c)</span>
              </div>
              <div className="flex justify-between">
                <span>Settlement Checkout Gate:</span>
                <span className="font-bold text-slate-900">Stripe Live Webhook</span>
              </div>
              <div className="flex justify-between">
                <span>L2 Provenance Record:</span>
                <span className="font-bold text-[#0144e4]">Polygon Mainnet</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-display">
              Settlement Gates & Automated Invoicing
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              When unauthorized uses, deepfakes, or stolen media assets are detected online, Authr generates instant statutory settlement notices and Stripe licensing checkout links, turning copyright infringements into passive revenue.
            </p>
            <button 
              onClick={onOpenRegister}
              className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-bold text-xs shadow-sm transition-all"
            >
              Start Automated Claims
            </button>
          </div>
        </div>

      </section>

      {/* Krazy Pricing Section (kz-pricing-1) */}
      <section className="bg-[#f7f8fa] border border-[#e9eaf0] rounded-3xl p-8 sm:p-12 text-center space-y-10 shadow-2xs">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0144e4] text-xs font-bold font-mono uppercase tracking-widest">
            No Credit Card Required
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            Plans &amp; Pricing
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            No risk, 30-day money back guarantee!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Basic Plan */}
          <div className="bg-white p-8 rounded-2xl border border-[#e9eaf0] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-sm font-bold text-[#0144e4]">$</span>
                <span className="text-4xl font-black text-slate-900 font-display">15</span>
                <span className="text-xs text-slate-500 font-mono">/ month</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Basic</h3>
              <div className="h-0.5 w-12 bg-[#0144e4]"></div>
              
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>1 Biometric Voice & Likeness Profile</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>Web Scrape Detection (YouTube/TikTok)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>C2PA Watermark Signing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>Email & Webhook Support</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={onOpenRegister}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-2xs"
            >
              Choose Basic Plan
            </button>
          </div>

          {/* Startup Creator Plan */}
          <div className="bg-white p-8 rounded-2xl border border-[#e9eaf0] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-sm font-bold text-[#0144e4]">$</span>
                <span className="text-4xl font-black text-slate-900 font-display">30</span>
                <span className="text-xs text-slate-500 font-mono">/ month</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Startup Creator</h3>
              <div className="h-0.5 w-12 bg-[#0144e4]"></div>
              
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>Up to 3 Active Discipline Profiles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>Automated DMCA Legal Notice Studio</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>Stripe Commercial Licensing Gate</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>Custom Policy Toggles</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={onOpenRegister}
              className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20"
            >
              Choose Startup Plan
            </button>
          </div>

          {/* Professional Plan (Featured / Krazy Popular) */}
          <div className="bg-white p-8 rounded-2xl border-2 border-[#0144e4] shadow-lg relative flex flex-col justify-between space-y-6">
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#0144e4] text-white font-extrabold text-[10px] uppercase tracking-widest rounded-full font-mono shadow-xs">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-sm font-bold text-[#0144e4]">$</span>
                <span className="text-4xl font-black text-slate-900 font-display">75</span>
                <span className="text-xs text-slate-500 font-mono">/ month</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Professional All-Access</h3>
              <div className="h-0.5 w-12 bg-[#0144e4]"></div>
              
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>All 6 Creative Discipline Modules</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>Polygon L2 On-Chain Provenance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>Enterprise Social API Keys</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#0144e4]" />
                  <span>24/7 Priority Dispute Telemetry</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={onOpenRegister}
              className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/20"
            >
              Get All-Access Pass
            </button>
          </div>

        </div>
      </section>

      {/* Krazy CTA Banner (kz-cta-2) */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0144e4] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            Ready to Protect Your Digital Works with Krazy-Fast Authr Technology?
          </h2>
          <p className="text-sm text-blue-100 font-medium leading-relaxed">
            Join thousands of independent artists, voice actors, musicians, and creators using government ID biometrics and automated legal settlement gates today.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={onOpenRegister}
              className="px-8 py-4 rounded-xl bg-white text-[#0144e4] hover:bg-blue-50 font-extrabold text-sm shadow-lg transition-all flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 text-[#0144e4]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
