export type PolicyMode = 'strict_privacy' | 'micro_monetization';

export interface FaceGeometryVector {
  id: string;
  landmarksCount: number;
  hashVector: string; // e.g., 512-dim vector hash
  confidenceScore: number;
  sampleImageUrl: string;
  createdAt: string;
}

export interface VoiceAcousticPrint {
  id: string;
  frequencyRange: string;
  spectralSignature: string;
  sampleAudioUrl: string;
  createdAt: string;
}

export interface DigitalTwin {
  userId: string;
  userName: string;
  handle: string;
  faceVector?: FaceGeometryVector;
  voicePrint?: VoiceAcousticPrint;
  policyMode: PolicyMode;
  aiFetchRate: number; // e.g., $0.05 per AI model query
  adLicenseRate: number; // e.g., $150 per ad campaign
}

export interface ProtectedAsset {
  id: string;
  title: string;
  mediaType: 'video' | 'audio' | 'image';
  originalUrl: string;
  thumbnailUrl: string;
  pHash: string;
  stegPayload: string;
  c2paSignature: string;
  duration?: string;
  platform: 'YouTube' | 'TikTok' | 'Instagram' | 'Upload';
  createdAt: string;
  matchesCount: number;
}

export type MatchCategory = 'organic_reupload' | 'brand_commercial' | 'ai_training_scraping' | 'deepfake_clone';
export type MatchStatus = 'flagged' | 'settlement_sent' | 'licensed' | 'dmca_issued' | 'resolved';

export interface DetectionMatch {
  id: string;
  assetId?: string;
  assetTitle: string;
  assetType: 'video' | 'audio' | 'image' | 'biometric_face' | 'biometric_voice' | 'text' | 'manuscript' | 'artwork' | 'podcast';
  targetPlatform: 'YouTube Shorts' | 'Instagram Reels' | 'TikTok' | 'X' | 'Common Crawl AI' | 'E-Commerce / Amazon';
  infringingUrl: string;
  uploaderName: string;
  visualSimilarity: number; // 0-100%
  audioSimilarity: number; // 0-100%
  matchCategory: MatchCategory;
  viewCount: number;
  estimatedLostRevenue: number;
  detectedAt: string;
  status: MatchStatus;
  timestampStart: string;
  timestampEnd: string;
}

export interface SettlementClaim {
  id: string;
  matchId: string;
  infringingUrl: string;
  targetPlatform: string;
  uploaderName: string;
  matchCategory: MatchCategory;
  retroactiveFee: number;
  suggestedAction: 'pay_license' | 'voluntary_remove' | 'dmca';
  gracePeriodHoursRemaining: number;
  claimUrl: string;
  status: 'pending' | 'paid' | 'voluntary_removal_requested' | 'dmca_triggered';
  createdAt: string;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  source: string;
  type: 'micro_license' | 'settlement_fee' | 'ad_revenue_claim';
  grossAmount: number;
  platformFee: number;
  netPayout: number;
  status: 'completed' | 'processing' | 'pending';
}
