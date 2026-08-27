export interface DisciplineStrategy {
  id: string;
  name: string;
  shortLabel: string;
  rightsMonitored: string[];
  primaryMonetization: string;
  monetizationDescription: string;
  defaultAiRate: number;
  defaultLicenseRate: number;
  badgeColor: string;
  iconName: string;
  recommendedPolicy: 'micro_monetization' | 'strict_privacy';
}

export const DISCIPLINE_STRATEGIES: Record<string, DisciplineStrategy> = {
  'Likeness & Voice Protection': {
    id: 'likeness_voice',
    name: 'Likeness & Voice Protection',
    shortLabel: 'Biometric Face & Voice Rights',
    rightsMonitored: [
      '3D Facial Geometry Vector Mesh (128 Nodes)',
      'Spectral Voice Print (85Hz - 3.4kHz)',
      'BIPA & C2PA Sovereign Identity Hashes'
    ],
    primaryMonetization: 'Biometric Voice & Deepfake Face-Swap Licensing',
    monetizationDescription: 'Protects actors, models, and public figures. Issue automated legal licensing gates for AI voice clones, digital avatars, and unauthorized likeness usage.',
    defaultAiRate: 0.12,
    defaultLicenseRate: 450.00,
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    iconName: 'UserCheck',
    recommendedPolicy: 'micro_monetization'
  },
  'Musicians & Composers': {
    id: 'musicians',
    name: 'Musicians & Composers',
    shortLabel: 'Music & Audio Rights',
    rightsMonitored: [
      'Spectral Voice Print (85Hz - 3.4kHz)',
      'Audio Master Recordings',
      'Composition Musical Copyrights'
    ],
    primaryMonetization: 'Voice Licensing & Mechanical Sync Royalties',
    monetizationDescription: 'Collects micro-royalties when AI models train on or clone your vocal acoustic signature, plus sync fees when video creators use your audio masters.',
    defaultAiRate: 0.08,
    defaultLicenseRate: 250.00,
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    iconName: 'Music',
    recommendedPolicy: 'micro_monetization'
  },
  'Visual & Fine Artists': {
    id: 'artists',
    name: 'Visual & Fine Artists',
    shortLabel: 'Visual Art & Provenance',
    rightsMonitored: [
      'Perceptual Image Hash (pHash)',
      'Invisible Steganographic Watermarks',
      'AI Image Generator Training Sets'
    ],
    primaryMonetization: 'AI Diffusion Model Scrape Licensing & Print Royalties',
    monetizationDescription: 'Protects high-resolution digital art and illustrations. Issues automated licensing invoices to AI image models scraping your portfolio.',
    defaultAiRate: 0.15,
    defaultLicenseRate: 350.00,
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    iconName: 'Palette',
    recommendedPolicy: 'micro_monetization'
  },
  'Video Creators & Podcasters': {
    id: 'creators',
    name: 'Video Creators & Podcasters',
    shortLabel: 'Video & Likeness Rights',
    rightsMonitored: [
      '3D Facial Geometry Vector Mesh (128 Nodes)',
      'Podcast Voice Signature',
      'Video Stream C2PA Provenance'
    ],
    primaryMonetization: 'Deepfake Face-Swap Licensing & Short-Form Rev-Share',
    monetizationDescription: 'Detects unauthorized re-uploads across TikTok, YouTube Shorts, and Instagram Reels. Monetizes brand ad sponsorships and AI face swaps automatically.',
    defaultAiRate: 0.10,
    defaultLicenseRate: 500.00,
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    iconName: 'Camera',
    recommendedPolicy: 'micro_monetization'
  },
  'Authors & Literary Writers': {
    id: 'literary',
    name: 'Authors & Literary Writers',
    shortLabel: 'Literary & Text Rights',
    rightsMonitored: [
      'Semantic Text Vector Embeddings',
      'Book Manuscript Copyright Hashes',
      'LLM Training Scraping Protections'
    ],
    primaryMonetization: 'LLM Token Training Micro-Royalties & Derivative Licensing',
    monetizationDescription: 'Protects articles, books, and creative writing against unauthorized LLM dataset ingestion. Charges AI developers per 1,000 tokens scraped.',
    defaultAiRate: 0.05,
    defaultLicenseRate: 500.00,
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
    iconName: 'FileText',
    recommendedPolicy: 'micro_monetization'
  },
  'Commercial Brands & Agencies': {
    id: 'businesses',
    name: 'Commercial Brands & Agencies',
    shortLabel: 'Brand & Corporate License Buyer',
    rightsMonitored: [
      'Corporate Mascot Likeness',
      'Commercial Brand Audio Logos',
      'Registered Trademark Vector Hashes'
    ],
    primaryMonetization: 'Commercial License Clearinghouse & Rights Acquisition',
    monetizationDescription: 'Allows commercial brands, ad agencies, and AI developers to search verified creator vaults, license likeness & music, and download C2PA legal clearances.',
    defaultAiRate: 0.25,
    defaultLicenseRate: 1200.00,
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    iconName: 'Briefcase',
    recommendedPolicy: 'strict_privacy'
  }
};

export const getDisciplineStrategy = (disciplineName: string): DisciplineStrategy => {
  return DISCIPLINE_STRATEGIES[disciplineName] || DISCIPLINE_STRATEGIES['Musicians & Composers'];
};
