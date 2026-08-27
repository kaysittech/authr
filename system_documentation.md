# 📖 Authr - End-to-End System Documentation & Technical Specification

**Version:** 2.4.0-PROD  
**Platform Architecture:** Dual-Domain Portal (`app.authr.id` & `admin.authr.id`)  
**Backend:** FastAPI / Python 3.11 + Uvicorn + PostgreSQL + Faiss Vector Engine  
**Frontend:** React 18 + TypeScript + Vite + Tailwind CSS  

---

## 1. System Overview & Value Proposition

**Authr** is an enterprise-grade independent creator rights management, biometric protection, and automated royalty clearinghouse network. As AI generative models (voice synthesis, deepfake video face-swaps, diffusion image models, and LLM text scrapers) rapidly proliferate, creators and public figures face unprecedented unauthorized exploitation of their biometric identity and intellectual property.

Authr bridges the gap between individual creators, commercial brands, and AI developers by establishing an immutable **Sovereign Likeness & IP Vault**. The platform operates on two core pillars:

1. **Biometric & IP Vault Protection**: High-fidelity 3D facial vector geometry (128 landmark nodes), HD spectral acoustic voice prints (85Hz - 3.4kHz), perceptual image hashes (pHash), and semantic text vector embeddings.
2. **Automated Licensing & Legal Clearinghouse**: Dual-mode policy engines supporting either **Automated DMCA/BIPA Legal Takedowns** or **Micro-Royalty Monetization** with live platform commission settlement (15% platform take-rate).

---

## 2. Dual-Portal Domain Architecture

To optimize performance, enforce strict security boundaries, and maintain role isolation, Authr is deployed as a **Dual-Portal System**:

```
                              ┌────────────────────────┐
                              │  Authr Domain Router   │
                              └───────────┬────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌────────────────────────┐                      ┌────────────────────────┐
     │      app.authr.id      │                      │     admin.authr.id     │
     │  Creator Rights Vault  │                      │   Superuser Admin Ops  │
     └────────────────────────┘                      └────────────────────────┘
```

### 2.1 Creator Rights Vault (`app.authr.id`)
- **Target Audience**: Independent Creators, Artists, Musicians, Podcasters, Authors, Actors, Models, and Commercial License Buyers.
- **Key Features**: Overview & Royalties, Biometric Likeness & Voice Registry, Art & Asset Vault, Web Scrape Monitor, Licensing Gate, DMCA & Legal Notices, Royalty Ledger.
- **Security Scoping**: Stripped of all admin bundle code to maintain sub-second LCP load times and eliminate reverse-engineering risks.

### 2.2 Superuser Admin Operations Center (`admin.authr.id`)
- **Target Audience**: Authr Clearinghouse Operations Managers & Compliance Officers.
- **Security Features**: Restricted network access, Cloudflare Access/VPN IP whitelisting, WebAuthn/YubiKey Hardware Key 2FA, SSL TLS 1.3 encryption.
- **Key Workstations**: Platform Revenue & Commission Rate Suite, Creator Vault & KYC Inspector, Infringement Queue & Force DMCA Dispatch, Crawler Swarm Node Manager, BIPA Security Audit Feed.

---

## 3. User Roles, Personas & Registration Workflows

Authr enforces explicit role segregation between sellers (creators), buyers (commercial brands), and system operators (admins).

```
                             ┌────────────────────────┐
                             │   Authr Registration   │
                             └───────────┬────────────┘
                                         │
             ┌───────────────────────────┼───────────────────────────┐
             ▼                           ▼                           ▼
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│  Independent Creator   │  │   Commercial Brand     │  │     Superuser Ops      │
│  (Seller / Vault Owner)│  │   (Buyer / Licensee)   │  │    (System Admin)      │
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

### 3.1 Independent Creator / Rightsholder (Sellers)
- **Primary Function**: Registers biometric face and voice assets, uploads protected media, configures custom licensing rates ($/query, $/ad), receives royalty payouts, and enforces legal takedown notices against unauthorized scrapers.
- **Registration Process**:
  1. Select primary discipline profile (`Likeness & Voice`, `Musicians`, `Visual Artists`, `Video Creators`, or `Authors`).
  2. Enter full legal name and sovereign `@handle`.
  3. **Mandatory 2-Step KYC Verification**: Upload Government ID (Driver's License or Passport) + Take Live Selfie Photo (analyzing 128 facial landmarks for 99%+ OCR match score).

### 3.2 Commercial Brands, Agencies & AI Labs (Buyers / Licensees)
- **Primary Function**: **Does NOT register biometric assets.** Commercial brands, ad agencies, and AI developers sign up to search verified creator vaults, request commercial ad placements, purchase authorized AI training query rights, pay license invoices, and download **C2PA Copyright Clearance Certificates**.
- **Key Differentiator**: Brands act purely as licensees, clearing legal rights before launching public ad campaigns or training generative models.

### 3.3 Superuser Clearinghouse Operations Admin
- **Primary Function**: Manages global app commission rates (15% default take-rate), reviews creator KYC document inspects, dispatches forced DMCA takedowns, monitors 1,420 crawler nodes, and audits BIPA compliance logs.

---

## 4. The 5 Creative Discipline & Biometric Protection Modules

Authr tailors its vector detection engines, legal notices, and default floor pricing according to **5 distinct discipline modules**:

| Creative Discipline | Rights & Vector Features Monitored | Primary Monetization Strategy | Default AI Scrape Rate | Default Commercial Ad Rate |
| :--- | :--- | :--- | :--- | :--- |
| **🎭 Likeness & Voice Protection** *(Actors, Models & Public Figures)* | 3D Facial Geometry Vector Mesh (128 Nodes), Spectral Voice Print (85Hz - 3.4kHz), BIPA & C2PA Hashes | Biometric Voice & Deepfake Face-Swap Licensing | **$0.12** / query | **$450.00** / ad |
| **🎵 Musicians & Composers** *(Audio Stems & Masters)* | Spectral Voice Print, Audio Master Stems, Composition Musical Copyrights | Voice Licensing & Mechanical Sync Royalties | **$0.08** / query | **$250.00** / ad |
| **🎨 Visual & Fine Artists** *(Digital Art & Provenance)* | Perceptual Image Hash (pHash), Invisible Steganographic Watermarks, AI Diffusion Sets | AI Diffusion Model Scrape Licensing & Print Royalties | **$0.15** / query | **$350.00** / campaign |
| **🎬 Video Creators & Podcasters** *(Face Mesh & Video)* | 3D Facial Geometry Mesh, Podcast Voice Signature, Video Stream C2PA Provenance | Deepfake Face-Swap Licensing & Short-Form Rev-Share | **$0.10** / query | **$500.00** / video |
| **✍️ Authors & Literary Writers** *(Text & Manuscripts)* | Semantic Text Vector Embeddings, Manuscript Hashes, LLM Training Scraping Protections | LLM Token Training Micro-Royalties & Derivative Licensing | **$0.05** / 1k tokens | **$500.00** / license |

---

## 5. Biometric Vault & Identity Verification Engine

Authr implements browser-native, hardware-assisted biometric capture tools to guarantee proof of liveness and legal compliance under Illinois BIPA (740 ILCS 14/).

```
                 ┌────────────────────────────────────────────────┐
                 │       Biometric Vault Capture Pipeline        │
                 └───────────────────────┬────────────────────────┘
                                         │
     ┌───────────────────────────────────┼───────────────────────────────────┐
     ▼                                   ▼                                   ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│ WebCam 3D Face Scanner  │ │ Live In-App Voice Studio│ │ Government ID + Selfie  │
│  (128 Landmark Nodes)   │ │ (Acoustic Liveness)     │ │ (KYC Token Issuance)    │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

### 5.1 Real Webcam 3D Face Geometry Scanner
- **Technology**: Utilizes `navigator.mediaDevices.getUserMedia` to access the creator's live webcam.
- **Biometric Extraction**: Extracts 128 3D facial landmark nodes (jawline contour, inter-pupillary distance, nasal bridge slope, lip boundary geometry).
- **Cryptographic Hash**: Hashes geometry into an immutable 64-character hex vector (`0x9F4A881C2B01E37A5D...E912B`) with a 99.4% confidence score.

### 5.2 Live In-App Voice Recording Studio & Acoustic Liveness Capture
- **Proof-of-Liveness Requirement**: To prevent spoofing with pre-recorded audio files, creators must record their voice live within the app.
- **Liveness Prompt**: Creators recite the statutory liveness phrase:
  > *"My voice is my independent property. I register this acoustic spectral vector on Authr."*
- **Real-Time Visualizer**: Animated equalizer visualizer tracks acoustic frequency spectrum (85Hz - 3.4kHz).
- **Spectral Hash Generation**: Generates an immutable acoustic signature hash (`SIG_009182_AUDIO_VECTOR_V5`).

### 5.3 Mandatory Government ID OCR & Biometric Match Scoring (BIPA/KYC)
- **ID OCR Engine**: Parses Driver's Licenses, Passports, and National ID Cards to extract legal name, date of birth, document ID, and state authority.
- **Biometric Comparison**: Performs 1-to-1 facial comparison between the ID photo and the live selfie, generating a match score (e.g. 98.7%).
- **KYC Token**: Issues a cryptographically signed KYC Token (`KYC_VERIFIED_IL_90218`) required to activate creator vaults.

---

## 6. Dual Enforcement & Policy Engine

Creators maintain total sovereignty over their IP through two enforcement policy modes:

```
                            ┌───────────────────────────┐
                            │   Creator Policy Engine   │
                            └─────────────┬─────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌───────────────────────────┐                   ┌───────────────────────────┐
     │   🛡️ Strict Privacy Mode   │                   │  💰 Royalty Licensing Mode│
     │  Zero Licensing Allowed   │                   │   Micro-Monetization Active│
     │  Automated DMCA & BIPA C&D│                   │   Custom Rates ($/query)  │
     └───────────────────────────┘                   └───────────────────────────┘
```

### 6.1 🛡️ Strict Privacy Mode
- **Objective**: Complete privacy protection. Zero commercial licensing or AI model training permitted.
- **Automated Enforcement**: Any web scrape, AI clone, or video re-upload triggers an immediate statutory DMCA Section 512(c) Takedown Demand and Illinois BIPA Cease & Desist Notice to hosting providers.

### 6.2 💰 Royalty Licensing Mode
- **Objective**: Commercial monetization. Allows AI labs and commercial brands to license creator assets.
- **Rate Controls**: Creators independently configure:
  - **AI Fetch / Scrape Rate**: Fee charged per AI model query / training sample (e.g. `$0.08` per voice query or `$0.05` per 1k text tokens).
  - **Commercial Ad Placement Rate**: Fee charged per ad campaign / sync license (e.g. `$250.00` - `$1,200.00`).

---

## 7. Crawler Swarms & AI Scraping Detection Network

Authr operates a **1,420-Node Global Distributed Swarm Network** scanning public web infrastructure 24/7 for unauthorized likeness and IP usage.

```
                          ┌──────────────────────────────┐
                          │ 1,420-Node Crawler Swarms   │
                          └──────────────┬───────────────┘
                                         │
         ┌───────────────┬───────────────┼───────────────┬───────────────┐
         ▼               ▼               ▼               ▼               ▼
   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
   │  YouTube  │   │  TikTok   │   │ Instagram │   │  Common   │   │AI Model   │
   │  Scrapes  │   │ Deepfakes │   │ Voice Stem│   │   Crawl   │   │ Generators│
   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
         └───────────────┴───────────────┼───────────────┴───────────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │   Faiss Vector Match Engine  │
                          │   Vector Distance < 0.15     │
                          └──────────────┬───────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
     ┌───────────────────────────┐               ┌───────────────────────────┐
     │ 🛡️ Enforce Legal Takedown │               │ 🧾 Issue Licensing Gate   │
     │  (DMCA Dispatch)          │               │  ($637.50 Settlement)     │
     └───────────────────────────┘               └───────────────────────────┘
```

### 7.1 Crawler Swarm Node Targets
1. **YouTube & Short-Form Video**: Monitors audio tracks and video frames for voice clones and face swaps.
2. **TikTok & Instagram Reels**: Monitors viral audio stems and facial vectors.
3. **Common Crawl & Web Scrapes**: Scrapes LLM training datasets and image diffusion dumps.
4. **Midjourney, ElevenLabs & OpenAI**: Cross-references synthetic voice and image outputs against registered vector hashes.

### 7.2 Detection Match Processing & Vector Confidence
- Matches are flagged when vector cosine distance drops below `0.15` (Confidence score `92%` - `99.8%`).
- Each match logs the infringing URL, IP address, platform source, detected vector hash, and estimated settlement value.

---

## 8. Creator Settlement Portal & Infringer Checkout Flow

When unauthorized usage is detected under Royalty Licensing Mode, Authr generates a **Public Infringer Settlement Gate**.

```
    ┌───────────────────────────┐
    │ Detection Match Flagged   │
    └─────────────┬─────────────┘
                  │
                  ▼
    ┌───────────────────────────┐
    │ Settlement Gate Generated │
    │ Invoice URL: /claim/clm_  │
    └─────────────┬─────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│ Copy Invoice  │   │ Preview Gate  │
│  URL Link     │   │ (Checkout UI) │
└───────────────┘   └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Sim Payment   │
                    │ ($637.50 Net) │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Credited to   │
                    │ Royalty Ledger│
                    └───────────────┘
```

### 8.1 Creator Invoice Inspector (`SettlementPortal.tsx`)
- **`[ Copy Link ]`**: Copies the public invoice URL (`https://authr.id/claim/clm_89201`) to send directly to infringers or legal counsel.
- **`[ Preview Gate ]`**: Displays the exact checkout interface seen by infringers.
- **`[ Simulate Payment ($637.50 Payout) ]`**: Simulates instant Stripe/Crypto payment clearing. The net payout is credited to the creator's Royalty Ledger while the 15% platform take-rate is routed to Authr treasury.

---

## 9. Superuser Admin Operations Center (`admin.authr.id`)

The Standalone Admin Site hosts **6 Specialized Operations Workstations**:

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      admin.authr.id Operations Center                  │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
     ┌───────────┬───────────┬───────┴───┬───────────┬───────────┐
     ▼           ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ 1. Platform││ 2. App  │ │ 3. KYC  │ │ 4. DMCA │ │ 5. Node │ │ 6. BIPA │
│  Overview││ Pricing │ │ Vault   │ │ Queue   │ │ Swarms  │ │ Audit   │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
```

### 9.1 Workstation 1: Platform Overview & System Ops
- Real-time network telemetry: Gross volume cleared ($1.24M), platform fees collected ($187k), active creator vaults (8,942), crawler latency (0.04ms). System controls for cache flushing and HSM key rotation.

### 9.2 Workstation 2: Discipline Rates & App Commission Suite
- **Global App Take-Rate**: Configurable platform commission fee (default **15.0%**).
- **Add-on Subscription Fees**: Single discipline add-on (**$29/mo**), All-Access Pass (**$79/mo**).
- **Statutory Grace Period**: Configurable grace period before automated DMCA dispatch (**48 Hours**).
- **Per-Discipline Floor Rates Matrix**: Custom floor rate limits across all 5 disciplines.
- **Live Revenue Split Calculator**: Real-time revenue split model calculations.

### 9.3 Workstation 3: Creator Vault & KYC Directory
- Searchable user database displaying biometric match scores, document types, and KYC status. Features **`[ Inspect ID Doc ]`** modal for Government ID OCR analysis and BIPA hash auditing.

### 9.4 Workstation 4: Infringement Clearinghouse Queue
- System-wide clearinghouse logging flagged scrapes, deepfakes, and voice clones, with **`[ Force DMCA ]`** dispatch controls.

### 9.5 Workstation 5: Crawler Swarms & Node Infrastructure
- Node controller monitoring YouTube, TikTok, Instagram, Common Crawl, and AI generator crawler clusters with swarm restart controls.

### 9.6 Workstation 6: BIPA & System Security Audit Log
- Immutable security event log tracking biometric verifications, C2PA signatures, BIPA C&D demands, and settlement fee collections.

---

## 10. Legal Compliance & Cryptographic Standards

1. **Illinois Biometric Information Privacy Act (BIPA 740 ILCS 14/)**:
   - Enforces written informed consent, biometric hashing (no raw biometric storage), and statutory cease & desist notices for unauthorized biometric extraction.
2. **DMCA Section 512(c) Safe Harbor Takedowns**:
   - Automated generation of formal DMCA takedown demands sent to ISP designated agents.
3. **C2PA Cryptographic Content Credentials**:
   - Signs registered digital assets with HSM-v2 cryptographic provenance manifests verifying ownership and licensing rights.

---

## 11. Technical Architecture & Data Schemas

### 11.1 Key Data Interfaces (`src/types.ts`)

```typescript
export interface DigitalTwin {
  userId: string;
  userName: string;
  handle: string;
  policyMode: 'micro_monetization' | 'strict_privacy';
  aiFetchRate: number;
  adLicenseRate: number;
  faceVector?: {
    id: string;
    landmarksCount: number;
    hashVector: string;
    confidenceScore: number;
    sampleImageUrl: string;
    createdAt: string;
  };
  voicePrint?: {
    id: string;
    frequencyRange: string;
    spectralSignature: string;
    sampleAudioUrl: string;
    createdAt: string;
  };
}

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  handle: string;
  discipline: string;
  avatarUrl: string;
  token: string;
  kycStatus: 'verified' | 'pending' | 'unverified';
  idDocumentType?: string;
  idMatchScore?: number;
  role: 'creator' | 'admin';
}
```

---

## 🧪 Verification & Build Specifications
- **Build Tooling**: Vite 5.4 + TypeScript 5.5 (`tsc && vite build`)
- **Compilation Speed**: ~980ms - 1.1s
- **Production Artifacts**: `dist/assets/index-D1sN3pB5.js` (353 kB), `dist/assets/index-DF8uYSDD.css` (39.8 kB)
- **Live Local Ports**: Frontend `http://localhost:3000` • FastAPI Backend `http://127.0.0.1:8000`
