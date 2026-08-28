import React, { useState, useEffect } from 'react';
import { getDisciplineStrategy } from '../services/disciplineStrategies';
import { 
  ShieldCheck, 
  UserCheck, 
  Radar, 
  DollarSign, 
  Scale, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles,
  ArrowRight,
  Fingerprint,
  Radio,
  FileCheck2,
  ExternalLink,
  Music,
  Palette,
  Briefcase,
  Camera,
  Layers,
  Award,
  Lock,
  Globe
} from 'lucide-react';
import { DigitalTwin, ProtectedAsset, DetectionMatch, SettlementClaim, PolicyMode } from '../types';
import { DisciplineUpgradeModal } from './DisciplineUpgradeModal';
import { UserSession } from './AuthModal';

interface DashboardProps {
  digitalTwin: DigitalTwin;
  assets: ProtectedAsset[];
  matches: DetectionMatch[];
  claims: SettlementClaim[];
  policyMode: PolicyMode;
  setActiveTab: (tab: string) => void;
  onSimulateScan: () => void;
  currentUser?: UserSession | null;
}

export type DisciplineType = 'all' | 'likeness' | 'musicians' | 'artists' | 'creators' | 'authors' | 'businesses';

const getDisciplineKey = (userDiscipline?: string): DisciplineType => {
  if (!userDiscipline) return 'likeness';
  if (userDiscipline.includes('Likeness') || userDiscipline.includes('Voice')) return 'likeness';
  if (userDiscipline.includes('Music') || userDiscipline.includes('Composer')) return 'musicians';
  if (userDiscipline.includes('Visual') || userDiscipline.includes('Artist')) return 'artists';
  if (userDiscipline.includes('Video') || userDiscipline.includes('Podcaster')) return 'creators';
  if (userDiscipline.includes('Author') || userDiscipline.includes('Literary') || userDiscipline.includes('Text')) return 'authors';
  if (userDiscipline.includes('Brand') || userDiscipline.includes('Commercial')) return 'businesses';
  return 'all';
};

export const Dashboard: React.FC<DashboardProps> = ({
  digitalTwin,
  assets,
  matches,
  claims,
  policyMode,
  setActiveTab,
  onSimulateScan,
  currentUser
}) => {
  const activeDisciplineName = currentUser?.discipline || 'Likeness & Voice Protection';

  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineType>(() => {
    return getDisciplineKey(activeDisciplineName);
  });

  // Keep Dashboard workspace in 100% lockstep sync with top-left active rights profile!
  useEffect(() => {
    setSelectedDiscipline(getDisciplineKey(activeDisciplineName));
  }, [activeDisciplineName]);

  // Dynamic Subtitles and Button Labels based on activeDisciplineName
  let catalogSub = 'Face Vector & Voice Print Active';
  let updateButtonLabel = 'Update Biometrics & Voice Print';

  if (activeDisciplineName.includes('Musicians')) {
    catalogSub = 'Vocal Stem & Audio Masters Active';
    updateButtonLabel = 'Update Vocal & Audio Master Vault';
  } else if (activeDisciplineName.includes('Visual')) {
    catalogSub = 'pHash & AES Watermarks Active';
    updateButtonLabel = 'Update Artwork & pHash Portfolio';
  } else if (activeDisciplineName.includes('Video')) {
    catalogSub = '3D Face Mesh & Video Provenance Active';
    updateButtonLabel = 'Update 3D Face Mesh & Video Vault';
  } else if (activeDisciplineName.includes('Author') || activeDisciplineName.includes('Literary')) {
    catalogSub = 'Text Embeddings & LLM Protections Active';
    updateButtonLabel = 'Update Manuscript & Text Embeddings';
  } else if (activeDisciplineName.includes('Brand') || activeDisciplineName.includes('Commercial')) {
    catalogSub = 'Trademark & Mascot Vectors Active';
    updateButtonLabel = 'Update Brand Mascot & Trademark Vault';
  }

  // Cross-discipline monetization add-on state
  const [unlockedDisciplines, setUnlockedDisciplines] = useState<string[]>(['likeness', 'musicians', 'artists', 'creators', 'authors', 'businesses']);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [targetUpgradeDiscipline, setTargetUpgradeDiscipline] = useState<string>('artists');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const pendingClaims = claims.filter(c => c.status === 'pending');
  const totalRecovered = 1521.92;
  const activeScansCount = 1420;

  const filteredMatches = matches.filter(match => {
    if (selectedDiscipline === 'all') return true;
    if (selectedDiscipline === 'likeness') return match.assetType === 'biometric_face' || match.assetType === 'biometric_voice';
    if (selectedDiscipline === 'musicians') return match.assetType === 'audio' || match.assetType === 'biometric_voice';
    if (selectedDiscipline === 'artists') return match.assetType === 'image' || match.assetType === 'artwork';
    if (selectedDiscipline === 'creators') return match.assetType === 'video' || match.assetType === 'podcast';
    if (selectedDiscipline === 'authors') return match.assetType === 'text' || match.assetType === 'manuscript';
    if (selectedDiscipline === 'businesses') return match.matchCategory === 'brand_commercial';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-amber-800 hover:text-amber-950 font-bold">✕</button>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          {/* Dynamic Policy Mode Banner & Headline */}
          {policyMode === 'strict_privacy' ? (
            <>
              <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-300 rounded-full flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  Strict Privacy Lockdown Mode Active
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Zero-Tolerance Cease & Desist • Automated DMCA / BIPA Takedowns
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                Lock Down Your Work. Enforce Legal <span className="text-rose-600 font-black">Takedowns</span>.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Zero-tolerance statutory lockdown mode. Any detected web scrape, unauthorized voice clone, face swap, or stolen artwork immediately triggers an automated Cease & Desist and DMCA / BIPA legal takedown notice.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300 rounded-full flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  Independent Rights & Royalty Network Active
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Commercial Micro-Monetization • C2PA Signed • BIPA Protected
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                Protect Your Work. Claim Your <span className="text-amber-600 font-black">Royalties</span>.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Automated identity, voice, face, text manuscript, and digital artwork clearinghouse. Built for musicians, fine artists, authors, short-form creators, and commercial media licensees.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Quick Creator Action Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('assets')}
          className="p-3.5 rounded-2xl bg-white hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-300 text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between text-amber-600 mb-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-extrabold text-slate-900">Protect Work</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-1">Add media, pHash & C2PA watermark</p>
        </button>

        <button
          onClick={onSimulateScan}
          className="p-3.5 rounded-2xl bg-white hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-300 text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <div className="flex items-center space-x-2">
              <Radar className="w-4 h-4" />
              <span className="text-xs font-extrabold text-slate-900">Scan Networks</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-1">Trigger 1,420-node crawler sweep</p>
        </button>

        <button
          onClick={() => setActiveTab('settlement')}
          className="p-3.5 rounded-2xl bg-white hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4" />
              <span className="text-xs font-extrabold text-slate-900">Settle Claims</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-1">Settle & license flagged uses</p>
        </button>

        <button
          onClick={() => setActiveTab('financials')}
          className="p-3.5 rounded-2xl bg-white hover:bg-purple-50/50 border border-slate-200/80 hover:border-purple-300 text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between text-purple-600 mb-1">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-extrabold text-slate-900">Stripe Payouts</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-1">Connect bank account for payouts</p>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Protected Catalog</span>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 font-mono flex items-baseline space-x-2">
              <span>{assets.length}</span>
              <span className="text-xs font-sans font-normal text-slate-500">Registered Works</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{catalogSub}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detection Nodes</span>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700">
              <Radar className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 font-mono flex items-baseline space-x-2">
              <span>{activeScansCount.toLocaleString()}</span>
              <span className="text-xs font-sans font-normal text-slate-500">Nodes</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>YT, IG, TikTok & AI Training Sets</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Licensing Claims</span>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 font-mono flex items-baseline space-x-2">
              {pendingClaims.length} <span className="text-xs font-sans font-normal text-slate-500">Claim(s)</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Settlement Gates Active</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Collected Royalties</span>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-amber-600 font-mono">
              ${totalRecovered.toFixed(2)}
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5 flex items-center space-x-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>+18.4% via Stripe Connect</span>
            </p>
          </div>
        </div>
      </div>

      {/* Full-Width Creative Discipline Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
              Active Discipline Workspace:
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-md bg-amber-100 text-amber-900 border border-amber-300">
              {activeDisciplineName} (Registered Vault)
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
          {[
            { id: 'all', label: 'All Creative Disciplines', icon: Sparkles },
            { id: 'likeness', label: 'Likeness & Voice', icon: UserCheck },
            { id: 'musicians', label: 'Musicians & Composers', icon: Music },
            { id: 'artists', label: 'Visual & Fine Artists', icon: Palette },
            { id: 'creators', label: 'Video Creators & Podcasters', icon: Camera },
            { id: 'authors', label: 'Authors & Writers', icon: FileCheck2 },
            { id: 'businesses', label: 'Commercial Brands & Agencies', icon: Briefcase },
          ].map((discipline) => {
            const Icon = discipline.icon;
            const isSelected = selectedDiscipline === discipline.id;
            const isUnlocked = discipline.id === 'all' || unlockedDisciplines.includes(discipline.id);

            const handleClick = () => {
              if (isUnlocked) {
                setSelectedDiscipline(discipline.id as DisciplineType);
              } else {
                setTargetUpgradeDiscipline(discipline.id);
                setIsUpgradeModalOpen(true);
              }
            };

            return (
              <button
                key={discipline.id}
                onClick={handleClick}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-sm ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-extrabold border border-amber-400'
                    : isUnlocked
                    ? 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    : 'bg-slate-100 text-slate-500 border border-slate-200/80 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{discipline.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Strategy Summary */}
        {selectedDiscipline !== 'all' && (() => {
          const mapDisciplineNames: Record<string, string> = {
            likeness: 'Likeness & Voice Protection',
            musicians: 'Musicians & Composers',
            artists: 'Visual & Fine Artists',
            creators: 'Video Creators & Podcasters',
            authors: 'Authors & Literary Writers',
            businesses: 'Commercial Brands & Agencies'
          };
          const fullDisciplineName = mapDisciplineNames[selectedDiscipline];
          const strategy = getDisciplineStrategy(fullDisciplineName);

          return (
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2 animate-fadeIn font-mono">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md ${strategy.badgeColor}`}>
                    {strategy.shortLabel}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{strategy.primaryMonetization}</span>
                </div>
                <div className="text-[11px] font-bold text-slate-700">
                  Default Rate: <span className="text-amber-900 font-extrabold">${strategy.defaultAiRate}/query</span> • <span className="text-amber-900 font-extrabold">${strategy.defaultLicenseRate}/ad</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-[11px] text-slate-600 flex-wrap gap-y-1">
                <span className="text-slate-400 font-bold">MONITORED RIGHTS:</span>
                {strategy.rightsMonitored.map((right, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-bold">
                    ✓ {right}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Main Grid Section: Live Scrape Feed (2/3) & Sovereign Creator Vault (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Live Matches Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Radar className="w-5 h-5 text-amber-600 animate-pulse" />
              <h2 className="text-lg font-bold text-slate-900">Live Infringement & Royalty Licensing Feed</h2>
            </div>
            <button
              onClick={() => setActiveTab('detection')}
              className="text-xs text-amber-700 hover:underline flex items-center space-x-1.5 font-bold"
            >
              <span>View All Matches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {filteredMatches.map((match) => (
              <div 
                key={match.id} 
                className="bg-white p-5 sm:px-6 sm:py-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl border mt-0.5 flex-shrink-0 ${
                    match.matchCategory === 'brand_commercial'
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : match.matchCategory === 'ai_training_scraping'
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-rose-50 border-rose-200 text-rose-700'
                  }`}>
                    {match.assetType.startsWith('biometric') ? (
                      <Fingerprint className="w-5 h-5" />
                    ) : (
                      <Radio className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                      <span className="text-sm font-bold text-slate-900">{match.assetTitle}</span>
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {match.targetPlatform}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 flex items-center space-x-2">
                      <span>Uploader / Brand: <strong className="text-slate-900 font-mono">{match.uploaderName}</strong></span>
                      <span>•</span>
                      <span>Similarity: <strong className="text-amber-700">{match.visualSimilarity > 0 ? match.visualSimilarity : match.audioSimilarity}%</strong></span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-5 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wider">
                      {policyMode === 'strict_privacy' ? 'Enforcement Action' : 'Calculated License Fee'}
                    </div>
                    <div className={`text-sm font-black font-mono ${policyMode === 'strict_privacy' ? 'text-rose-600' : 'text-amber-700'}`}>
                      {policyMode === 'strict_privacy' ? 'DMCA TAKEDOWN' : `$${match.estimatedLostRevenue.toFixed(2)}`}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab(policyMode === 'strict_privacy' ? 'legal' : 'settlement')}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 shadow-sm border whitespace-nowrap ${
                      policyMode === 'strict_privacy'
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-400 font-extrabold'
                    }`}
                  >
                    <span>{policyMode === 'strict_privacy' ? 'Enforce DMCA Takedown' : 'Open Settlement Gate'}</span>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Sovereign Identity Profile */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Independent Creator Vault</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl space-y-4 border border-slate-200/80 shadow-sm">
            <div className="flex items-center space-x-4 pb-4 border-b border-slate-200">
              <img 
                src={digitalTwin.faceVector?.sampleImageUrl} 
                alt="Alex Rivera"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400/40" 
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{digitalTwin.userName}</h3>
                <p className="text-xs text-slate-500 font-mono">{digitalTwin.handle}</p>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-50 text-amber-800 border border-amber-300">
                    BIPA Protected
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-50 text-indigo-800 border border-indigo-300">
                    C2PA Signed
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Licensing Policy:</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                  policyMode === 'micro_monetization'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}>
                  {policyMode === 'micro_monetization' ? 'Royalty Monetization' : 'Strict Privacy'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {policyMode === 'micro_monetization'
                  ? 'AI models & commercial scrapers micro-license your works & biometrics at set rates ($0.08/query, $250/ad).'
                  : 'Automated statutory DMCA & copyright notices are dispatched instantly upon scrape detection.'}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setActiveTab('biometrics')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold flex items-center justify-between border border-slate-200 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{updateButtonLabel}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('legal')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold flex items-center justify-between border border-slate-200 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <FileCheck2 className="w-4 h-4 text-indigo-600" />
                  <span>Generate DMCA & BIPA Notice</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Discipline Module Upgrade Modal */}
      <DisciplineUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        targetDiscipline={targetUpgradeDiscipline}
        onUnlockDiscipline={(disciplineId) => {
          if (!unlockedDisciplines.includes(disciplineId)) {
            setUnlockedDisciplines([...unlockedDisciplines, disciplineId]);
          }
          setSelectedDiscipline(disciplineId as DisciplineType);
          setToastMessage(`Creative Discipline Add-On Module Unlocked & Active!`);
          setTimeout(() => setToastMessage(null), 4000);
        }}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl font-bold text-xs flex items-center space-x-3 animate-fadeIn border border-emerald-400">
          <ShieldCheck className="w-5 h-5 text-white flex-shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80 font-bold ml-2">✕</button>
        </div>
      )}

    </div>
  );
};
