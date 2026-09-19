import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  ArrowLeft, 
  X, 
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readMin: string;
  author: string;
  category: string;
  image: string;
}

export const BLOG_ARTICLES: Article[] = [
  {
    id: 'bipa-512-framework',
    title: "Understanding BIPA & Statutory Likeness Protection under 17 U.S.C. § 512",
    excerpt: "Comprehensive guide to automated intellectual property defense, biometric registration, and statutory takedown enforcement under 17 U.S.C. § 512...",
    content: [
      "Biometric data rights have rapidly shifted from obscure state statutes to the cornerstone of creator litigation in the artificial intelligence era. Illinois' Biometric Information Privacy Act (BIPA, 740 ILCS 14/) imposes strict statutory damages of up to $5,000 per intentional violation for collecting or hashing facial geometry vectors without informed written consent.",
      "When coupled with 17 U.S.C. § 512 DMCA provisions, creators gain a two-pronged legal enforcement apparatus: immediate injunctive notice-and-takedown demands coupled with statutory damages against generative model operators.",
      "Authr automates the creation of 128-node facial vector hashes and cryptographically binds them to sovereign identity records, providing bulletproof evidentiary chains for court filings across all 50 US states and 54 global treaty jurisdictions."
    ],
    date: "July 4, 2026",
    readMin: "3 min read time",
    author: "Authr Legal Team",
    category: "Legal",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'c2pa-watermarking-tech',
    title: "How C2PA Cryptographic Watermarking Prevents Unauthorized AI Model Training",
    excerpt: "Comprehensive guide to automated intellectual property defense, biometric registration, and statutory takedown enforcement under 17 U.S.C. § 512...",
    content: [
      "Coalition for Content Provenance and Authenticity (C2PA) standards embed tamper-evident cryptographic metadata directly into media file headers and steganographic layers.",
      "Every time a voice sample or artwork is exported through the Authr Vault, it receives a digital signature signed by our sovereign private key. Web crawlers attempting to ingest the asset immediately encounter C2PA claim blocks.",
      "If a scraper strips file metadata, Authr's dual steganographic audio-frequency and visual pixel-subspace watermarking retains verification data even through transcoding, compression, or screenshotting."
    ],
    date: "July 1, 2026",
    readMin: "2 min read time",
    author: "Tech Engineering",
    category: "C2PA",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'stripe-licensing-gates',
    title: "Monetizing Deepfake Influxes with Automated Stripe Settlement Gates",
    excerpt: "Comprehensive guide to automated intellectual property defense, biometric registration, and statutory takedown enforcement under 17 U.S.C. § 512...",
    content: [
      "Instead of issuing outright bans that lead to evasion, progressive creator rights enforcement redirects unauthorized commercial use directly into instant licensing gates.",
      "Authr's Web Scrape Radar pairs with Stripe Connect to generate dynamic statutory invoices when an enterprise or commercial entity ingests registered creator media.",
      "The infringer receives a formal settlement notice with a single-click payout link. Upon settlement, funds route directly into the creator's bank account with full Polygon L2 ledger transparency."
    ],
    date: "June 30, 2026",
    readMin: "4 min read time",
    author: "Monetization Ops",
    category: "Royalties",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'voice-cloning-defense',
    title: "Vocal Fingerprinting & 44.1kHz Spectral Defense for Voice Actors",
    excerpt: "Comprehensive guide to acoustic spectral fingerprinting, zero-shot TTS cloning defense, and automated cease-and-desist filings...",
    content: [
      "Synthetic voice generation models require as little as 3 seconds of reference audio to generate convincing voice clones. Authr registers high-fidelity 44.1kHz FFT spectral fingerprints of a creator's unique vocal acoustic signature.",
      "Our continuous audio radar monitors major voice cloning platforms (ElevenLabs, Play.ht, RVC models) and flags matches with over 99.4% acoustic precision.",
      "Upon detection, automated cease-and-desist notices are dispatched to model hosting providers with full spectral comparison charts attached."
    ],
    date: "June 25, 2026",
    readMin: "4 min read time",
    author: "Audio Signal Team",
    category: "Voice",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'polygon-l2-provenance',
    title: "Why On-Chain Polygon L2 Ledgers Provide Immutable Evidence in Court",
    excerpt: "Comprehensive guide to zero-knowledge timestamp proofs and self-authenticating block evidence under Rule 902 of Federal Evidence...",
    content: [
      "In traditional copyright disputes, establishing exact timestamp priority often relies on secondary evidence. Authr commits cryptographic hashes of registered identity vectors and media manifests directly to Polygon L2 mainnet.",
      "The resulting transaction hash creates a permanent, immutable public proof that cannot be retroactively altered, backdated, or tampered with by defense counsel.",
      "Federal courts increasingly accept public blockchain block headers as self-authenticating evidence under Rule 902 of the Federal Rules of Evidence."
    ],
    date: "June 18, 2026",
    readMin: "3 min read time",
    author: "Ledger Ops",
    category: "Polygon",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'ai-training-scrape-radar',
    title: "Detecting Bot Scraping Clusters across TikTok, YouTube & Instagram Reels",
    excerpt: "Comprehensive guide to real-time computer vision perceptual hashing, honeypot scraper tracking, and automated IP billing...",
    content: [
      "Large language and multimodal AI training datasets rely on web scrapers that continuously harvest public social media feeds. Authr's Web Scrape Radar deploys distributed honeypot nodes to catch scrapers in the act.",
      "By analyzing IP rotation patterns, user-agent anomalies, and frame-by-frame perceptual hashes, Authr pinpoints the exact corporate IP address responsible for harvesting content.",
      "Creators receive instant push alerts with legal options to either enforce immediate takedowns or bill the scraping entity statutory licensing fees."
    ],
    date: "June 12, 2026",
    readMin: "4 min read time",
    author: "Radar Intelligence",
    category: "Radar",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  }
];

interface BlogViewProps {
  onOpenRegister: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onOpenRegister }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('rg_blog_articles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return BLOG_ARTICLES;
  });

  React.useEffect(() => {
    const syncArticles = () => {
      const saved = localStorage.getItem('rg_blog_articles');
      if (saved) {
        try { setArticles(JSON.parse(saved)); } catch (e) {}
      } else {
        setArticles(BLOG_ARTICLES);
      }
    };

    window.addEventListener('storage', syncArticles);
    window.addEventListener('rg_blog_articles_updated', syncArticles);
    return () => {
      window.removeEventListener('storage', syncArticles);
      window.removeEventListener('rg_blog_articles_updated', syncArticles);
    };
  }, []);

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen pb-20">
      
      {/* Krazy Blog Header (Exact Krazy Template Title & Action Button Layout) */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#e9eaf0] pb-8">
          <div className="space-y-1 text-left">
            <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
              KNOWLEDGE
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
              Resource Center
            </h1>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {/* Search Input Filter */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#e9eaf0] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0144e4]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button 
              onClick={onOpenRegister}
              className="px-6 py-2.5 rounded-[6px] bg-[#0144e4] hover:bg-[#0038c7] text-white font-semibold text-sm transition-all shadow-2xs shrink-0"
            >
              Browse Articles
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0144e4] text-white shadow-2xs'
                  : 'bg-[#f7f8fa] text-slate-600 border border-[#e9eaf0] hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Articles Grid (Exact Krazy 3-Column Card Layout) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {filteredArticles.map((post) => (
            <article 
              key={post.id} 
              onClick={() => setActiveArticle(post)}
              className="bg-white rounded-2xl border border-[#e9eaf0] shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between hover:border-[#0144e4] transition-all group cursor-pointer"
            >
              <div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-52 object-cover border-b border-[#e9eaf0] group-hover:scale-102 transition-transform duration-500"
                />

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0144e4]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0144e4]" />
                      {post.readMin}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-display leading-snug group-hover:text-[#0144e4] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-mono">
                  <span className="font-bold text-slate-700">{post.author}</span>
                  <span className="px-3 py-1 bg-blue-50 text-[#0144e4] font-bold rounded-md border border-blue-100 uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#e9eaf0] shadow-2xl p-6 sm:p-10 space-y-6 text-left relative">
            
            <button 
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-xs font-mono text-slate-500">
                <span className="bg-blue-50 text-[#0144e4] font-bold px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readMin}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#0144e4] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {activeArticle.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{activeArticle.author}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Authr IP Counsel</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Legal Guide</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden h-64 sm:h-80 bg-slate-100">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-medium">
              {activeArticle.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={() => setActiveArticle(null)}
                className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Resource Center</span>
              </button>

              <button 
                onClick={onOpenRegister}
                className="px-6 py-2.5 rounded-[6px] bg-[#0144e4] hover:bg-[#0038c7] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
              >
                Register Your Sovereign Vault
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
