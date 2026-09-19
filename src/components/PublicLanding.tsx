import React, { useState, useEffect } from 'react';
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
  BarChart3,
  Calendar,
  Clock,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Smartphone,
  LayoutGrid,
  FileCheck,
  Building2,
  Server
} from 'lucide-react';
import { PublicHeader } from './PublicHeader';
import { Footer } from './Footer';

import { CustomerReview, PricingPlan, TrialConfig } from '../types';
import { INITIAL_TESTIMONIALS, INITIAL_PRICING_PLANS, INITIAL_TRIAL_CONFIG } from '../services/mockData';

interface PublicLandingProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onNavigateToBlog?: () => void;
  onSelectTab?: (tab: string) => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  onOpenRegister,
  onOpenLogin,
  onNavigateToBlog,
  onSelectTab
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const [testimonials, setTestimonials] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('rg_testimonials');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TESTIMONIALS;
  });

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem('rg_pricing_plans');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_PRICING_PLANS;
  });

  const [trialConfig, setTrialConfig] = useState<TrialConfig>(() => {
    const saved = localStorage.getItem('rg_trial_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TRIAL_CONFIG;
  });

  useEffect(() => {
    const syncTestimonials = () => {
      const saved = localStorage.getItem('rg_testimonials');
      if (saved) {
        try { setTestimonials(JSON.parse(saved)); } catch (e) {}
      } else {
        setTestimonials(INITIAL_TESTIMONIALS);
      }
    };

    const syncPricing = () => {
      const savedPlans = localStorage.getItem('rg_pricing_plans');
      if (savedPlans) {
        try { setPricingPlans(JSON.parse(savedPlans)); } catch (e) {}
      } else {
        setPricingPlans(INITIAL_PRICING_PLANS);
      }
      const savedTrial = localStorage.getItem('rg_trial_config');
      if (savedTrial) {
        try { setTrialConfig(JSON.parse(savedTrial)); } catch (e) {}
      } else {
        setTrialConfig(INITIAL_TRIAL_CONFIG);
      }
    };

    window.addEventListener('storage', syncTestimonials);
    window.addEventListener('rg_testimonials_updated', syncTestimonials);
    window.addEventListener('storage', syncPricing);
    window.addEventListener('rg_pricing_updated', syncPricing);
    return () => {
      window.removeEventListener('storage', syncTestimonials);
      window.removeEventListener('rg_testimonials_updated', syncTestimonials);
      window.removeEventListener('storage', syncPricing);
      window.removeEventListener('rg_pricing_updated', syncPricing);
    };
  }, []);

  // Auto-scroll testimonials to the left every 4 seconds (pauses on hover)
  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isTestimonialHovered, testimonials.length]);

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
        
        {/* SECTION 1: HERO (kz-hero-1) */}
        <section className="bg-[#f7f8fa] border border-[#e9eaf0] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Left Text & Actions */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="inline-block text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
                Independent Creator Rights & Royalty Network
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
                Manage Rights Over Your <span className="text-[#0144e4]">Voice, Likeness</span> & Digital Media.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Authr brings all of your creator protection under one roof — biometric identity registration, C2PA cryptographic signatures, automated AI web scraping detection, and instant statutory licensing settlements.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenRegister}
                  className="px-8 py-4 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <UserCheck className="w-4.5 h-4.5" />
                  <span>Create Account</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>

                <button
                  onClick={onOpenLogin}
                  className="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-[#e9eaf0] transition-all text-center flex items-center justify-center space-x-2 shadow-xs group"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span className="group-hover:text-[#0144e4]">Sign in with Google</span>
                </button>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0144e4]" />
                  Government ID Verified
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0144e4]" />
                  Stripe Payout Gateway
                </span>
              </div>

            </div>

            {/* Hero Right Graphic Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-xl overflow-hidden border border-[#e9eaf0] shadow-xl bg-white p-6 space-y-5 text-left">
                
                {/* Header snippet */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0144e4] flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Likeness & Voice Registry</h4>
                      <p className="text-[11px] text-slate-400 font-mono">ID Verified</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono">
                    Active & Protected
                  </span>
                </div>

                {/* Stat Rows */}
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Fingerprint className="w-4 h-4 text-[#0144e4]" />
                      <span className="text-xs font-bold text-slate-700">Facial Geometry Vector</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-900">128 Nodes Hashed</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Radio className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-bold text-slate-700">Acoustic Voice Spectrum</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-900">44.1kHz FFT Matched</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-700">Royalties Cleared</span>
                    </div>
                    <span className="text-sm font-black font-display text-emerald-600">$1,248,500.00</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-slate-100">
                  <span>C2PA Manifest #AUTHR-8923</span>
                  <span className="text-[#0144e4] font-bold">Polygon Mainnet Active →</span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: LOGO SLIDER / COMPLIANCE STRIP (kz-logo-slider) */}
        <section className="bg-[#f7f8fa] border border-[#e9eaf0] rounded-xl py-6 px-4 overflow-hidden relative group">
          <div className="flex animate-marquee-left items-center opacity-85 group-hover:[animation-play-state:paused]">
            
            {/* Track 1 */}
            <div className="flex items-center gap-12 shrink-0 pr-12">
              {[
                { label: "C2PA PROVENANCE", desc: "Cryptographic Standard" },
                { label: "BIPA PRIVACY", desc: "100% Law Compliant" },
                { label: "17 U.S.C. § 512", desc: "DMCA Takedown Engine" },
                { label: "STRIPE CONNECT", desc: "Instant Direct Payouts" },
                { label: "POLYGON L2", desc: "On-Chain Ledger" },
                { label: "SENDGRID WEBHOOK", desc: "Court Notice Sync" }
              ].map((partner, index) => (
                <div key={index} className="flex flex-col items-start min-w-[200px] text-left space-y-0.5 font-sans shrink-0">
                  <span className="text-xs font-extrabold text-slate-800 font-display uppercase tracking-wider">{partner.label}</span>
                  <span className="text-[11px] text-slate-400 font-mono font-medium">{partner.desc}</span>
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate for seamless infinite left scroll loop) */}
            <div className="flex items-center gap-12 shrink-0 pr-12" aria-hidden="true">
              {[
                { label: "C2PA PROVENANCE", desc: "Cryptographic Standard" },
                { label: "BIPA PRIVACY", desc: "100% Law Compliant" },
                { label: "17 U.S.C. § 512", desc: "DMCA Takedown Engine" },
                { label: "STRIPE CONNECT", desc: "Instant Direct Payouts" },
                { label: "POLYGON L2", desc: "On-Chain Ledger" },
                { label: "SENDGRID WEBHOOK", desc: "Court Notice Sync" }
              ].map((partner, index) => (
                <div key={`dup-${index}`} className="flex flex-col items-start min-w-[200px] text-left space-y-0.5 font-sans shrink-0">
                  <span className="text-xs font-extrabold text-slate-800 font-display uppercase tracking-wider">{partner.label}</span>
                  <span className="text-[11px] text-slate-400 font-mono font-medium">{partner.desc}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 3: CENTERED HEADING SECTION (kz-basic) */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
            Our BeSpoke Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Sync Across All Devices &amp; AI Networks
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Everything you need to protect and monetize your intellectual property super fast!
          </p>
        </section>

        {/* SECTION 4: TWO-COLUMN CONTENT 1 (kz-two-column-content-1) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-2xl border border-[#e9eaf0] shadow-2xs">
          <div className="lg:col-span-6 text-left space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 pb-2 border-b border-slate-200">
                <span>BIOMETRIC IDENTITY VAULT</span>
                <span className="text-[#0144e4]">ACTIVE &amp; PROTECTED</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-600">
                <div className="flex justify-between">
                  <span>Face &amp; Likeness Protection:</span>
                  <span className="font-bold text-slate-900">Secured &amp; Fingerprinted</span>
                </div>
                <div className="flex justify-between">
                  <span>Voice &amp; Audio Protection:</span>
                  <span className="font-bold text-slate-900">Unique Voice Print Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Creator Identity Verification:</span>
                  <span className="font-bold text-emerald-600">Verified Creator Profile</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 space-y-5 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Your Face, Voice &amp; Identity — Fully Protected
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Secure your unique face, likeness, and voice print in your personal digital vault. Authr confirms your creator identity to protect you from unauthorized AI deepfakes, voice cloning, and content theft.
            </p>
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-bold text-xs transition-all shadow-sm"
            >
              Read more
            </button>
          </div>
        </section>

        {/* SECTION 5: TWO-COLUMN CONTENT 2 (kz-two-column-content-1) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-2xl border border-[#e9eaf0] shadow-2xs">
          <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Automated AI &amp; Web Scrape Radar
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Continuous 24/7 monitoring across YouTube, TikTok, Meta, and major web platforms for unauthorized voice clones, face swaps, or stolen media assets. Automatically flags violations and protects your rights.
            </p>
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-bold text-xs transition-all shadow-sm"
            >
              Read more
            </button>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3 text-left">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 pb-2 border-b border-slate-200">
                <span>AI &amp; SOCIAL MEDIA SCANNER</span>
                <span className="text-emerald-600">LIVE MONITORING</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-600">
                <div className="flex justify-between">
                  <span>YouTube &amp; Video Sites:</span>
                  <span className="font-bold text-slate-900">24/7 Automated Scanning</span>
                </div>
                <div className="flex justify-between">
                  <span>TikTok &amp; Reels Monitoring:</span>
                  <span className="font-bold text-slate-900">Active Radar Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Social Media &amp; Web Platforms:</span>
                  <span className="font-bold text-emerald-600">Real-Time Protection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CARD GRID (kz-card-2) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Dashboard",
              desc: "Real-time overview of active rights profiles, protected stems, web scrape matches, and instant payouts.",
              icon: LayoutGrid
            },
            {
              title: "Custom Rules",
              desc: "Toggle seamlessly between Strict Privacy (DMCA Takedowns) and Commercial Royalty Licensing.",
              icon: Sliders
            },
            {
              title: "Presets",
              desc: "Store 128-node facial landmark meshes and FFT spectral voice prints verified against government IDs.",
              icon: Cpu
            },
            {
              title: "Metrics",
              desc: "Automated settlement invoices, Stripe Connect billing portals, and Polygon L2 provenance tracking.",
              icon: BarChart3
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] text-left space-y-4 hover:border-[#0144e4] transition-all group"
              >
                <div className="w-10 h-10 text-[#0144e4] group-hover:scale-110 transition-transform">
                  <Icon className="w-10 h-10 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{card.desc}</p>
              </div>
            );
          })}
        </section>

        {/* SECTION 7: PRICING SECTION (kz-pricing-1) */}
        <section id="pricing" className="bg-[#f3f3f7] rounded-2xl p-8 sm:p-12 text-center space-y-10 border border-[#e9eaf0]">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2">
              <span>{trialConfig.topBadge || 'No credit card required'}</span>
              {!trialConfig.requireCreditCard && (
                <span className="px-2 py-0.5 rounded bg-blue-100 text-[#0144e4] text-[10px] font-extrabold">
                  {trialConfig.trialDurationDays}-Day Free Trial
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              {trialConfig.title}
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              {trialConfig.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white p-8 rounded-xl flex flex-col justify-between space-y-6 ${
                  plan.popular 
                    ? 'border-2 border-[#0144e4] shadow-md relative' 
                    : 'border border-[#e9eaf0] shadow-xs'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#0144e4] text-white font-extrabold text-[10px] uppercase tracking-widest rounded font-mono">
                    {plan.popularBadgeText || 'Most Popular'}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-bold text-[#0144e4]">$</span>
                    <span className="text-3xl font-black text-slate-900 font-display">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-mono">{plan.period || '/ month'}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">{plan.name}</h3>
                  <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                  
                  <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-[#0144e4] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={onOpenRegister}
                  className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all ${
                    plan.popular 
                      ? 'bg-[#0144e4] hover:bg-[#0035b5] text-white shadow-md shadow-blue-500/20' 
                      : 'bg-[#0144e4] hover:bg-[#0035b5] text-white shadow-sm'
                  }`}
                >
                  {plan.buttonText || 'Choose plan'}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl border border-[#e9eaf0] bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition-all"
            >
              {trialConfig.customPlanText || 'Need a Customized Plan? Please contact us.'}
            </button>
          </div>

        </section>

        {/* SECTION 8: TESTIMONIAL CAROUSEL (kz-testimonial continuous auto-scroll) */}
        <section className="bg-[#eeeeee] rounded-2xl py-10 px-4 sm:p-14 text-center space-y-8 overflow-hidden">
          <div className="space-y-2 max-w-2xl mx-auto px-4">
            <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
              Customer reviews
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              What People Say About Us
            </h2>
          </div>

          {/* Continuous Infinite Left Auto-Scrolling Ticker */}
          <div className="relative group overflow-hidden py-2">
            <div className="flex animate-marquee-slow items-center group-hover:[animation-play-state:paused]">
              
              {/* Track 1 */}
              <div className="flex items-center gap-6 shrink-0 pr-6">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="w-[300px] sm:w-[420px] shrink-0 text-left bg-white p-6 sm:p-8 rounded-xl border border-[#e9eaf0] shadow-sm space-y-4 flex flex-col justify-between min-h-[220px]">
                    <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed font-medium">
                      "{t.quote}"
                    </p>

                    <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                      <img 
                        src={t.avatar} 
                        alt={t.author} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#0144e4] shrink-0 shadow-xs"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 font-display">
                          {t.author}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono">
                          {t.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Track 2 (Duplicate set for 100% seamless infinite left scroll loop) */}
              <div className="flex items-center gap-6 shrink-0 pr-6" aria-hidden="true">
                {testimonials.map((t, idx) => (
                  <div key={`dup-${idx}`} className="w-[300px] sm:w-[420px] shrink-0 text-left bg-white p-6 sm:p-8 rounded-xl border border-[#e9eaf0] shadow-sm space-y-4 flex flex-col justify-between min-h-[220px]">
                    <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed font-medium">
                      "{t.quote}"
                    </p>

                    <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                      <img 
                        src={t.avatar} 
                        alt={t.author} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#0144e4] shrink-0 shadow-xs"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 font-display">
                          {t.author}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono">
                          {t.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 9: RECENT POSTS / RESOURCE CENTER (kz-recent-post) */}
        <section id="blog" className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
                Knowledge
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                Resource Center
              </h2>
            </div>
            <button 
              onClick={onNavigateToBlog || onOpenRegister}
              className="px-6 py-2.5 rounded-[6px] bg-[#0144e4] hover:bg-[#0038c7] text-white font-semibold text-xs transition-all shadow-2xs"
            >
              Browse Articles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Understanding BIPA & Statutory Likeness Protection under 17 U.S.C. § 512",
                date: "July 4, 2026",
                readMin: "3 min read time",
                author: "Authr Legal Team",
                category: "Legal",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
              },
              {
                title: "How C2PA Cryptographic Watermarking Prevents Unauthorized AI Model Training",
                date: "July 1, 2026",
                readMin: "2 min read time",
                author: "Tech Engineering",
                category: "C2PA",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
              },
              {
                title: "Monetizing Deepfake Influxes with Automated Stripe Settlement Gates",
                date: "June 30, 2026",
                readMin: "4 min read time",
                author: "Monetization Ops",
                category: "Royalties",
                image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80"
              }
            ].map((post, index) => (
              <article 
                key={index} 
                onClick={onNavigateToBlog || onOpenRegister}
                className="bg-white rounded-2xl border border-[#e9eaf0] shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between hover:border-[#0144e4] transition-all cursor-pointer group"
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover border-b border-[#e9eaf0]"
                />
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#0144e4]" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0144e4]" />{post.readMin}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-display leading-snug hover:text-[#0144e4] transition-colors cursor-pointer">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium line-clamp-2">
                      Comprehensive guide to automated intellectual property defense, biometric registration, and statutory royalty clearing.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-mono">
                    <span className="font-bold text-slate-700">{post.author}</span>
                    <span className="px-2.5 py-1 bg-blue-50 text-[#0144e4] font-bold rounded-lg border border-blue-100">
                      {post.category}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 10: CONTACT CTA BANNER (kz-cta-2) */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0144e4] to-indigo-700 text-white p-8 sm:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 text-left space-y-3">
              <div className="text-blue-200 font-bold text-xs uppercase tracking-widest font-mono">
                Have a legal or licensing question?
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
                Contact Rights Counsel
              </h2>
              <p className="text-sm text-blue-100 font-medium leading-relaxed">
                Our copyright specialists and technical engineering team are available 24/7 to assist with statutory infringement claims, C2PA integrations, or custom enterprise API setups.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-start lg:justify-end">
              <button
                onClick={onOpenRegister}
                className="px-8 py-4 rounded-xl bg-white text-[#0144e4] hover:bg-blue-50 font-extrabold text-sm shadow-lg transition-all"
              >
                Drop a query
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* KRAZY FOOTER */}
      <Footer onSelectTab={onSelectTab || (() => {})} onOpenRegister={onOpenRegister} />

    </div>
  );
};
