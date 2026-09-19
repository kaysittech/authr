import { DigitalTwin, ProtectedAsset, DetectionMatch, SettlementClaim, FinancialTransaction, CustomerReview, PricingPlan, TrialConfig, UserAccount, HeroStatRow, ManagedPage, CareerOpenRole } from '../types';

export const INITIAL_HERO_STAT_ROWS: HeroStatRow[] = [
  {
    id: 'stat_1',
    label: 'Facial Geometry Vector',
    value: '128 Nodes Hashed',
    iconType: 'fingerprint'
  },
  {
    id: 'stat_2',
    label: 'Acoustic Voice Spectrum',
    value: '44.1kHz FFT Matched',
    iconType: 'radio'
  },
  {
    id: 'stat_3',
    label: 'Royalties Cleared',
    value: '$1,248,500.00',
    iconType: 'dollar'
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr_892314',
    email: 'alex@authr.id',
    fullName: 'Alex Rivera',
    handle: '@arivera_official',
    discipline: 'Musicians & Composers',
    role: 'creator',
    kycStatus: 'verified',
    accountStatus: 'active',
    idDocumentType: "Driver's License (IL-90218)",
    idMatchScore: 99.4,
    registeredAssetsCount: 5,
    totalEarnings: 1521.92,
    joinedDate: '2026-07-15',
    bipaHash: 'bipa_hash_0x892314_vocal_mesh'
  },
  {
    id: 'usr_902184',
    email: 'sarah.conner@authr.id',
    fullName: 'Sarah Conner',
    handle: '@sconner_art',
    discipline: 'Visual & Fine Artists',
    role: 'creator',
    kycStatus: 'verified',
    accountStatus: 'active',
    idDocumentType: 'Passport (US-88102)',
    idMatchScore: 98.7,
    registeredAssetsCount: 12,
    totalEarnings: 3420.00,
    joinedDate: '2026-07-20',
    bipaHash: 'bipa_hash_0x902184_art_signature'
  },
  {
    id: 'usr_441092',
    email: 'jane.doe@authr.id',
    fullName: 'Jane Doe',
    handle: '@janedoe_podcasts',
    discipline: 'Video Creators & Podcasters',
    role: 'creator',
    kycStatus: 'review_required',
    accountStatus: 'active',
    idDocumentType: 'State ID Card (NY-44019)',
    idMatchScore: 88.2,
    registeredAssetsCount: 3,
    totalEarnings: 450.00,
    joinedDate: '2026-08-01',
    bipaHash: 'bipa_hash_0x441092_voice_print'
  },
  {
    id: 'usr_119284',
    email: 'licensing@brandcorp.com',
    fullName: 'BrandCorp Media Agency',
    handle: '@brandcorp_hq',
    discipline: 'Commercial Brands & Agencies',
    role: 'agency',
    kycStatus: 'verified',
    accountStatus: 'active',
    idDocumentType: 'Articles of Incorporation (DE-0012)',
    idMatchScore: 99.9,
    registeredAssetsCount: 28,
    totalEarnings: 14850.00,
    joinedDate: '2026-06-10',
    bipaHash: 'bipa_hash_0x119284_corporate_vault'
  }
];

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

export const INITIAL_MANAGED_PAGES: ManagedPage[] = [
  {
    id: 'home_landing',
    title: 'Home Landing Page - Hero & Rights Protection',
    category: 'HOME & LANDING',
    badge: 'Home Navigation Menu',
    summary: 'Main homepage hero banner, value propositions, rightsholder protections, and interactive workflow demo.',
    actionButtonText: 'Protect Your Work & Claim Royalties',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Hero Banner Headline',
        content: 'Protect Your Work. Claim Your Royalties. Automated identity, voice, face, text manuscript, and digital artwork clearinghouse.'
      },
      {
        id: 'sec_2',
        title: 'Monetization Strategy',
        content: 'Empower creators with instant Illinois BIPA statutory protection or commercial micro-licensing ($0.08/query, $250/ad).'
      },
      {
        id: 'sec_3',
        title: 'Automated Detection & Settlement',
        content: 'Real-time crawler swarms monitoring 1,420 nodes across YouTube, TikTok, Meta, and AI model datasets.'
      }
    ]
  },
  {
    id: 'biometrics',
    title: 'Biometric & Likeness Vault',
    category: 'FEATURES MENU',
    badge: 'Features Navigation Menu',
    summary: '128-node face & voice prints under Illinois BIPA statutory standards (740 ILCS 14/).',
    actionButtonText: 'Register Biometrics',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Non-Reversible Vector Hashing',
        content: 'Raw facial scans are instantly converted into 128-node mathematical vectors (fvec_...), ensuring raw imagery is never stored on servers.'
      },
      {
        id: 'sec_2',
        title: 'Spectral Voice Fingerprinting',
        content: 'Extracts 44.1kHz FFT acoustic harmonics to identify unauthorized synthetic voice clones and AI deepfakes.'
      }
    ]
  },
  {
    id: 'assets',
    title: 'C2PA Watermarking & Provenance Vault',
    category: 'FEATURES MENU',
    badge: 'Features Navigation Menu',
    summary: 'SHA-256 cryptographic provenance signatures and invisible steganographic watermarks.',
    actionButtonText: 'Protect Media Assets',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Tamper-Evident C2PA Manifests',
        content: 'Attaches cryptographically signed metadata directly into media header files, preserving proof of origin.'
      },
      {
        id: 'sec_2',
        title: 'Steganographic Watermarking',
        content: 'Invisible pixel and audio payload embeds that survive compression, re-encoding, and cropping.'
      }
    ]
  },
  {
    id: 'detection',
    title: 'Web Scrape Radar & AI Monitor',
    category: 'FEATURES MENU',
    badge: 'Features Navigation Menu',
    summary: 'YouTube, TikTok & Meta monitoring with sub-second perceptual hashing.',
    actionButtonText: 'Launch Radar Monitor',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Distributed Honeypot Crawlers',
        content: 'Scans public social feeds and AI dataset dumps 24/7 for matching biometric vector signatures and asset hashes.'
      },
      {
        id: 'sec_2',
        title: 'Visual & Acoustic Match Scoring',
        content: 'Provides precision similarity percentages (e.g. 98.7% match) and timestamp logs for instant evidence preservation.'
      }
    ]
  },
  {
    id: 'legal',
    title: 'DMCA Notice Studio & Legal Filings',
    category: 'FEATURES MENU',
    badge: 'Features Navigation Menu',
    summary: '17 U.S.C. § 512 legal filings and statutory takedown demands with automated designated agent representation.',
    actionButtonText: 'Open Takedown Studio',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Automated Takedown Generation',
        content: 'Drafts 17 U.S.C. § 512(c) compliant notices formatted for YouTube, TikTok, Meta, and web host ISPs.'
      },
      {
        id: 'sec_2',
        title: 'BIPA Enforcement Actions',
        content: 'Dispatches formal statutory violation notices under Illinois 740 ILCS 14/ for unauthorized biometric scraping.'
      }
    ]
  },
  {
    id: 'settlement',
    title: 'Stripe Licensing Gate & Settlement',
    category: 'FEATURES MENU',
    badge: 'Features Navigation Menu',
    summary: 'Automated settlement invoicing and direct Stripe Connect payout gates.',
    actionButtonText: 'View Settlement Portal',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Automated Demand Invoicing',
        content: 'Dispatches 48-hour grace period invoices to unauthorized scrapers and commercial re-uploaders.'
      },
      {
        id: 'sec_2',
        title: 'Direct Bank Settlement',
        content: '92% of collected royalties are deposited directly into creator Stripe accounts, retaining an 8% network fee.'
      }
    ]
  },
  {
    id: 'provenance',
    title: 'Polygon L2 Provenance & On-Chain Ledger',
    category: 'FEATURES MENU',
    badge: 'Features Navigation Menu',
    summary: 'On-chain zero-knowledge royalty ledger and immutable creation timestamp proofs.',
    actionButtonText: 'Explore L2 Ledger',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Immutable Timestamping',
        content: 'Anchors asset SHA-256 manifests to Polygon mainnet for verifiable, court-admissible creation timestamps.'
      },
      {
        id: 'sec_2',
        title: 'Royalty Audit Trail',
        content: 'Transparent, decentralized record of all micro-licensing transactions and settlement fee distribution.'
      }
    ]
  },
  {
    id: 'pricing',
    title: 'Plans & Pricing Overview Page',
    category: 'PRICING MENU',
    badge: 'Pricing Navigation Menu',
    summary: 'Subscription plans, free trial details, and commercial take-rate configurations.',
    actionButtonText: 'View Pricing Tiers',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Creator Protection Tiers',
        content: 'Choose between Free Starter, Creator Pro, and Enterprise Rights Management plans with 14-day risk-free trials.'
      },
      {
        id: 'sec_2',
        title: 'Settlement Take-Rate',
        content: 'Authr retains a 8% network fee on recovered royalties, guaranteeing creators receive 92% of all settlements.'
      }
    ]
  },
  {
    id: 'blog',
    title: 'Blog & Creator Rights Insights Journal',
    category: 'BLOG MENU',
    badge: 'Blog Navigation Menu',
    summary: 'In-depth research, legal precedents, and technical guides on biometric likeness, C2PA standards, and AI scrape defense.',
    actionButtonText: 'Read Creator Insights',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Emerging BIPA Court Precedents',
        content: 'Analysis of landmark 740 ILCS 14/ biometric rulings and their application to AI voice cloning and facial synthesis.'
      },
      {
        id: 'sec_2',
        title: 'C2PA Manifest Technical Breakdown',
        content: 'How SHA-256 metadata signatures prevent unauthorized generative AI training and preserve origin chain of trust.'
      }
    ]
  },
  {
    id: 'about',
    title: 'About Authr Platform & Mission',
    category: 'ABOUT MENU',
    badge: 'About Navigation Menu',
    summary: 'Authr was founded to bridge the critical gap between rapid generative AI advancements and creator intellectual property enforcement.',
    actionButtonText: 'Create Your Free Account',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Statutory Defense',
        content: 'Anchored in Illinois BIPA biometrics law (740 ILCS 14/) and federal 17 U.S.C. § 512 statutory takedown mandates.'
      },
      {
        id: 'sec_2',
        title: 'Our Mission Statement',
        content: 'Every independent artist, musician, voice actor, writer, and brand deserves total sovereignty over their biometric identity and creative outputs.'
      }
    ]
  },
  {
    id: 'compliance',
    title: 'Statutory Compliance - BIPA & DMCA 17 U.S.C. § 512',
    category: 'ABOUT MENU',
    badge: 'About Navigation Menu',
    summary: 'Comprehensive legal documentation on Illinois BIPA 740 ILCS 14/ compliance and 17 U.S.C. § 512 designated agent representation.',
    actionButtonText: 'Review Legal Framework',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Illinois BIPA Section 15 Compliance',
        content: 'Guarantees raw facial imagery is never saved. Only non-reversible 128-node vector hashes are stored.'
      },
      {
        id: 'sec_2',
        title: 'Designated Agent Takedown Mandates',
        content: 'Statutory 17 U.S.C. § 512 notice-and-takedown dispatches to major search engines, social networks, and hosting ISPs.'
      }
    ]
  },
  {
    id: 'developers',
    title: 'Developer API & REST Telemetry',
    category: 'ABOUT MENU',
    badge: 'About Navigation Menu',
    summary: 'FastAPI REST Telemetry endpoints and client SDKs for real-time scrape telemetry and C2PA manifest verification.',
    actionButtonText: 'Explore API Docs',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'FastAPI Microservice Architecture',
        content: 'Sub-second API response times for biometric hashing, C2PA manifest verification, and scrape detection webhooks.'
      },
      {
        id: 'sec_2',
        title: 'SDK Integrations',
        content: 'TypeScript and Python SDK libraries available for seamless integration into digital asset production pipelines.'
      }
    ]
  },
  {
    id: 'counsel',
    title: 'Contact Counsel & 24/7 Legal Rights Support',
    category: 'ABOUT MENU',
    badge: 'About Navigation Menu',
    summary: 'Direct connection to IP litigation counsel for emergency BIPA cease-and-desist filings and court evidence dossiers.',
    actionButtonText: 'Contact Legal Team',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: '24/7 Rights Enforcement Support',
        content: 'Instant escalation to specialized biometric and copyright attorneys for high-value infringement cases.'
      },
      {
        id: 'sec_2',
        title: 'Court Evidence Dossier Generation',
        content: 'Export court-admissible PDF dossiers complete with SHA-256 asset hashes, timestamp logs, and infringer IP addresses.'
      }
    ]
  },
  {
    id: 'get_started',
    title: 'Get Started with Authr Onboarding',
    category: 'COMPANY & CAREERS',
    badge: 'Onboarding & Account',
    summary: 'Join the world\'s leading biometric identity, C2PA watermarking, and statutory royalty clearing platform for independent creators.',
    actionButtonText: 'Create Your Free Account',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: '1. Create Your Account',
        content: 'Register your creator identity in under 2 minutes with instant 128-landmark biometric facial mesh hashing.'
      },
      {
        id: 'sec_2',
        title: '2. Protect Your Media Assets',
        content: 'Upload audio, visual, and literary assets to attach tamper-evident C2PA cryptographic signatures.'
      }
    ]
  },
  {
    id: 'careers',
    title: 'Architect the Infrastructure for Creator Rights (Careers)',
    category: 'COMPANY & CAREERS',
    badge: 'Engineering & Legal Roles',
    summary: 'We are building the world\'s first biometric likeness registry, C2PA cryptographic watermarking engine, and settlement gates.',
    actionButtonText: 'Apply for Open Roles',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Senior Cryptography Engineer (C2PA & Rust)',
        content: 'Lead the development of our high-performance C2PA manifest embed engine and zero-knowledge timestamp proofs.'
      },
      {
        id: 'sec_2',
        title: 'Biometric & IP Litigation Counsel',
        content: 'Oversee statutory filings under Illinois BIPA (740 ILCS 14/) and federal 17 U.S.C. § 512 notice proceedings.'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy Policy & BIPA Biometric Disclosure',
    category: 'LEGAL & COMPLIANCE',
    badge: 'Legal Document',
    summary: 'Complete breakdown of data handling practices, Illinois BIPA Section 15 compliance, and biometric hash protection.',
    actionButtonText: 'Manage Security Vault',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Illinois BIPA Section 15 Compliance Notice',
        content: 'Authr converts facial landmarks into 128-node non-reversible mathematical vector hashes (fvec_...).'
      },
      {
        id: 'sec_2',
        title: 'Right to Erasure & Hash Revocation',
        content: 'Under GDPR Article 17 and CCPA, creators may permanently delete their biometric vector records at any time.'
      }
    ]
  },
  {
    id: 'terms',
    title: 'Terms of Service & Statutory Authorization',
    category: 'LEGAL & COMPLIANCE',
    badge: 'Legal Contract',
    summary: 'Agreement defining authorized designated agent status, settlement fee splits, and Polygon L2 ledger verification.',
    actionButtonText: 'Accept Terms & Continue',
    lastUpdated: '2026-09-19',
    sections: [
      {
        id: 'sec_1',
        title: 'Designated Agent Authorization',
        content: 'By registering assets or biometric vectors on Authr, you appoint Authr as your authorized designated agent under 17 U.S.C. § 512(c)(2).'
      },
      {
        id: 'sec_2',
        title: 'Royalty Settlement & Stripe Payouts',
        content: 'Settlement fees collected from unauthorized scrapers are processed via Stripe Connect. Authr routes 92% of statutory revenues to creators.'
      }
    ]
  }
];

export const INITIAL_CAREER_ROLES: CareerOpenRole[] = [
  {
    id: 'job_1',
    title: 'Senior Cryptography Engineer (C2PA & Rust)',
    dept: 'Security & Core Infrastructure',
    location: 'Remote (US / EU)',
    type: 'Full-Time',
    desc: 'Lead the development of our high-performance C2PA manifest embed engine and zero-knowledge timestamp proofs on Polygon L2.'
  },
  {
    id: 'job_2',
    title: 'Biometric & IP Litigation Counsel',
    dept: 'Legal & Regulatory Compliance',
    location: 'Chicago / Remote',
    type: 'Full-Time',
    desc: 'Oversee statutory filings under Illinois BIPA (740 ILCS 14/) and federal 17 U.S.C. § 512 notice-and-takedown court proceedings.'
  },
  {
    id: 'job_3',
    title: 'Computer Vision Lead (Web Scrape Radar)',
    dept: 'Machine Learning & Perception',
    location: 'Remote',
    type: 'Full-Time',
    desc: 'Train sub-second perceptual hashing networks and distributed honeypot crawlers across YouTube, TikTok, and Meta feeds.'
  },
  {
    id: 'job_4',
    title: 'Full-Stack SDK Architect (TypeScript & Python)',
    dept: 'Developer Experience',
    location: 'Remote',
    type: 'Full-Time',
    desc: 'Design zero-dependency client SDKs for voice actors, visual artists, and enterprise AI model training platforms.'
  }
];


