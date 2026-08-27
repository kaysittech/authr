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
  ChevronDown
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
  const [selectedNoticeType, setSelectedNoticeType] = useState<'dmca' | 'bipa' | 'cease_and_desist'>('dmca');
  const [targetUrl, setTargetUrl] = useState(matches[0]?.infringingUrl || 'https://instagram.com/reels/C89x0192A');
  const [infringerName, setInfringerName] = useState(matches[0]?.uploaderName || '@tech_dropship_daily');
  const [copied, setCopied] = useState(false);

  const generateDmcaNotice = () => {
    return `DMCA TAKEDOWN NOTICE & STATUTORY COPYRIGHT DEMAND
Date: ${new Date().toLocaleDateString()}
To: Designated Copyright Agent / Legal Compliance Team

Infringing URL: ${targetUrl}
Infringing Account: ${infringerName}

I, ${digitalTwin.userName} (${digitalTwin.handle}), am the verified copyright holder and independent owner of the original digital media asset.

The material located at ${targetUrl} reproduces, distributes, or commercializes my protected work without authorization.

Notice ID: dmca_notice_${Date.now()}
KYC Token: ${digitalTwin.faceVector?.id ? `kyc_tok_${digitalTwin.faceVector.id}_bipa` : `kyc_tok_${digitalTwin.userId}_bipa`}
Manager Node: Authr Independent Identity Manager #${digitalTwin.userId}

I have a good faith belief that use of the copyrighted materials described above is not authorized by the copyright owner, its agent, or the law.

Sworn under penalty of perjury,
${digitalTwin.userName}
Independent Legal Compliance Team for ${digitalTwin.userName}
Authr Network Node #${digitalTwin.userId}`;
  };

  const generateBipaNotice = () => {
    return `FORMAL NOTICE OF INTENT TO SUE: STATUTORY BIPA & RIGHT OF PUBLICITY VIOLATION
Date: ${new Date().toLocaleDateString()}
Target Party: ${infringerName}
Platform Location: ${targetUrl}

NOTICE IS HEREBY GIVEN that the unauthorized scraping, extraction, or commercial deployment of ${digitalTwin.userName}'s facial geometry vectors or voice print spectral signatures constitutes a direct violation of state Biometric Information Privacy Acts (BIPA) and Common Law Rights of Publicity.

Statutory damages range from $1,000 to $5,000 per willful violation.

DEMAND: Cease and desist all AI model training and commercial exploitation within 48 hours.

Signed,
Independent Legal Compliance Team for ${digitalTwin.userName}
Authr Network Node #${digitalTwin.userId}`;
  };

  const currentNoticeText = selectedNoticeType === 'dmca' 
    ? generateDmcaNotice() 
    : generateBipaNotice();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentNoticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">DMCA & Legal Notice Studio</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generate legally binding statutory takedown demands, BIPA biometric notices, and cease-and-desist letters.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-sm transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Notice</span>
          </button>
        </div>
      </div>

      {/* 3-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Form & Editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Notice Type</label>
                <select
                  value={selectedNoticeType}
                  onChange={(e) => setSelectedNoticeType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-amber-400 focus:outline-none font-bold"
                >
                  <option value="dmca">17 U.S.C. § 512(c) Statutory DMCA Takedown</option>
                  <option value="bipa">BIPA & Right of Publicity Violation Notice</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Account / Infringer</label>
                <input
                  type="text"
                  value={infringerName}
                  onChange={(e) => setInfringerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Infringing URL Location</label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-amber-400 focus:outline-none font-mono"
              />
            </div>

            {/* Generated Document Document Text Editor */}
            <div className="relative pt-2">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-slate-700">Notice Document Preview</span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-indigo-600 hover:underline font-bold flex items-center space-x-1"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Notice Text'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={10}
                value={currentNoticeText}
                className="w-full p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed focus:outline-none border border-slate-800 shadow-inner"
              />
            </div>

          </div>
        </div>

        {/* Right Column (1/3): Statutory Rights Summary */}
        <div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 sticky top-6">
            <div className="pb-3 border-b border-slate-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block font-mono">
                Statutory Protection Status
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-1">Independent Enforcement</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">17 U.S.C. § 512 Safe Harbor</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Platforms must expeditiously remove infringing material upon receipt of valid DMCA notices.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Biometric Information Privacy Act</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Strict liability up to $5,000 per violation for unauthorized AI voice & facial vector scraping.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
