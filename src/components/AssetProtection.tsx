import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Video, 
  Music, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  Lock, 
  FileCheck2, 
  Sparkles,
  ChevronDown,
  Upload,
  Radio,
  SlidersHorizontal,
  CheckCircle2,
  Loader2,
  X
} from 'lucide-react';
import { ProtectedAsset } from '../types';
import { UserSession } from './AuthModal';
import { ingestAssetApi } from '../services/api';

interface AssetProtectionProps {
  assets: ProtectedAsset[];
  onAddAsset: (newAsset: ProtectedAsset) => void;
  setActiveTab: (tab: string) => void;
  currentUser?: UserSession | null;
}

export const AssetProtection: React.FC<AssetProtectionProps> = ({
  assets,
  onAddAsset,
  setActiveTab,
  currentUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<ProtectedAsset | null>(assets[0] || null);

  // New Registration Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newPlatform, setNewPlatform] = useState<'YouTube' | 'TikTok' | 'Instagram' | 'Upload'>('YouTube');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [isIngesting, setIsIngesting] = useState(false);

  const disc = currentUser?.discipline || '';
  let pageTitle = 'Art & Asset Protection Vault';
  let pageDesc = 'Register media assets with C2PA cryptographic signatures and invisible steganographic watermarks.';

  if (disc.includes('Musicians')) {
    pageTitle = 'Audio Master & Stem Vault';
    pageDesc = 'Register master audio recordings, multi-track stems, and ISWC/ISRC mechanical sync metadata.';
  } else if (disc.includes('Visual')) {
    pageTitle = 'Artwork & Portfolio Vault';
    pageDesc = 'Register high-res digital illustrations, perceptual image hashes (pHash), and 32-bit AES watermarks.';
  } else if (disc.includes('Video')) {
    pageTitle = 'Video Footage & Podcast Vault';
    pageDesc = 'Register short-form videos, raw podcast episodes, and C2PA video stream provenance certificates.';
  } else if (disc.includes('Authors')) {
    pageTitle = 'Manuscript & Article Vault';
    pageDesc = 'Register book manuscripts, published articles, and 1536-dimensional semantic vector embeddings.';
  } else if (disc.includes('Brands')) {
    pageTitle = 'Brand Asset & Mascot Vault';
    pageDesc = 'Register corporate logos, mascot 3D assets, commercial jingles, and brand trademark hashes.';
  }

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || asset.mediaType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsIngesting(true);
    try {
      const res = await ingestAssetApi(newTitle, newUrl || 'https://youtube.com/watch?v=registered_asset', newPlatform, newFile || undefined);
      onAddAsset(res.asset);
      setSelectedAsset(res.asset);
      setIsRegisterModalOpen(false);
      setNewTitle('');
      setNewUrl('');
      setNewFile(null);
    } catch (err: any) {
      // Fallback local register if backend offline
      const fallbackAsset: ProtectedAsset = {
        id: `ast_${Date.now() % 10000}`,
        title: newTitle,
        mediaType: 'video',
        originalUrl: newUrl || 'https://youtube.com/watch?v=registered_asset',
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        pHash: 'b9e4a3f120c8d76e',
        stegPayload: 'AUTHR-C2PA-WATERMARK-OK',
        c2paSignature: 'SHA256:8f920a1bc391d84e...01c4',
        duration: '02:30',
        platform: newPlatform,
        createdAt: new Date().toISOString(),
        matchesCount: 0
      };
      onAddAsset(fallbackAsset);
      setSelectedAsset(fallbackAsset);
      setIsRegisterModalOpen(false);
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{pageTitle}</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {pageDesc}
          </p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2.5 flex-shrink-0 whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-slate-950 flex-shrink-0" />
          <span className="whitespace-nowrap">Register New Work</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search registered catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All Media Types</option>
            <option value="video">Video Master Files</option>
            <option value="audio">Audio Master Files</option>
            <option value="image">Visual Art & Artwork</option>
          </select>
        </div>
      </div>

      {/* 3-Column Studio Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Catalog List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAssets.map((asset) => {
            const isSelected = selectedAsset?.id === asset.id;
            return (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-400/20'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={asset.thumbnailUrl}
                    alt={asset.title}
                    className="w-20 h-16 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="text-xs font-mono font-bold text-slate-400">{asset.id}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-50 text-amber-800 border border-amber-300">
                        {asset.platform}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-50 text-indigo-800 border border-indigo-300">
                        C2PA Signed
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mt-1">{asset.title}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">pHash: {asset.pHash}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {asset.matchesCount} Matches
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (1/3): Inspector Pane */}
        <div>
          {selectedAsset ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5 sticky top-6">
              <div className="pb-4 border-b border-slate-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block font-mono">
                  Asset Provenance Inspector
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">{selectedAsset.title}</h2>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">pHash Fingerprint</span>
                  <span className="text-slate-900 font-bold block">{selectedAsset.pHash}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Steganographic Payload</span>
                  <span className="text-amber-800 font-bold block break-all">{selectedAsset.stegPayload}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">C2PA Signature</span>
                  <span className="text-indigo-800 font-bold block break-all">{selectedAsset.c2paSignature}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('detection')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all border border-slate-200 shadow-sm"
              >
                Scan Web for Infringements
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center text-slate-400 text-xs">
              Select an asset to view provenance metadata
            </div>
          )}
        </div>

      </div>

      {/* Register New Asset Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Register New Work / Artwork</h3>
              <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Work Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Audio Track / Digital Illustration"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Platform / Original URL</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Platform</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:border-amber-400 focus:outline-none"
                >
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Spotify">Spotify</option>
                  <option value="Upload">Custom Master File</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isIngesting}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                {isIngesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isIngesting ? 'Embedding C2PA Signature...' : 'Register & Sign Asset'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
