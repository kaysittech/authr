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

interface PublicLandingProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onNavigateToBlog?: () => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  onOpenRegister,
  onOpenLogin,
  onNavigateToBlog
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const testimonials = [
    {
      quote: "Authr revolutionized how we manage creator licensing and biometric identity protection. The automated legal notices and instant settlement checkout gates work flawlessly.",
      author: "Alex Rivera",
      title: "Independent Recording Artist & Producer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The C2PA cryptographic watermarking and web scrape radar saved our studio over $140,000 in stolen voice actor and artwork royalties within the first 60 days.",
      author: "Sarah Conner",
      title: "Voice Actor & Podcast Host",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Integrating BIPA biometric verification and Stripe Connect payouts gave our commercial brand agency complete legal standing across 54 global markets.",
      author: "Marcus Vance",
      title: "Creative Brand & IP Director",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Authr's Web Scrape Radar detected 12 unauthorized AI training sets using my portfolio within hours. The automated DMCA notices pulled them down immediately.",
      author: "Elena Rostova",
      title: "Digital Illustrator & Concept Artist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The C2PA cryptographic provenance standard integrated into Authr gives our enterprise model training data full legal verification and automated royalty routing.",
      author: "David Chen",
      title: "Software Architect & AI Researcher",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    }
  ];

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
                Claim Sovereign Rights Over Your <span className="text-[#0144e4]">Voice, Likeness</span> & Digital Media.
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
                  <span>Create Account (Government ID)</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>

                <button
                  onClick={onOpenLogin}
                  className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-[#e9eaf0] transition-all text-center flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4.5 h-4.5 text-[#0144e4]" />
                  <span>Sign In to Vault</span>
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
                  BIPA Compliant
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
                      <p className="text-[11px] text-slate-400 font-mono">ID Verified • BIPA Compliant</p>
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
                <span className="text-[#0144e4]">BIPA VERIFIED</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-600">
                <div className="flex justify-between">
                  <span>Facial Mesh Hashing:</span>
                  <span className="font-bold text-slate-900">SHA-256 128-Node Vector</span>
                </div>
                <div className="flex justify-between">
                  <span>Voice Spectral FFT:</span>
                  <span className="font-bold text-slate-900">44.1kHz Multi-Band Spectrum</span>
                </div>
                <div className="flex justify-between">
                  <span>Government ID Match:</span>
                  <span className="font-bold text-emerald-600">Driver's License / Passport OK</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 space-y-5 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Biometric &amp; Government ID Protection
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Register your facial geometry vector mesh and acoustic spectral voice vector. All biometric fingerprints are linked to official driver’s license or passport credentials, providing 100% legal standing under statutory copyright litigation.
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
              Automated Web Scrape &amp; AI Radar
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Continuous monitoring across YouTube Data API v3, TikTok Research API, and Meta Graph API for unauthorized voice cloning, face swaps, or stolen media assets. Automatically issues 17 U.S.C. § 512(c) statutory notices.
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
                <span>ENTERPRISE SCRAPE TELEMETRY</span>
                <span className="text-emerald-600">LIVE SCAN ACTIVE</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-600">
                <div className="flex justify-between">
                  <span>YouTube Data API v3:</span>
                  <span className="font-bold text-slate-900">10,000 Units / Day Scan</span>
                </div>
                <div className="flex justify-between">
                  <span>TikTok Research API:</span>
                  <span className="font-bold text-slate-900">Jitter Backoff Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Meta Graph API v18.0:</span>
                  <span className="font-bold text-emerald-600">Real-Time Hash Match</span>
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
            <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
              No credit card required
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Plans &amp; Pricing
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              No risk, 30-day money back guarantee!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-[#0144e4]">$</span>
                  <span className="text-3xl font-black text-slate-900 font-display">15</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Basic</h3>
                <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                
                <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>1 Biometric Voice &amp; Likeness Profile</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Web Scrape Detection (YouTube/TikTok)</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>C2PA Watermark Signing</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Email Support</span></li>
                </ul>
              </div>

              <button 
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-sm"
              >
                Choose plan
              </button>
            </div>

            {/* Startup Plan */}
            <div className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-[#0144e4]">$</span>
                  <span className="text-3xl font-black text-slate-900 font-display">30</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Startup</h3>
                <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                
                <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>3 Active Discipline Profiles</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Automated DMCA Legal Notice Studio</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Stripe Commercial Licensing Gate</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Custom Policy Toggles</span></li>
                </ul>
              </div>

              <button 
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-sm"
              >
                Choose plan
              </button>
            </div>

            {/* Professional Plan (Most Popular) */}
            <div className="bg-white p-8 rounded-xl border-2 border-[#0144e4] shadow-md relative flex flex-col justify-between space-y-6">
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#0144e4] text-white font-extrabold text-[10px] uppercase tracking-widest rounded font-mono">
                Most Popular
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-[#0144e4]">$</span>
                  <span className="text-3xl font-black text-slate-900 font-display">75</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Professional</h3>
                <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                
                <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>All 6 Creative Discipline Modules</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Polygon L2 On-Chain Provenance</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Enterprise Social API Keys</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>24/7 Priority Support</span></li>
                </ul>
              </div>

              <button 
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/20"
              >
                Choose plan
              </button>
            </div>

            {/* Business / Enterprise Plan */}
            <div className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-[#0144e4]">$</span>
                  <span className="text-3xl font-black text-slate-900 font-display">100</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Business</h3>
                <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                
                <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Unlimited Brand IP Vaults</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Custom API Webhooks</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Dedicated Legal Counsel Sync</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Bulk DMCA Court Filings</span></li>
                </ul>
              </div>

              <button 
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-sm"
              >
                Choose plan
              </button>
            </div>

          </div>

          <div className="pt-4">
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl border border-[#e9eaf0] bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition-all"
            >
              Need a Customized Plan? Please contact us.
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
      <Footer />

    </div>
  );
};
