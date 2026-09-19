import { DigitalTwin, ProtectedAsset, DetectionMatch, SettlementClaim, FinancialTransaction, CustomerReview, PricingPlan, TrialConfig } from '../types';

export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan_basic',
    name: 'Basic',
    price: 15,
    period: '/ month',
    popular: false,
    features: [
      '1 Biometric Voice & Likeness Profile',
      'Web Scrape Detection (YouTube/TikTok)',
      'C2PA Watermark Signing',
      'Email Support'
    ],
    buttonText: 'Choose plan'
  },
  {
    id: 'plan_startup',
    name: 'Startup',
    price: 30,
    period: '/ month',
    popular: false,
    features: [
      '3 Active Discipline Profiles',
      'Automated DMCA Legal Notice Studio',
      'Stripe Commercial Licensing Gate',
      'Custom Policy Toggles'
    ],
    buttonText: 'Choose plan'
  },
  {
    id: 'plan_pro',
    name: 'Professional',
    price: 75,
    period: '/ month',
    popular: true,
    popularBadgeText: 'Most Popular',
    features: [
      'All 6 Creative Discipline Modules',
      'Polygon L2 On-Chain Provenance',
      'Enterprise Social API Keys',
      '24/7 Priority Support'
    ],
    buttonText: 'Choose plan'
  },
  {
    id: 'plan_business',
    name: 'Business',
    price: 100,
    period: '/ month',
    popular: false,
    features: [
      'Unlimited Brand IP Vaults',
      'Custom API Webhooks',
      'Dedicated Legal Counsel Sync',
      'Bulk DMCA Court Filings'
    ],
    buttonText: 'Choose plan'
  }
];

export const INITIAL_TRIAL_CONFIG: TrialConfig = {
  topBadge: 'No credit card required',
  title: 'Plans & Pricing',
  subtitle: 'No risk, 30-day money back guarantee!',
  trialDurationDays: 30,
  requireCreditCard: false,
  customPlanText: 'Need a Customized Plan? Please contact us.'
};

export const INITIAL_TESTIMONIALS: CustomerReview[] = [
  {
    id: 'rev_1',
    quote: "Authr revolutionized how we manage creator licensing and biometric identity protection. The automated legal notices and instant settlement checkout gates work flawlessly.",
    author: "Alex Rivera",
    title: "Independent Recording Artist & Producer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'rev_2',
    quote: "The C2PA cryptographic watermarking and web scrape radar saved our studio over $140,000 in stolen voice actor and artwork royalties within the first 60 days.",
    author: "Sarah Conner",
    title: "Voice Actor & Podcast Host",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'rev_3',
    quote: "Integrating BIPA biometric verification and Stripe Connect payouts gave our commercial brand agency complete legal standing across 54 global markets.",
    author: "Marcus Vance",
    title: "Creative Brand & IP Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'rev_4',
    quote: "Authr's Web Scrape Radar detected 12 unauthorized AI training sets using my portfolio within hours. The automated DMCA notices pulled them down immediately.",
    author: "Elena Rostova",
    title: "Digital Illustrator & Concept Artist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 'rev_5',
    quote: "The C2PA cryptographic provenance standard integrated into Authr gives our enterprise model training data full legal verification and automated royalty routing.",
    author: "David Chen",
    title: "Software Architect & AI Researcher",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  }
];

export const INITIAL_DIGITAL_TWIN: DigitalTwin = {
  userId: 'usr_892314',
  userName: 'Alex Rivera',
  handle: '@arivera_official',
  policyMode: 'micro_monetization',
  aiFetchRate: 0.08,
  adLicenseRate: 250,
  faceVector: {
    id: 'fvec_9021',
    landmarksCount: 128,
    hashVector: '0x9F4A881C2B01E37A5D...E912B',
    confidenceScore: 99.4,
    sampleImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-07-15T10:30:00Z'
  },
  voicePrint: {
    id: 'vprt_4410',
    frequencyRange: '85Hz - 3.4kHz (HD Spectral)',
    spectralSignature: 'SIG_009182_AUDIO_VECTOR_V4',
    sampleAudioUrl: 'voice_sample_master.wav',
    createdAt: '2026-07-15T10:35:00Z'
  }
};

export const INITIAL_PROTECTED_ASSETS: ProtectedAsset[] = [
  {
    id: 'ast_101',
    title: 'The Future of Autonomous AI Agents - Deep Dive Breakdown',
    mediaType: 'video',
    originalUrl: 'https://youtube.com/watch?v=demo_asset_101',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    pHash: 'b9e4a3f120c8d76e',
    stegPayload: 'AUTHR-C2PA-USR892314-AST101-WATERMARK-OK',
    c2paSignature: 'SHA256:8f920a1bc391d84e...01c4',
    duration: '14:22',
    platform: 'YouTube',
    createdAt: '2026-08-01T14:20:00Z',
    matchesCount: 4
  },
  {
    id: 'ast_102',
    title: '5 Productivity Hacks Every Creator Needs in 2026',
    mediaType: 'video',
    originalUrl: 'https://tiktok.com/@arivera/video/781920',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    pHash: 'c4f2e8d910a7b531',
    stegPayload: 'AUTHR-C2PA-USR892314-AST102-WATERMARK-OK',
    c2paSignature: 'SHA256:7a419c82b104d92e...99e1',
    duration: '0:58',
    platform: 'TikTok',
    createdAt: '2026-08-03T09:15:00Z',
    matchesCount: 2
  },
  {
    id: 'ast_103',
    title: 'Podcast Keynote: Building Digital Assets with Independent Identity',
    mediaType: 'audio',
    originalUrl: 'https://spotify.com/episode/9018234',
    thumbnailUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80',
    pHash: 'a1b2c3d4e5f60718',
    stegPayload: 'AUTHR-AUDIO-SPECTRAL-USR892314-AST103',
    c2paSignature: 'SHA256:3d91048e21a003f9...44a8',
    duration: '42:10',
    platform: 'Upload',
    createdAt: '2026-08-05T18:40:00Z',
    matchesCount: 3
  }
];

export const INITIAL_DETECTION_MATCHES: DetectionMatch[] = [
  {
    id: 'mtc_901',
    assetId: 'ast_101',
    assetTitle: 'The Future of Autonomous AI Agents',
    assetType: 'video',
    targetPlatform: 'Instagram Reels',
    infringingUrl: 'https://instagram.com/reels/C89x0192A',
    uploaderName: '@tech_dropship_daily',
    visualSimilarity: 96.4,
    audioSimilarity: 98.2,
    matchCategory: 'brand_commercial',
    viewCount: 142000,
    estimatedLostRevenue: 450.00,
    detectedAt: '2026-08-08T11:20:00Z',
    status: 'settlement_sent',
    timestampStart: '01:12',
    timestampEnd: '03:45'
  },
  {
    id: 'mtc_902',
    assetId: 'ast_102',
    assetTitle: '5 Productivity Hacks Every Creator Needs',
    assetType: 'video',
    targetPlatform: 'YouTube Shorts',
    infringingUrl: 'https://youtube.com/shorts/30192Aa-X',
    uploaderName: 'MotivationClips_Vault',
    visualSimilarity: 91.8,
    audioSimilarity: 89.0,
    matchCategory: 'organic_reupload',
    viewCount: 88500,
    estimatedLostRevenue: 125.00,
    detectedAt: '2026-08-08T09:45:00Z',
    status: 'flagged',
    timestampStart: '00:05',
    timestampEnd: '00:52'
  },
  {
    id: 'mtc_903',
    assetTitle: 'Facial Geometry & Biometric Scan',
    assetType: 'biometric_face',
    targetPlatform: 'E-Commerce / Amazon',
    infringingUrl: 'https://amazon.com/dp/B09X10928_storefront',
    uploaderName: 'GlobalFashionVendor_99',
    visualSimilarity: 94.1,
    audioSimilarity: 0,
    matchCategory: 'brand_commercial',
    viewCount: 52000,
    estimatedLostRevenue: 750.00,
    detectedAt: '2026-08-07T16:10:00Z',
    status: 'settlement_sent',
    timestampStart: '00:00',
    timestampEnd: '00:00'
  },
  {
    id: 'mtc_904',
    assetTitle: 'Voice Acoustic Clone Dataset',
    assetType: 'biometric_voice',
    targetPlatform: 'Common Crawl AI',
    infringingUrl: 'https://huggingface.co/datasets/unauthorized_voice_clones_v2',
    uploaderName: 'SyntheticVoices_Lab',
    visualSimilarity: 0,
    audioSimilarity: 97.9,
    matchCategory: 'ai_training_scraping',
    viewCount: 3100,
    estimatedLostRevenue: 280.00,
    detectedAt: '2026-08-06T12:00:00Z',
    status: 'licensed',
    timestampStart: '00:00',
    timestampEnd: '12:40'
  },
  {
    id: 'mtc_905',
    assetId: 'ast_101',
    assetTitle: 'The Future of Autonomous AI Agents',
    assetType: 'video',
    targetPlatform: 'TikTok',
    infringingUrl: 'https://tiktok.com/@ai_repost_hub/video/892019',
    uploaderName: '@ai_repost_hub',
    visualSimilarity: 88.5,
    audioSimilarity: 92.1,
    matchCategory: 'organic_reupload',
    viewCount: 21500,
    estimatedLostRevenue: 45.00,
    detectedAt: '2026-08-05T20:30:00Z',
    status: 'dmca_issued',
    timestampStart: '05:10',
    timestampEnd: '06:00'
  }
];

export const INITIAL_SETTLEMENT_CLAIMS: SettlementClaim[] = [
  {
    id: 'clm_401',
    matchId: 'mtc_901',
    infringingUrl: 'https://instagram.com/reels/C89x0192A',
    targetPlatform: 'Instagram Reels',
    uploaderName: '@tech_dropship_daily',
    matchCategory: 'brand_commercial',
    retroactiveFee: 450.00,
    suggestedAction: 'pay_license',
    gracePeriodHoursRemaining: 31,
    claimUrl: 'https://claim.authr.id/c89x0192a',
    status: 'pending',
    createdAt: '2026-08-08T11:30:00Z'
  },
  {
    id: 'clm_402',
    matchId: 'mtc_903',
    infringingUrl: 'https://amazon.com/dp/B09X10928_storefront',
    targetPlatform: 'E-Commerce / Amazon',
    uploaderName: 'GlobalFashionVendor_99',
    matchCategory: 'brand_commercial',
    retroactiveFee: 750.00,
    suggestedAction: 'pay_license',
    gracePeriodHoursRemaining: 14,
    claimUrl: 'https://claim.authr.id/amazon-b09x10928',
    status: 'pending',
    createdAt: '2026-08-07T16:30:00Z'
  },
  {
    id: 'clm_403',
    matchId: 'mtc_904',
    infringingUrl: 'https://huggingface.co/datasets/unauthorized_voice_clones_v2',
    targetPlatform: 'Common Crawl AI',
    uploaderName: 'SyntheticVoices_Lab',
    matchCategory: 'ai_training_scraping',
    retroactiveFee: 280.00,
    suggestedAction: 'pay_license',
    gracePeriodHoursRemaining: 0,
    claimUrl: 'https://claim.authr.id/hf-voice-clone-2',
    status: 'paid',
    createdAt: '2026-08-06T13:00:00Z'
  }
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'txn_1001',
    date: '2026-08-07T14:22:00Z',
    source: 'SyntheticVoices_Lab (Common Crawl AI License)',
    type: 'micro_license',
    grossAmount: 280.00,
    platformFee: 42.00,
    netPayout: 238.00,
    status: 'completed'
  },
  {
    id: 'txn_1002',
    date: '2026-08-04T18:10:00Z',
    source: 'YouTube Content ID Ad Revenue Claim (#ast_101)',
    type: 'ad_revenue_claim',
    grossAmount: 310.50,
    platformFee: 46.58,
    netPayout: 263.92,
    status: 'completed'
  },
  {
    id: 'txn_1003',
    date: '2026-07-29T11:05:00Z',
    source: 'Nexus Media Corp (Retroactive Ad Settlement)',
    type: 'settlement_fee',
    grossAmount: 1200.00,
    platformFee: 180.00,
    netPayout: 1020.00,
    status: 'completed'
  }
];
