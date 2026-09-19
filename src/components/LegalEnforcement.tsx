import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  ShieldCheck, 
  Clock, 
  Send,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Printer,
  Shield,
  FileCheck2,
  Lock,
  Zap,
  Globe,
  Check
} from 'lucide-react';
import { DigitalTwin, DetectionMatch } from '../types';

interface LegalEnforcementProps {
  digitalTwin: DigitalTwin;
  matches: DetectionMatch[];
}

export const LegalEnforcement: React.FC<LegalEnforcementProps> = ({
  digitalTwin,
  matches
}) => {
  const [selectedNoticeType, setSelectedNoticeType] = useState<'dmca' | 'bipa' | 'cease_and_desist' | 'c2pa'>('dmca');
  const [selectedMatchId, setSelectedMatchId] = useState<string>(matches[0]?.id || 'custom');
  const [targetUrl, setTargetUrl] = useState(matches[0]?.infringingUrl || 'https://instagram.com/reels/C89x0192A');
  const [infringerName, setInfringerName] = useState(matches[0]?.uploaderName || '@tech_dropship_daily');
  const [statutoryAmount, setStatutoryAmount] = useState('5000');
  const [copied, setCopied] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  // Update target fields when user selects a match from dropdown
  const handleSelectMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    if (matchId === 'custom') return;
    const match = matches.find(m => m.id === matchId);
    if (match) {
      setTargetUrl(match.infringingUrl);
      setInfringerName(match.uploaderName);
    }
  };

  const kycToken = digitalTwin.faceVector?.id 
    ? `KYC_TOK_${digitalTwin.faceVector.id.toUpperCase()}_BIPA` 
    : `KYC_TOK_${digitalTwin.userId.toUpperCase()}_BIPA`;

  const generateDmcaNotice = () => {
    return `================================================================================
AUTHR LEGAL COMPLIANCE NETWORK — OFFICIAL STATUTORY TAKEDOWN NOTICE
================================================================================
DOCUMENT REFERENCE : DMCA-NOTICE-17USC512-${Date.now().toString().slice(-8)}
DATE OF FILING     : ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
DESIGNATED AGENT   : Authr Legal Compliance Team (compliance@authr.id)

TO: DESIGNATED COPYRIGHT AGENT & LEGAL COMPLIANCE TEAM
TARGET PLATFORM    : ${targetUrl.split('/')[2] || 'Hosting Platform'}
INFRINGING URL     : ${targetUrl}
INFRINGING ACCOUNT : ${infringerName}

RIGHTSHOLDER IDENTIFICATION:
- Full Legal Name  : ${digitalTwin.userName}
- Authr Sovereign Handle : ${digitalTwin.handle}
- Node ID Hash     : authr_node_${digitalTwin.userId}
- Cryptographic Token: ${kycToken}
- C2PA Signature   : sha256_c2pa_manifest_verified_99.8

STATEMENT OF CLAIM & DEMAND FOR EXPEDITIOUS REMOVAL:
I, ${digitalTwin.userName} (${digitalTwin.handle}), am the verified copyright holder and rightsholder of the original digital media asset/stem. 

The material located at the URL listed above reproduces, distributes, or commercializes my protected creative work without authorization, license, or statutory consent.

Under 17 U.S.C. § 512(c)(3)(A), this document serves as formal written notification demanding the immediate, expeditious removal or disabling of access to the infringing material.

PENALTY OF PERJURY & GOOD FAITH STATEMENT:
1. I have a good faith belief that use of the copyrighted materials described above is not authorized by the copyright owner, its agent, or the law.
2. I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.

DIGITALLY SIGNED & SEALED:
${digitalTwin.userName}
Authr Independent Creator Rights Network Node #${digitalTwin.userId}
Timestamp: ${new Date().toISOString()}`;
  };

  const generateBipaNotice = () => {
    return `================================================================================
AUTHR BIOMETRIC PRIVACY & RIGHT OF PUBLICITY LEGAL DEMAND
================================================================================
DOCUMENT REFERENCE : BIPA-NOTICE-STATUTORY-${Date.now().toString().slice(-8)}
DATE OF FILING     : ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
STATUTORY JURISDICTION: 740 ILCS 14/ (BIPA) & Common Law Right of Publicity

TO TARGET PARTY    : ${infringerName}
PLATFORM LOCATION  : ${targetUrl}

FORMAL DEMAND FOR IMMEDIATE CEASE & DESIST AND LIQUIDATED STATUTORY DAMAGES:

NOTICE IS HEREBY GIVEN that the unauthorized scraping, extraction, ingestion, synthesis, or commercial deployment of ${digitalTwin.userName}'s facial geometry vectors, spectral voice prints, or digital likeness constitutes a direct, willful violation of state Biometric Information Privacy Acts (BIPA) and statutory Rights of Publicity.

BIOMETRIC VERIFICATION CREDENTIALS:
- Identity Owner   : ${digitalTwin.userName} (${digitalTwin.handle})
- Authr Verification Token: ${kycToken}
- Facial Vector Hash : ${digitalTwin.faceVector?.hashVector || 'vtr_128dim_bipa_sealed'}
- Voice Signature    : ${digitalTwin.voicePrint?.spectralSignature || 'spec_voice_print_85hz_3.4khz'}

STATUTORY PENALTIES & DEMANDS:
1. Liquidated Statutory Damages: BIPA provides for statutory damages of $1,000 per negligent violation and $5,000 per intentional or reckless violation under 740 ILCS 14/20(1)-(2).
2. Demand for Immediate Purge: Cease and desist all AI model training, dataset inclusion, and commercial exploitation. Destroy all harvested biometric vectors within 48 hours.
3. Statutory Demand Invoice Amount: $${statutoryAmount}.00 USD.

SIGNED UNDER AUTHORIZED COMPLIANCE PROTOCOL:
Independent Biometric Compliance Team for ${digitalTwin.userName}
Authr Rights Node #${digitalTwin.userId}`;
  };

  const generateCeaseAndDesist = () => {
    return `================================================================================
LEGAL CEASE & DESIST DEMAND LETTER — AI CLONE & VOICE REPRODUCTION LOCK
================================================================================
DOCUMENT REFERENCE : CD-DEMAND-${Date.now().toString().slice(-8)}
DATE               : ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

TO: ${infringerName}
LOCATION: ${targetUrl}

RE: UNAUTHORIZED COMMERCIAL DEPLOYMENT OF CREATIVE ASSETS & BIOMETRICS

Dear ${infringerName},

This letter constitutes a formal demand that you immediately CEASE AND DESIST all unauthorized reproduction, cloning, distribution, or commercial exploitation of media belonging to ${digitalTwin.userName} (${digitalTwin.handle}).

Our network's automated C2PA watermark detection engines have conclusively matched your published content at ${targetUrl} with our client's registered master assets.

REQUIRED IMMEDIATE ACTIONS WITHIN 48 HOURS:
1. Immediately remove and permanently delete all infringing files from your servers and accounts.
2. Cease the distribution or licensing of synthetic AI voice/face clones derived from ${digitalTwin.userName}.
3. Provide written confirmation of compliance to compliance@authr.id.

Failure to comply will result in immediate escalation to formal court proceedings, injunctive relief, and statutory damages under applicable copyright and right of publicity laws.

Sincerely,
Authr Rights Protection Network
On behalf of ${digitalTwin.userName} (${digitalTwin.handle})`;
  };

  const generateC2paNotice = () => {
    return `================================================================================
C2PA CRYPTOGRAPHIC WATERMARK PROVENANCE VIOLATION NOTICE
================================================================================
DOCUMENT REFERENCE : C2PA-VIOLATION-${Date.now().toString().slice(-8)}
DATE               : ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

TARGET INFRINGER   : ${infringerName}
TARGET ASSET URL   : ${targetUrl}

CRYPTOGRAPHIC PROVENANCE EVIDENCE:
- Asset Owner      : ${digitalTwin.userName} (${digitalTwin.handle})
- C2PA Manifest SHA: sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
- Perceptual Hash  : pHash_8x8_dct_9f81a2c3d4e5f607
- Watermark Status : INTENTIONAL STRIPPING / COMPRESSION DETECTED (17 U.S.C. § 1202)

LEGAL NOTICE UNDER 17 U.S.C. § 1202 (DIGITAL MILLENNIUM COPYRIGHT ACT):
It is illegal to knowingly remove or alter Copyright Management Information (CMI) with the intent to induce, enable, facilitate, or conceal copyright infringement. 

Section 1202(e) provides statutory damages ranging from $2,500 to $25,000 PER VIOLATION for stripping C2PA metadata and digital signatures.

DEMAND: Discontinue unauthorized usage and restore full cryptographic CMI metadata immediately.

ISSUED BY:
Authr Provenance Audit Protocol #${digitalTwin.userId}`;
  };

  const getNoticeText = () => {
    switch (selectedNoticeType) {
      case 'bipa':
        return generateBipaNotice();
      case 'cease_and_desist':
        return generateCeaseAndDesist();
      case 'c2pa':
        return generateC2paNotice();
      default:
        return generateDmcaNotice();
    }
  };

  const currentNoticeText = getNoticeText();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentNoticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([currentNoticeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `authr_${selectedNoticeType}_notice_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Authr Legal Notice - ${selectedNoticeType.toUpperCase()}</title>
            <style>
              body { font-family: monospace; padding: 40px; background: #fff; color: #111; font-size: 12px; line-height: 1.6; }
              pre { white-space: pre-wrap; word-break: break-all; }
            </style>
          </head>
          <body>
            <pre>${currentNoticeText}</pre>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleDispatchNotice = () => {
    setIsDispatching(true);
    setDispatchSuccess(null);
    setTimeout(() => {
      setIsDispatching(false);
      const receiptId = `DISPATCH_${Math.floor(100000 + Math.random() * 900000)}`;
      setDispatchSuccess(receiptId);
    }, 1500);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Krazy Theme Hero Header Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e9eaf0] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0144e4]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            {/* Krazy Theme Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#0144e4]/20 text-[#0144e4] text-[11px] font-extrabold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0144e4]" />
              <span>Legal Compliance & Statutory Enforcement</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14192b] tracking-tight">
              DMCA & BIPA Notice <span className="text-[#0144e4]">Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Generate legally binding statutory takedown demands under <strong className="text-slate-900">17 U.S.C. § 512</strong>, 
              Biometric Information Privacy Act (<strong className="text-slate-900">BIPA</strong>) compliance letters, 
              and C2PA watermark evidence notices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-lg bg-[#f7f8fa] hover:bg-slate-100 text-[#14192b] border border-[#e9eaf0] font-bold text-xs transition-all flex items-center space-x-2 shadow-xs"
            >
              <Printer className="w-4 h-4 text-[#0144e4]" />
              <span>Print Official Seal</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-lg bg-[#0144e4] hover:bg-[#0036b8] text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main krazy Theme Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Notice Configurator & Editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white p-6 rounded-xl border border-[#e9eaf0] shadow-sm space-y-5">
            
            {/* Tagline Indicator */}
            <div className="flex items-center justify-between border-b border-[#e9eaf0] pb-4">
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-5 h-5 text-[#0144e4]" />
                <h2 className="text-base font-extrabold text-[#14192b]">Statutory Notice Parameters</h2>
              </div>
              <span className="text-[11px] font-mono text-[#0144e4] bg-[#eff4ff] px-2.5 py-1 rounded-md font-bold">
                Authr Node #{digitalTwin.userId}
              </span>
            </div>

            {/* Quick Match Selection Dropdown */}
            {matches.length > 0 && (
              <div>
                <label className="text-xs font-extrabold text-[#14192b] block mb-1.5">
                  Autofill from Flagged Scrape Detection
                </label>
                <select
                  value={selectedMatchId}
                  onChange={(e) => handleSelectMatch(e.target.value)}
                  className="w-full bg-[#f7f8fa] border border-[#e9eaf0] rounded-lg px-3.5 py-2.5 text-xs text-[#14192b] font-bold focus:border-[#0144e4] focus:outline-none transition-all"
                >
                  <option value="custom">-- Custom Infringement Entry --</option>
                  {matches.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.targetPlatform}: {m.assetTitle} ({m.uploaderName}) - {m.visualSimilarity || m.audioSimilarity}% Match
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Notice Type & Target Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-extrabold text-[#14192b] block mb-1.5">Statutory Notice Type</label>
                <select
                  value={selectedNoticeType}
                  onChange={(e) => setSelectedNoticeType(e.target.value as any)}
                  className="w-full bg-[#f7f8fa] border border-[#e9eaf0] rounded-lg px-3 py-2.5 text-xs text-[#14192b] font-extrabold focus:border-[#0144e4] focus:outline-none"
                >
                  <option value="dmca">17 U.S.C. § 512(c) Statutory DMCA Takedown</option>
                  <option value="bipa">BIPA Statutory Biometric Violation Demand</option>
                  <option value="cease_and_desist">Zero-Tolerance Cease & Desist Letter</option>
                  <option value="c2pa">C2PA Cryptographic Provenance Violation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#14192b] block mb-1.5">Target Infringer / Account</label>
                <input
                  type="text"
                  value={infringerName}
                  onChange={(e) => setInfringerName(e.target.value)}
                  className="w-full bg-[#f7f8fa] border border-[#e9eaf0] rounded-lg px-3.5 py-2.5 text-xs text-[#14192b] font-mono focus:border-[#0144e4] focus:outline-none"
                  placeholder="@infringer_handle"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-extrabold text-[#14192b] block mb-1.5">Infringing Content URL</label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full bg-[#f7f8fa] border border-[#e9eaf0] rounded-lg px-3.5 py-2.5 text-xs text-[#14192b] font-mono focus:border-[#0144e4] focus:outline-none"
                  placeholder="https://platform.com/video/123"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#14192b] block mb-1.5">Statutory Demand ($ USD)</label>
                <input
                  type="number"
                  value={statutoryAmount}
                  onChange={(e) => setStatutoryAmount(e.target.value)}
                  className="w-full bg-[#f7f8fa] border border-[#e9eaf0] rounded-lg px-3.5 py-2.5 text-xs text-[#14192b] font-mono font-bold focus:border-[#0144e4] focus:outline-none"
                  placeholder="5000"
                />
              </div>
            </div>

            {/* Generated Document Text Area in Terminal Viewer */}
            <div className="relative pt-2">
              <div className="flex items-center justify-between pb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0144e4] animate-pulse" />
                  <span className="text-xs font-extrabold text-[#14192b]">Notice Document Output</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleCopy}
                    className="text-xs text-[#0144e4] hover:underline font-extrabold flex items-center space-x-1 transition-all"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Document Text'}</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={12}
                  value={currentNoticeText}
                  className="w-full p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed focus:outline-none border border-slate-800 shadow-inner selection:bg-[#0144e4] selection:text-white"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-700/60 flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0144e4]" />
                  <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                    C2PA Cryptographically Signed
                  </span>
                </div>
              </div>
            </div>

            {/* Automated Dispatch Action Bar */}
            <div className="pt-2 border-t border-[#e9eaf0] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-600 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Instant dispatch notifies designated platform copyright agents via webhooks.</span>
              </div>

              <button
                onClick={handleDispatchNotice}
                disabled={isDispatching}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0144e4] hover:bg-[#0036b8] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isDispatching ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Dispatching via Legal API...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Notice via Authr API</span>
                  </>
                )}
              </button>
            </div>

            {dispatchSuccess && (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 font-bold">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Notice dispatched successfully to designated compliance agent!</span>
                </div>
                <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  {dispatchSuccess}
                </span>
              </div>
            )}

          </div>
        </div>

        {/* Right 1 Column: krazy Theme Statutory Protection Cards */}
        <div className="space-y-4">
          
          <div className="bg-white p-6 rounded-xl border border-[#e9eaf0] shadow-sm space-y-4">
            <div className="pb-3 border-b border-[#e9eaf0]">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0144e4] block font-mono">
                Statutory Safeguards
              </span>
              <h2 className="text-base font-extrabold text-[#14192b] mt-1">Legal Protections</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-lg bg-[#f7f8fa] border border-[#e9eaf0] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#14192b]">17 U.S.C. § 512 DMCA</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ACTIVE</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Service providers must expeditiously remove or disable access to infringing material upon receiving statutory notice.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#f7f8fa] border border-[#e9eaf0] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#14192b]">BIPA Biometric Act</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">$1k - $5k / violation</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Provides statutory liquidated damages for unauthorized harvesting of face vectors or voice spectral signatures.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#f7f8fa] border border-[#e9eaf0] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#14192b]">C2PA Provenance</span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">SHA-256</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Cryptographic tamper-evident manifest embedded directly into audio stems, images, and text manuscripts.
                </p>
              </div>
            </div>
          </div>

          {/* Krazy Theme Perk / Feature Highlight Card */}
          <div className="bg-[#f7f8fa] p-5 rounded-xl border border-[#e9eaf0] text-xs space-y-3">
            <div className="flex items-center space-x-2 text-[#0144e4]">
              <Globe className="w-4 h-4" />
              <span className="font-extrabold uppercase tracking-wider text-[10px]">Global Treaty Jurisdiction</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              DMCA statutory notices issued through Authr are recognized across all 50 US states, 
              EU Copyright Directive (Article 17), and 54 Berne Convention signatory nations.
            </p>
          </div>

        </div>

      </div>

      {/* Krazy Theme Perks Grid (3-column Krazy Perks Pattern matching krazy/careers page) */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e9eaf0] shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#eff4ff] text-[#0144e4] text-[10px] font-extrabold uppercase tracking-wider">
            <span>What are the protections?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14192b]">
            Automated Statutory Enforcement Infrastructure
          </h2>
          <p className="text-xs text-slate-600">
            Institutional-grade notice dispatch, biometric privacy enforcement, and digital asset rights clearing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Krazy Theme Card 1 */}
          <div className="bg-[#f7f8fa] p-6 rounded-lg border border-[#e9eaf0] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0144e4]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#14192b]">100% Automated Takedowns</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When web scrapers or unauthorized AI training bots are detected, statutory DMCA notices dispatch instantly.
            </p>
          </div>

          {/* Krazy Theme Card 2 */}
          <div className="bg-[#f7f8fa] p-6 rounded-lg border border-[#e9eaf0] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0144e4]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#14192b]">Biometric Vault Lock</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              128-node facial vector hashes and spectral voice prints locked under statutory BIPA compliance protocols.
            </p>
          </div>

          {/* Krazy Theme Card 3 */}
          <div className="bg-[#f7f8fa] p-6 rounded-lg border border-[#e9eaf0] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0144e4]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#14192b]">C2PA Evidentiary Seal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cryptographically signed provenance receipts provide bulletproof evidentiary chains for court filings.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
