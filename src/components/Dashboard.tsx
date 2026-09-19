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
  Globe,
  ChevronDown
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
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-300 text-blue-950 text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#0144e4]" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-[#0144e4] hover:text-blue-950 font-bold">✕</button>
        </div>
      )}      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2.5">
              <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 ${
                policyMode === 'strict_privacy'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                  : 'bg-blue-50 text-[#0144e4] border border-blue-200/60'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {policyMode === 'strict_privacy' ? 'Strict Privacy Mode' : 'Royalty Monetization Active'}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              {policyMode === 'strict_privacy' ? (
                <span>Lock Down Your Work. <span className="text-rose-600">Enforce Rights</span>.</span>
              ) : (
                <span>Protect Your Work & Claim <span className="text-[#0144e4]">Royalties</span></span>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Automated identity, voice, face, text manuscript, and digital artwork clearinghouse. Built for creators and commercial licensees.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <button
              onClick={onSimulateScan}
              className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-bold text-xs shadow-xs transition-all flex items-center space-x-2 whitespace-nowrap"
            >
              <Radar className="w-4 h-4 text-white" />
              <span>Run Quick Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Creator Action Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('assets')}
          className="p-4 rounded-xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-[#0144e4]/50 text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between text-[#0144e4] mb-1.5">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-50 text-[#0144e4]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-slate-900">Protect Work</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0144e4] group-hover:translate-x-0.5 transition-all" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Add media & C2PA watermark</p>
        </button>

        <button
          onClick={onSimulateScan}
          className="p-4 rounded-xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-[#0144e4]/50 text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between text-[#0144e4] mb-1.5">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-50 text-[#0144e4]">
                <Radar className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-slate-900">Scan Networks</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0144e4] group-hover:translate-x-0.5 transition-all" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">1,420-node crawler sweep</p>
        </button>

        <button
          onClick={() => setActiveTab('settlement')}
          className="p-4 rounded-xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-[#0144e4]/50 text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between text-[#0144e4] mb-1.5">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-50 text-[#0144e4]">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-slate-900">Settle Claims</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0144e4] group-hover:translate-x-0.5 transition-all" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Review & license flagged uses</p>
        </button>

        <button
          onClick={() => setActiveTab('financials')}
          className="p-4 rounded-xl bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-[#0144e4]/50 text-left transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between text-[#0144e4] mb-1.5">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-50 text-[#0144e4]">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-slate-900">Stripe Payouts</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0144e4] group-hover:translate-x-0.5 transition-all" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Bank account & revenue</p>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Protected Catalog</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900">
              {assets.length} <span className="text-xs font-normal text-slate-500">Registered Works</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{catalogSub}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Detection Nodes</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100">
              <Radar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900">
              {activeScansCount.toLocaleString()} <span className="text-xs font-normal text-slate-500">Nodes</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">● Active Crawl Networks</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Licensing Claims</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900">
              {pendingClaims.length} <span className="text-xs font-normal text-slate-500">Pending Claims</span>
            </div>
            <p className="text-xs text-blue-600 font-semibold mt-1">Settlement Gates Active</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Collected Royalties</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-[#0144e4]">
              ${totalRecovered.toFixed(2)}
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">✓ Connected via Stripe</p>
          </div>
        </div>
      </div>

      {/* Creative Discipline Workspace Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100 flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Creative Discipline Workspace</h2>
              <div className="relative mt-1 inline-block">
                <select
                  value={selectedDiscipline}
                  onChange={(e) => {
                    const val = e.target.value as DisciplineType;
                    if (val === 'all' || unlockedDisciplines.includes(val)) {
                      setSelectedDiscipline(val);
                    } else {
                      setTargetUpgradeDiscipline(val);
                      setIsUpgradeModalOpen(true);
                    }
                  }}
                  className="appearance-none bg-slate-50 hover:bg-blue-50/50 text-[#0144e4] text-sm sm:text-base font-extrabold py-2 pl-3.5 pr-9 rounded-xl border border-blue-200/80 focus:outline-none focus:ring-2 focus:ring-[#0144e4]/20 transition-all cursor-pointer shadow-2xs"
                >
                  {[
                    { id: 'all', label: '✨ All Creative Disciplines' },
                    { id: 'likeness', label: '👤 Likeness & Voice' },
                    { id: 'musicians', label: '🎵 Musicians & Composers' },
                    { id: 'artists', label: '🎨 Visual & Fine Artists' },
                    { id: 'creators', label: '📷 Video Creators & Podcasters' },
                    { id: 'authors', label: '📝 Authors & Writers' },
                    { id: 'businesses', label: '💼 Commercial Brands & Agencies' },
                  ].map((d) => (
                    <option key={d.id} value={d.id} className="text-slate-800 font-bold bg-white">
                      {d.label} {d.id !== 'all' && !unlockedDisciplines.includes(d.id) ? '🔒 (Add-On Module)' : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#0144e4] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Rates summary inline */}
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
              <div className="flex items-center space-x-3 bg-blue-50/70 border border-blue-200/60 px-4 py-2.5 rounded-xl self-start sm:self-center">
                <div className="text-xs">
                  <span className="font-semibold text-slate-600">Default Rate: </span>
                  <span className="text-[#0144e4] font-extrabold">${strategy.defaultAiRate}/query</span>
                  <span className="text-slate-300 mx-1.5">•</span>
                  <span className="text-[#0144e4] font-extrabold">${strategy.defaultLicenseRate}/ad</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Active Strategy & Rights Monitored */}
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
            <div className="flex items-center justify-between flex-wrap gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-blue-50 text-[#0144e4] border border-blue-200/60">
                  {strategy.shortLabel}
                </span>
                <span className="font-bold text-slate-800">{strategy.primaryMonetization}</span>
              </div>

              <div className="flex items-center space-x-2 flex-wrap gap-1.5">
                <span className="text-slate-400 font-semibold text-[11px]">Monitored Rights:</span>
                {strategy.rightsMonitored.map((right, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 text-[11px] font-semibold">
                    ✓ {right}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Main Grid Section: Live Scrape Feed (2/3) & Creator Vault (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Live Matches Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-[#0144e4]">
                <Radar className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-slate-900">Live Infringement Feed</h2>
            </div>
            <button
              onClick={() => setActiveTab('detection')}
              className="text-xs text-[#0144e4] hover:underline flex items-center space-x-1 font-bold"
            >
              <span>View All Matches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {filteredMatches.map((match) => (
              <div 
                key={match.id} 
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#0144e4]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-[#0144e4] flex-shrink-0 mt-0.5">
                    {match.assetType.startsWith('biometric') ? (
                      <Fingerprint className="w-5 h-5" />
                    ) : (
                      <Radio className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="text-xs font-extrabold text-slate-900">{match.assetTitle}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-[#0144e4] border border-blue-200/60">
                        {match.targetPlatform}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center space-x-2">
                      <span>Uploader: <strong className="text-slate-800">{match.uploaderName}</strong></span>
                      <span>•</span>
                      <span>Match: <strong className="text-[#0144e4]">{match.visualSimilarity > 0 ? match.visualSimilarity : match.audioSimilarity}%</strong></span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {policyMode === 'strict_privacy' ? 'Action' : 'Calculated Fee'}
                    </div>
                    <div className={`text-xs font-extrabold ${policyMode === 'strict_privacy' ? 'text-rose-600' : 'text-[#0144e4]'}`}>
                      {policyMode === 'strict_privacy' ? 'DMCA TAKEDOWN' : `$${match.estimatedLostRevenue.toFixed(2)}`}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab(policyMode === 'strict_privacy' ? 'legal' : 'settlement')}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 shadow-2xs whitespace-nowrap ${
                      policyMode === 'strict_privacy'
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-[#0144e4] hover:bg-[#0038c7] text-white'
                    }`}
                  >
                    <span>{policyMode === 'strict_privacy' ? 'Enforce Takedown' : 'Open Settlement Gate'}</span>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Sovereign Creator Vault */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-[#0144e4]">
              <UserCheck className="w-4 h-4" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900">Creator Vault Profile</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl space-y-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-center space-x-3 pb-3 border-slate-200 border-b">
              <img 
                src={digitalTwin.faceVector?.sampleImageUrl} 
                alt="Alex Rivera"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#0144e4]/30" 
              />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{digitalTwin.userName}</h3>
                <p className="text-xs text-slate-400">{digitalTwin.handle}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Licensing Policy:</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                  policyMode === 'micro_monetization'
                    ? 'bg-blue-50 text-[#0144e4] border border-blue-200/60'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {policyMode === 'micro_monetization' ? 'Royalty Monetization' : 'Strict Privacy'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                {policyMode === 'micro_monetization'
                  ? 'Commercial scrapers micro-license works & biometrics ($0.08/query, $250/ad).'
                  : 'Automated statutory DMCA takedowns dispatched instantly upon detection.'}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => setActiveTab('biometrics')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 text-slate-800 hover:text-[#0144e4] text-xs font-bold flex items-center justify-between border border-slate-200 transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-[#0144e4]" />
                  <span>{updateButtonLabel}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('legal')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 text-slate-800 hover:text-[#0144e4] text-xs font-bold flex items-center justify-between border border-slate-200 transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <FileCheck2 className="w-4 h-4 text-[#0144e4]" />
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
