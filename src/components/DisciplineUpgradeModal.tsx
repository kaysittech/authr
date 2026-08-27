import React, { useState } from 'react';
import { 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  CreditCard, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Music,
  Palette,
  Camera,
  Briefcase
} from 'lucide-react';
import { getDisciplineStrategy } from '../services/disciplineStrategies';

interface DisciplineUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetDiscipline: string;
  onUnlockDiscipline: (disciplineId: string) => void;
}

export const DisciplineUpgradeModal: React.FC<DisciplineUpgradeModalProps> = ({
  isOpen,
  onClose,
  targetDiscipline,
  onUnlockDiscipline
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'module' | 'all_access'>('module');

  if (!isOpen) return null;

  const mapNames: Record<string, string> = {
    musicians: 'Musicians & Composers',
    artists: 'Visual & Fine Artists',
    creators: 'Video Creators & Podcasters',
    businesses: 'Commercial Brands & Agencies'
  };

  const fullTitle = mapNames[targetDiscipline] || 'Visual & Fine Artists';
  const strat = getDisciplineStrategy(fullTitle);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUnlockDiscipline(targetDiscipline);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-bold shadow-sm">
            <Lock className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                Unlock {strat.shortLabel}
              </span>
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300 rounded font-mono">
                Add-On Module
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Expand your independent monitoring network across additional creative disciplines.
            </p>
          </div>
        </div>

        {/* Strategy Preview */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">{strat.primaryMonetization}</span>
            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              ${strat.defaultAiRate}/query • ${strat.defaultLicenseRate}/ad
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {strat.monetizationDescription}
          </p>

          <div className="space-y-1.5 pt-1 border-t border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Monitored Rights Unlocked:</span>
            <div className="grid grid-cols-1 gap-1">
              {strat.rightsMonitored.map((right, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Options */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 block">Select Expansion Option:</label>
          
          <div 
            onClick={() => setSelectedTier('module')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              selectedTier === 'module'
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-900">Single Discipline Add-On Module</span>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-mono">Flex</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Unlocks {fullTitle} rights monitoring & licensing.</p>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-slate-900 font-mono">$29</span>
              <span className="text-[10px] text-slate-500 font-mono">/mo</span>
            </div>
          </div>

          <div 
            onClick={() => setSelectedTier('all_access')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              selectedTier === 'all_access'
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-900">Independent All-Access Multi-Discipline Pass</span>
                <span className="text-[10px] font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-mono">BEST VALUE</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Unlocks all 4 creative disciplines (Music, Visual, Video & Corporate IP).</p>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-amber-700 font-mono">$79</span>
              <span className="text-[10px] text-slate-500 font-mono">/mo</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2.5 disabled:opacity-50"
          >
            <CreditCard className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>
              {isProcessing
                ? 'Processing Stripe Checkout...'
                : selectedTier === 'module'
                ? `Unlock ${strat.shortLabel} for $29/mo`
                : 'Upgrade to All-Access Independent Pass ($79/mo)'}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-400 font-mono">
          🔒 Encrypted Stripe Checkout • Cancel or adjust multi-discipline modules anytime.
        </p>
      </div>
    </div>
  );
};
