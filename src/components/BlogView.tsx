import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Search, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  ArrowLeft, 
  X,
  Share2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readMin: string;
  author: string;
  role: string;
  category: string;
  image: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: 'bipa-512-framework',
    title: "Understanding BIPA & Statutory Likeness Protection under 17 U.S.C. § 512",
    excerpt: "How Illinois BIPA and federal statutory takedown provisions establish strict civil liability against unauthorized AI training pipelines.",
    content: [
      "Biometric data rights have rapidly shifted from obscure state statutes to the cornerstone of creator litigation in the artificial intelligence era. Illinois' Biometric Information Privacy Act (BIPA, 740 ILCS 14/) imposes strict statutory damages of up to $5,000 per intentional violation for collecting or hashing facial geometry vectors without informed written consent.",
      "When coupled with 17 U.S.C. § 512 DMCA provisions, creators gain a two-pronged legal enforcement apparatus: immediate injunctive notice-and-takedown demands coupled with statutory damages against generative model operators.",
      "Authr automates the creation of 128-node facial vector hashes and cryptographically binds them to sovereign identity records, providing bulletproof evidentiary chains for court filings across all 50 US states and 54 global treaty jurisdictions."
    ],
    date: "July 4, 2026",
    readMin: "4 min read",
    author: "Elena Vance, Esq.",
    role: "Lead IP & Civil Rights Counsel",
    category: "Legal & BIPA",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 'c2pa-watermarking-tech',
    title: "How C2PA Cryptographic Watermarking Prevents Unauthorized AI Model Training",
    excerpt: "Deep dive into SHA-256 manifest embeds, asset provenance certificates, and invisible audio/visual steganography.",
    content: [
      "Coalition for Content Provenance and Authenticity (C2PA) standards embed tamper-evident cryptographic metadata directly into media file headers and steganographic layers.",
      "Every time a voice sample or artwork is exported through the Authr Vault, it receives a digital signature signed by our sovereign private key. Web crawlers attempting to ingest the asset immediately encounter C2PA claim blocks.",
      "If a scraper strips file metadata, Authr's dual steganographic audio-frequency and visual pixel-subspace watermarking retains verification data even through transcoding, compression, or screenshotting."
    ],
    date: "July 1, 2026",
    readMin: "3 min read",
    author: "Dr. Marcus Sterling",
    role: "Head of Cryptographic Systems",
    category: "C2PA Standards",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'stripe-licensing-gates',
    title: "Monetizing Deepfake Influxes with Automated Stripe Settlement Gates",
    excerpt: "Converting illegal scraper traffic into automated micro-licensing royalty payouts using instant checkout gateways.",
    content: [
      "Instead of issuing outright bans that lead to evasion, progressive creator rights enforcement redirects unauthorized commercial use directly into instant licensing gates.",
      "Authr's Web Scrape Radar pairs with Stripe Connect to generate dynamic statutory invoices when an enterprise or commercial entity ingests registered creator media.",
      "The infringer receives a formal settlement notice with a single-click payout link. Upon settlement, funds route directly into the creator's bank account with full Polygon L2 ledger transparency."
    ],
    date: "June 30, 2026",
    readMin: "5 min read",
    author: "Sarah Chen",
    role: "VP of Royalty Engineering",
    category: "Royalty Gate",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'voice-cloning-defense',
    title: "Vocal Fingerprinting & 44.1kHz Spectral Defense for Voice Actors",
    excerpt: "Protecting voice actors and podcast hosts against zero-shot synthetic TTS voice clone models.",
    content: [
      "Synthetic voice generation models require as little as 3 seconds of reference audio to generate convincing voice clones. Authr registers high-fidelity 44.1kHz FFT spectral fingerprints of a creator's unique vocal acoustic signature.",
      "Our continuous audio radar monitors major voice cloning platforms (ElevenLabs, Play.ht, RVC models) and flags matches with over 99.4% acoustic precision.",
      "Upon detection, automated cease-and-desist notices are dispatched to model hosting providers with full spectral comparison charts attached."
    ],
    date: "June 25, 2026",
    readMin: "4 min read",
    author: "David Thorne",
    role: "Audio Signal Processing Specialist",
    category: "Voice Protection",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'polygon-l2-provenance',
    title: "Why On-Chain Polygon L2 Ledgers Provide Immutable Evidence in Court",
    excerpt: "Understanding how timestamped zero-knowledge proofs eliminate ownership disputes in copyright litigation.",
    content: [
      "In traditional copyright disputes, establishing exact timestamp priority often relies on secondary evidence. Authr commits cryptographic hashes of registered identity vectors and media manifests directly to Polygon L2 mainnet.",
      "The resulting transaction hash creates a permanent, immutable public proof that cannot be retroactively altered, backdated, or tampered with by defense counsel.",
      "Federal courts increasingly accept public blockchain block headers as self-authenticating evidence under Rule 902 of the Federal Rules of Evidence."
    ],
    date: "June 18, 2026",
    readMin: "3 min read",
    author: "Alex Rivera",
    role: "Independent Artist & Authr Advocate",
    category: "Blockchain Legal",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'ai-training-scrape-radar',
    title: "Detecting Bot Scraping Clusters across TikTok, YouTube & Instagram Reels",
    excerpt: "How real-time computer vision and perceptual hashing track unauthorized social media scraping.",
    content: [
      "Large language and multimodal AI training datasets rely on web scrapers that continuously harvest public social media feeds. Authr's Web Scrape Radar deploys distributed honeypot nodes to catch scrapers in the act.",
      "By analyzing IP rotation patterns, user-agent anomalies, and frame-by-frame perceptual hashes, Authr pinpoints the exact corporate IP address responsible for harvesting content.",
      "Creators receive instant push alerts with legal options to either enforce immediate takedowns or bill the scraping entity statutory licensing fees."
    ],
    date: "June 12, 2026",
    readMin: "4 min read",
    author: "Maya Lin",
    role: "Cybersecurity & Radar Lead",
    category: "AI Scrape Radar",
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

  const categories = ['All', 'Legal & BIPA', 'C2PA Standards', 'Royalty Gate', 'Voice Protection', 'AI Scrape Radar'];

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen pb-20">
      
      {/* Blog Hero Header */}
      <section className="bg-[#f7f8fa] border-b border-[#e9eaf0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Authr Creator Rights Journal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Resource Center &amp; IP Insights
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Stay informed on biometric law (BIPA), C2PA cryptographic standards, statutory takedowns under 17 U.S.C. § 512, and royalty monetization.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="max-w-2xl mx-auto space-y-4 pt-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by legal topic, technology, or category..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#e9eaf0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0144e4] shadow-2xs font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0144e4] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-[#e9eaf0] hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
        
        {/* Featured Hero Article Card (shows when no search filter active) */}
        {!searchQuery && selectedCategory === 'All' && (
          <div 
            onClick={() => setActiveArticle(featured)}
            className="bg-white rounded-2xl border border-[#e9eaf0] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer hover:border-[#0144e4] transition-all group"
          >
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[400px]">
              <img 
                src={featured.image} 
                alt={featured.title} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#0144e4] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full font-mono shadow-md">
                Featured Insight
              </span>
            </div>

            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1 font-bold text-[#0144e4]">{featured.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" />{featured.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />{featured.readMin}</span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-display leading-tight group-hover:text-[#0144e4] transition-colors">
                  {featured.title}
                </h2>

                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-[#0144e4] font-bold flex items-center justify-center text-xs">
                    EV
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{featured.author}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{featured.role}</p>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-[#0144e4] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              Latest Articles ({filteredArticles.length})
            </h3>
            {selectedCategory !== 'All' && (
              <span className="text-xs font-mono text-[#0144e4] font-bold">
                Filtered by {selectedCategory}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article 
                key={article.id} 
                onClick={() => setActiveArticle(article)}
                className="bg-white rounded-xl border border-[#e9eaf0] shadow-2xs hover:shadow-xl hover:border-[#0144e4] transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md font-mono border border-slate-200 shadow-2xs">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-4 text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#0144e4]" />{article.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0144e4]" />{article.readMin}</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 font-display leading-snug group-hover:text-[#0144e4] transition-colors">
                      {article.title}
                    </h4>

                    <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">{article.author}</span>
                  <span className="text-xs font-bold text-[#0144e4] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-[#0144e4] rounded-2xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 text-blue-200 font-mono text-xs font-bold uppercase tracking-widest bg-blue-600/50 px-3 py-1 rounded-full border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Ahead of AI IP Law</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Get Statutory Rights &amp; BIPA Updates Weekly
            </h3>
            <p className="text-sm text-blue-100 font-medium">
              Join 14,000+ creators, artists, voice actors, and IP lawyers receiving our breakdown of emerging AI copyright precedents.
            </p>
          </div>

          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email"
              placeholder="Enter your professional email..."
              className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 text-sm focus:outline-none placeholder:text-slate-400 font-medium shadow-inner"
            />
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md shrink-0"
            >
              Subscribe Free
            </button>
          </div>
        </section>

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
                    <p className="text-[10px] text-slate-400 font-mono">{activeArticle.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Legal Analysis</span>
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
                <span>Back to Articles</span>
              </button>

              <button 
                onClick={onOpenRegister}
                className="px-6 py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all"
              >
                Register Your IP Vault Now
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
