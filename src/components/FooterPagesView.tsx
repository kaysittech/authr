import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  FileText, 
  Scale, 
  DollarSign, 
  Briefcase, 
  Building2, 
  Mail, 
  Search, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowLeft,
  Bell,
  Sliders,
  Check
} from 'lucide-react';

interface FooterPagesViewProps {
  pageId: string; // 'careers' | 'about' | 'privacy' | 'terms' | 'email_preferences' | 'unsubscribe' | 'security' | 'search';
  onNavigateHome: () => void;
  onOpenRegister: () => void;
}

export const FooterPagesView: React.FC<FooterPagesViewProps> = ({
  pageId,
  onNavigateHome,
  onOpenRegister
}) => {
  // Local states for forms
  const [emailNotifs, setEmailNotifs] = useState({
    scrapeAlerts: true,
    dmcaReceipts: true,
    royaltyPayouts: true,
    weeklyLegalDigest: false
  });
  const [prefSaved, setPrefSaved] = useState(false);
  const [unsubscribeReason, setUnsubscribeReason] = useState('');
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' });
  const [passUpdated, setPassUpdated] = useState(false);

  // Application Modal state for Careers
  const [applyingJob, setApplyingJob] = useState<string | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleSaveEmailNotifs = (e: React.FormEvent) => {
    e.preventDefault();
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 4000);
  };

  const handleUnsubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setUnsubscribed(true);
  };

  const handlePassUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.newPass && passForm.newPass === passForm.confirm) {
      setPassUpdated(true);
      setPassForm({ current: '', newPass: '', confirm: '' });
      setTimeout(() => setPassUpdated(false), 4000);
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen pb-20 text-left">
      
      {/* Top Breadcrumb Navigation */}
      <div className="bg-[#f7f8fa] border-b border-[#e9eaf0] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onNavigateHome}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#0144e4] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
            Authr System &amp; Legal Center
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* 1. CAREERS PAGE */}
        {pageId === 'careers' && (
          <div className="space-y-12">
            <div className="bg-[#0144e4] text-white rounded-2xl p-8 sm:p-14 text-center space-y-4 shadow-xl">
              <div className="inline-flex items-center space-x-2 bg-blue-600/50 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-blue-100 border border-blue-400/30">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Join Our Engineering &amp; Legal Team</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
                Architect the Infrastructure for Sovereign Creator Rights
              </h1>
              <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto font-medium">
                We are building the world's first biometric likeness registry, C2PA cryptographic watermarking engine, and automated statutory settlement gates.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">Open Roles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Senior Cryptography Engineer (C2PA & Rust)",
                    dept: "Security & Core Infrastructure",
                    location: "Remote (US / EU)",
                    type: "Full-Time",
                    desc: "Lead the development of our high-performance C2PA manifest embed engine and zero-knowledge timestamp proofs on Polygon L2."
                  },
                  {
                    title: "Biometric & IP Litigation Counsel",
                    dept: "Legal & Regulatory Compliance",
                    location: "Chicago / Remote",
                    type: "Full-Time",
                    desc: "Oversee statutory filings under Illinois BIPA (740 ILCS 14/) and federal 17 U.S.C. § 512 notice-and-takedown court proceedings."
                  },
                  {
                    title: "Computer Vision Lead (Web Scrape Radar)",
                    dept: "Machine Learning & Perception",
                    location: "Remote",
                    type: "Full-Time",
                    desc: "Train sub-second perceptual hashing networks and distributed honeypot crawlers across YouTube, TikTok, and Meta feeds."
                  },
                  {
                    title: "Full-Stack SDK Architect (TypeScript & Python)",
                    dept: "Developer Experience",
                    location: "Remote",
                    type: "Full-Time",
                    desc: "Design zero-dependency client SDKs for voice actors, visual artists, and enterprise AI model training platforms."
                  }
                ].map((job, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-[#e9eaf0] shadow-2xs space-y-4 hover:border-[#0144e4] transition-all flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                        <span className="text-[#0144e4] font-bold">{job.dept}</span>
                        <span>{job.location} • {job.type}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 font-display">{job.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{job.desc}</p>
                    </div>
                    <button
                      onClick={() => { setApplyingJob(job.title); setAppliedSuccess(false); }}
                      className="w-full py-2.5 rounded-[6px] bg-[#0144e4] hover:bg-[#0038c7] text-white text-xs font-bold transition-all text-center"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. ABOUT PAGE */}
        {pageId === 'about' && (
          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center space-x-2 text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Building2 className="w-3.5 h-3.5" />
                <span>About Authr</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 font-display">
                Protecting &amp; Monetizing Independent Creator Identity
              </h1>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                Authr was founded to bridge the critical gap between rapid generative AI advancements and creator intellectual property enforcement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#f7f8fa] rounded-xl border border-[#e9eaf0] space-y-3">
                <ShieldCheck className="w-8 h-8 text-[#0144e4]" />
                <h3 className="text-base font-bold text-slate-900 font-display">Statutory Defense</h3>
                <p className="text-xs text-slate-600 font-medium">Anchored in Illinois BIPA biometrics law and 17 U.S.C. § 512 statutory takedown mandates.</p>
              </div>
              <div className="p-6 bg-[#f7f8fa] rounded-xl border border-[#e9eaf0] space-y-3">
                <Lock className="w-8 h-8 text-[#0144e4]" />
                <h3 className="text-base font-bold text-slate-900 font-display">C2PA Standard</h3>
                <p className="text-xs text-slate-600 font-medium">SHA-256 cryptographic provenance certificates signed by sovereign private keys.</p>
              </div>
              <div className="p-6 bg-[#f7f8fa] rounded-xl border border-[#e9eaf0] space-y-3">
                <DollarSign className="w-8 h-8 text-[#0144e4]" />
                <h3 className="text-base font-bold text-slate-900 font-display">Automated Payouts</h3>
                <p className="text-xs text-slate-600 font-medium">Direct Stripe Connect settlement gates that convert web scrape hits into instant royalties.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-display">Our Mission Statement</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Every independent artist, musician, voice actor, writer, and brand deserves total sovereignty over their biometric identity and creative outputs. Authr equips creators with institutional-grade detection, legal filing automation, and direct monetization tools.
              </p>
              <div className="pt-2">
                <button 
                  onClick={onOpenRegister}
                  className="px-6 py-2.5 rounded-[6px] bg-[#0144e4] text-white text-xs font-bold hover:bg-[#0038c7] transition-all"
                >
                  Create Your Free Sovereign Vault
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRIVACY POLICY */}
        {pageId === 'privacy' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2 border-b border-[#e9eaf0] pb-6">
              <div className="text-[#0144e4] font-bold text-xs font-mono uppercase tracking-widest">
                Legal &amp; Compliance Document
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Privacy Policy &amp; BIPA Biometric Disclosure
              </h1>
              <p className="text-xs text-slate-500 font-mono">Effective Date: July 1, 2026 • Version 3.4</p>
            </div>

            <div className="space-y-6 text-sm text-slate-700 font-medium leading-relaxed">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <h4 className="font-bold text-[#0144e4] text-xs font-mono uppercase">Illinois BIPA Section 15 Compliance Notice</h4>
                <p className="text-xs text-slate-700">
                  Authr converts facial landmarks into 128-node non-reversible mathematical vector hashes (`fvec_...`). Authr NEVER stores raw unhashed facial scans or unencrypted voice recordings. Vector hashes are used strictly for matching against unauthorized commercial AI scrape streams.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-display">1. Information We Collect</h3>
                <p>We collect identity verification data provided directly by you during Government ID onboarding, including name, email address, biometric hash vectors, and registered media asset signatures.</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-display">2. Use of Biometric Data</h3>
                <p>Biometric vector fingerprints are maintained solely for matching unauthorized deepfake impersonations and dispatches of 17 U.S.C. § 512 legal takedown notices. Authr will never sell, lease, or trade biometric data under any circumstances.</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-display">3. Right to Erasure &amp; Hash Revocation</h3>
                <p>Under GDPR Article 17 and CCPA, creators may permanently delete their biometric vector records and registered asset signatures at any time directly through the Vault Settings menu.</p>
              </section>
            </div>
          </div>
        )}

        {/* 4. TERMS OF SERVICE */}
        {pageId === 'terms' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2 border-b border-[#e9eaf0] pb-6">
              <div className="text-[#0144e4] font-bold text-xs font-mono uppercase tracking-widest">
                Legal Contract
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Terms of Service &amp; Statutory Authorization
              </h1>
              <p className="text-xs text-slate-500 font-mono">Last Updated: June 2026</p>
            </div>

            <div className="space-y-6 text-sm text-slate-700 font-medium leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-display">1. Designated Agent Authorization</h3>
                <p>By registering assets or biometric vectors on Authr, you appoint Authr as your authorized designated agent under 17 U.S.C. § 512(c)(2) to issue electronic DMCA statutory takedown notices and settlement demand invoices to infringing platforms.</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-display">2. Royalty Settlement &amp; Stripe Payouts</h3>
                <p>Settlement fees collected from unauthorized scrapers are processed via Stripe Connect. Authr routes 92% of statutory micro-licensing revenues directly to creator linked accounts, retaining an 8% network telemetry fee.</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-display">3. Polygon L2 Ledger Verification</h3>
                <p>All registered asset manifests generate zero-knowledge cryptographic hashes committed to Polygon L2 mainnet, establishing self-authenticating evidentiary priority for federal court proceedings.</p>
              </section>
            </div>
          </div>
        )}

        {/* 5. EMAIL SUBSCRIPTION PREFERENCES */}
        {pageId === 'email_preferences' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2 border-b border-[#e9eaf0] pb-6 text-center">
              <div className="inline-flex items-center space-x-2 text-[#0144e4] font-bold text-xs font-mono uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Mail className="w-3.5 h-3.5" />
                <span>Notification Control</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Email Subscription Preferences
              </h1>
              <p className="text-xs text-slate-500 font-medium">Manage court alerts, scrape detection push notices, and royalty payout receipts.</p>
            </div>

            {prefSaved && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your notification preferences have been successfully updated!</span>
              </div>
            )}

            <form onSubmit={handleSaveEmailNotifs} className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-2xs space-y-6">
              <div className="space-y-4">
                {[
                  { id: 'scrapeAlerts', label: 'Web Scrape Radar Alerts', desc: 'Instant email when AI scrapers harvest your registered voice or likeness.' },
                  { id: 'dmcaReceipts', label: 'DMCA Takedown Filings', desc: 'Confirmation receipts when statutory 17 U.S.C. § 512 notices are dispatched.' },
                  { id: 'royaltyPayouts', label: 'Stripe Settlement Receipts', desc: 'Payout confirmations when royalty licensing fees clear.' },
                  { id: 'weeklyLegalDigest', label: 'Weekly Creator Rights Digest', desc: 'Legal updates on emerging BIPA and AI copyright precedents.' }
                ].map(item => (
                  <div key={item.id} className="flex items-start justify-between p-4 bg-[#f7f8fa] rounded-xl border border-[#e9eaf0]">
                    <div className="space-y-1 pr-4">
                      <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                      <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                    </div>
                    <input 
                      type="checkbox"
                      checked={(emailNotifs as any)[item.id]}
                      onChange={(e) => setEmailNotifs({ ...emailNotifs, [item.id]: e.target.checked })}
                      className="w-5 h-5 rounded text-[#0144e4] focus:ring-[#0144e4] cursor-pointer mt-1"
                    />
                  </div>
                ))}
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-[6px] bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs transition-all shadow-2xs"
              >
                Save Preferences
              </button>
            </form>
          </div>
        )}

        {/* 6. UNSUBSCRIBE PAGE */}
        {pageId === 'unsubscribe' && (
          <div className="max-w-xl mx-auto space-y-8 text-center">
            <div className="space-y-2 border-b border-[#e9eaf0] pb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Unsubscribe Preferences
              </h1>
              <p className="text-xs text-slate-500 font-medium">Modify or opt out of Authr non-critical email communications.</p>
            </div>

            {unsubscribed ? (
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#0144e4] mx-auto" />
                <h3 className="text-base font-bold text-slate-900 font-display">You Have Been Unsubscribed</h3>
                <p className="text-xs text-slate-600 font-medium">You will no longer receive non-critical marketing emails. Emergency DMCA court filings and security notices will remain active for your account safety.</p>
              </div>
            ) : (
              <form onSubmit={handleUnsubscribe} className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-2xs space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Reason for unsubscribing (optional):</label>
                  <select 
                    value={unsubscribeReason}
                    onChange={(e) => setUnsubscribeReason(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4]"
                  >
                    <option value="">Select a reason...</option>
                    <option value="too_many">Too many emails</option>
                    <option value="not_relevant">Content no longer relevant</option>
                    <option value="temporary">Temporary break</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all"
                >
                  Confirm Unsubscribe
                </button>
              </form>
            )}
          </div>
        )}

        {/* 7. PASSWORD & SECURITY */}
        {pageId === 'security' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2 border-b border-[#e9eaf0] pb-6 text-center">
              <div className="inline-flex items-center space-x-2 text-[#0144e4] font-bold text-xs font-mono uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Key className="w-3.5 h-3.5" />
                <span>Account Security</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Password &amp; Vault Security
              </h1>
              <p className="text-xs text-slate-500 font-medium">Manage master password, WebAuthn biometrics, and active Polygon session keys.</p>
            </div>

            {passUpdated && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password updated successfully! All active sessions re-authenticated.</span>
              </div>
            )}

            <form onSubmit={handlePassUpdate} className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-2xs space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Current Password</label>
                <input 
                  type="password"
                  required
                  value={passForm.current}
                  onChange={(e) => setPassForm({ ...passForm, current: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">New Password</label>
                <input 
                  type="password"
                  required
                  value={passForm.newPass}
                  onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
                <input 
                  type="password"
                  required
                  value={passForm.confirm}
                  onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4]"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-[6px] bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs transition-all"
              >
                Update Password
              </button>
            </form>
          </div>
        )}

        {/* 8. SEARCH RESULTS PAGE */}
        {pageId === 'search' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4 text-center border-b border-[#e9eaf0] pb-8">
              <div className="inline-flex items-center space-x-2 text-[#0144e4] font-bold text-xs font-mono uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Search className="w-3.5 h-3.5" />
                <span>Global Authr Vault Search</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Search Intellectual Property &amp; Legal Records
              </h1>
              
              <div className="max-w-xl mx-auto relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type search terms e.g. BIPA, C2PA, Voice Vector, Stripe..."
                  className="w-full pl-12 pr-4 py-3 text-sm border border-[#e9eaf0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0144e4] shadow-2xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">Quick Results</h3>
              <div className="space-y-3">
                {[
                  { title: "BIPA Biometric Vector Fingerprinting (740 ILCS 14/)", cat: "Legal", desc: "128-landmark facial geometry hashes and acoustic voice vectors." },
                  { title: "C2PA Cryptographic Watermarking Engine", cat: "Features", desc: "SHA-256 tamper-evident metadata manifest signatures." },
                  { title: "Stripe Connect Settlement Checkout Gate", cat: "Royalties", desc: "Automated micro-licensing invoicing for scraped creator assets." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border border-[#e9eaf0] shadow-2xs space-y-1 hover:border-[#0144e4] transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <span className="text-[10px] font-mono font-bold text-[#0144e4] bg-blue-50 px-2 py-0.5 rounded">{item.cat}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Careers Job Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e9eaf0] shadow-2xl p-6 sm:p-8 space-y-5 text-left relative">
            <button 
              onClick={() => setApplyingJob(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#0144e4] uppercase tracking-widest">Apply for Position</span>
              <h3 className="text-xl font-extrabold text-slate-900 font-display">{applyingJob}</h3>
            </div>

            {appliedSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl space-y-2 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">Application Submitted!</h4>
                <p className="text-xs">Our legal &amp; engineering recruiting team will review your application within 48 hours.</p>
                <button 
                  onClick={() => setApplyingJob(null)}
                  className="mt-2 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-md"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setAppliedSuccess(true); }} className="space-y-4 text-xs font-medium">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Full Name</label>
                  <input type="text" required placeholder="Alex Rivera" className="w-full px-3 py-2 border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4]" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email Address</label>
                  <input type="email" required placeholder="alex@domain.com" className="w-full px-3 py-2 border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4]" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">GitHub / Portfolio URL</label>
                  <input type="url" placeholder="https://github.com/username" className="w-full px-3 py-2 border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4]" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Cover Note</label>
                  <textarea rows={3} placeholder="Briefly describe your experience with C2PA, Rust, Python or BIPA law..." className="w-full px-3 py-2 border border-[#e9eaf0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0144e4]" />
                </div>
                <button type="submit" className="w-full py-3 rounded-[6px] bg-[#0144e4] text-white font-bold text-xs hover:bg-[#0038c7]">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
