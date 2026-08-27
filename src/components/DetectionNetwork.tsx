import React, { useState } from 'react';
import { 
  Radar, 
  Search, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Bot, 
  Globe, 
  Tv, 
  DollarSign, 
  Scale, 
  Clock,
  SlidersHorizontal
} from 'lucide-react';
import { DetectionMatch, MatchCategory, PolicyMode } from '../types';
import { UserSession } from './AuthModal';

interface DetectionNetworkProps {
  matches: DetectionMatch[];
  setActiveTab: (tab: string) => void;
  onSimulateScan: () => void;
  policyMode?: PolicyMode;
  currentUser?: UserSession | null;
}

export const DetectionNetwork: React.FC<DetectionNetworkProps> = ({
  matches,
  setActiveTab,
  onSimulateScan,
  policyMode = 'micro_monetization',
  currentUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const isBrand = (currentUser?.discipline || '').includes('Brands');
  const pageTitle = isBrand ? 'Trademark & Impersonation Monitor' : 'Cross-Platform Web Scrape Monitor';
  const pageDesc = isBrand
    ? 'Real-time crawler swarms monitoring social media, video platforms, and ad networks for unauthorized brand impersonation, mascot cloning, and counterfeit logo usage.'
    : 'Real-time crawler swarms monitoring AI model training datasets, social feeds, and video networks for unauthorized voice, face, or media scrapes.';

  const filteredMatches = matches.filter(m => {
    const matchesSearch = m.assetTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.uploaderName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || m.matchCategory === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || m.targetPlatform === selectedPlatform;
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Nodes Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center space-x-3">
            <Radar className="w-6 h-6 text-indigo-600 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{pageTitle}</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {pageDesc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-mono text-xs flex items-center space-x-2.5 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <span className="font-extrabold block text-[11px]">Automated Background Daemon Active</span>
              <span className="text-[10px] text-emerald-700 font-bold">Runs Every 6 Hours • Managed by Admin</span>
            </div>
          </div>

          <div className="px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[11px] flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Next Sweep: In 2h 45m</span>
          </div>
        </div>
      </div>

      {/* Nodes Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-200 flex-shrink-0">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">YouTube Shorts Node</h3>
            <p className="text-[10px] text-emerald-700 font-mono mt-0.5">● Content ID Hooked</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-pink-50 text-pink-600 border border-pink-200 flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">Instagram Reels Node</h3>
            <p className="text-[10px] text-emerald-700 font-mono mt-0.5">● Graph API Active</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex-shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">AI Dataset Swarms</h3>
            <p className="text-[10px] text-indigo-700 font-mono mt-0.5">● Common Crawl Scraper</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">E-Commerce Match</h3>
            <p className="text-[10px] text-amber-700 font-mono mt-0.5">● Amazon / Shopify</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search matches or uploader..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="brand_commercial">Brand Commercial Use</option>
            <option value="organic_reupload">Organic Re-Upload</option>
            <option value="ai_training_scraping">AI Training Scraping</option>
            <option value="deepfake_clone">Deepfake Clone</option>
          </select>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All Platforms</option>
            <option value="YouTube Shorts">YouTube Shorts</option>
            <option value="Instagram Reels">Instagram Reels</option>
            <option value="TikTok">TikTok</option>
            <option value="Common Crawl AI">Common Crawl AI</option>
            <option value="E-Commerce / Amazon">E-Commerce / Amazon</option>
          </select>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center border border-slate-200/80 shadow-sm">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">No matches found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div 
              key={match.id}
              className="bg-white p-5 sm:px-6 sm:py-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                  <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded border ${
                    match.matchCategory === 'brand_commercial'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : match.matchCategory === 'ai_training_scraping'
                      ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}>
                    {match.matchCategory.replace('_', ' ')}
                  </span>

                  <span className="px-2.5 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-700 rounded border border-slate-200">
                    {match.targetPlatform}
                  </span>

                  <span className="text-xs text-slate-400 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(match.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{match.assetTitle}</h3>

                <p className="text-xs text-slate-600">
                  Infringing Account: <strong className="text-slate-900 font-mono">{match.uploaderName}</strong>
                </p>

                <div className="flex items-center space-x-4 pt-1">
                  <div className="flex items-center space-x-1.5 text-xs">
                    <span className="text-slate-500">Visual Similarity:</span>
                    <span className="font-mono font-bold text-amber-700">{match.visualSimilarity}%</span>
                  </div>

                  {match.audioSimilarity > 0 && (
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="text-slate-500">Audio Overlap:</span>
                      <span className="font-mono font-bold text-indigo-700">{match.audioSimilarity}%</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1.5 text-xs">
                    <span className="text-slate-500">Est. Views:</span>
                    <span className="font-mono text-slate-800">{match.viewCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end space-x-5 border-t lg:border-t-0 border-slate-200 pt-4 lg:pt-0 pr-1">
                <div className="text-left lg:text-right">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                    {policyMode === 'strict_privacy' ? 'Enforcement Mode' : 'Calculated Settlement'}
                  </span>
                  <span className={`text-base sm:text-lg font-black font-mono ${policyMode === 'strict_privacy' ? 'text-rose-600' : 'text-amber-600'}`}>
                    {policyMode === 'strict_privacy' ? 'TAKEDOWN DEMAND' : `$${match.estimatedLostRevenue.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <a
                    href={match.infringingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all shadow-sm"
                    title="View Infringing URL"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setActiveTab(policyMode === 'strict_privacy' ? 'legal' : 'settlement')}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center space-x-2 border whitespace-nowrap ${
                      policyMode === 'strict_privacy'
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-400 font-extrabold'
                    }`}
                  >
                    <Scale className="w-4 h-4 flex-shrink-0" />
                    <span>{policyMode === 'strict_privacy' ? 'Enforce Legal Takedown' : 'Open Settlement Gate'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
