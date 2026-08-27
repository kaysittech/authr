import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LikenessRegistry } from './components/LikenessRegistry';
import { AssetProtection } from './components/AssetProtection';
import { DetectionNetwork } from './components/DetectionNetwork';
import { SettlementPortal } from './components/SettlementPortal';
import { LegalEnforcement } from './components/LegalEnforcement';
import { Financials } from './components/Financials';
import { AuthModal, UserSession } from './components/AuthModal';
import { PublicLanding } from './components/PublicLanding';
import { AuthGuard } from './components/AuthGuard';
import { AdminPanel } from './components/AdminPanel';
import { WebServicesDashboard } from './components/WebServicesDashboard';

import { 
  DigitalTwin, 
  ProtectedAsset, 
  DetectionMatch, 
  SettlementClaim, 
  FinancialTransaction, 
  PolicyMode 
} from './types';

import { 
  INITIAL_DIGITAL_TWIN, 
  INITIAL_PROTECTED_ASSETS, 
  INITIAL_DETECTION_MATCHES, 
  INITIAL_SETTLEMENT_CLAIMS, 
  INITIAL_TRANSACTIONS 
} from './services/mockData';

import { fetchAppState } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [policyMode, setPolicyMode] = useState<PolicyMode>('micro_monetization');

  // State Management
  const [digitalTwin, setDigitalTwin] = useState<DigitalTwin>(() => {
    const saved = localStorage.getItem('rg_digital_twin');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_DIGITAL_TWIN;
  });
  const [assets, setAssets] = useState<ProtectedAsset[]>(INITIAL_PROTECTED_ASSETS);
  const [matches, setMatches] = useState<DetectionMatch[]>(INITIAL_DETECTION_MATCHES);
  const [claims, setClaims] = useState<SettlementClaim[]>(INITIAL_SETTLEMENT_CLAIMS);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);

  // Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('rg_user_session');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });

  // Persist digitalTwin changes locally
  useEffect(() => {
    if (digitalTwin) {
      localStorage.setItem('rg_digital_twin', JSON.stringify(digitalTwin));
    }
  }, [digitalTwin]);

  // Sync state with FastAPI backend
  useEffect(() => {
    fetchAppState()
      .then((data: any) => {
        if (data.digitalTwin?.faceVector) {
          setDigitalTwin(data.digitalTwin);
        }
        if (data.assets?.length) setAssets(data.assets);
        if (data.matches?.length) setMatches(data.matches);
        if (data.claims?.length) setClaims(data.claims);
        if (data.transactions?.length) setTransactions(data.transactions);
      })
      .catch(() => {
        // Keeps initial state if offline
      });
  }, []);

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
    localStorage.removeItem('rg_logged_out');
    localStorage.setItem('rg_user_session', JSON.stringify(user));

    setDigitalTwin({
      userId: user.id,
      userName: user.fullName,
      handle: user.handle,
      policyMode: 'micro_monetization',
      aiFetchRate: 0.08,
      adLicenseRate: 250,
      faceVector: {
        id: `fvec_${user.id}`,
        landmarksCount: 128,
        hashVector: `0x${user.id.toUpperCase()}_VECTOR_HASH`,
        confidenceScore: user.idMatchScore || 98.7,
        sampleImageUrl: user.avatarUrl,
        createdAt: new Date().toISOString()
      },
      voicePrint: digitalTwin.voicePrint
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rg_user_session');
    localStorage.setItem('rg_logged_out', 'true');
  };

  const handleAddAsset = (newAsset: ProtectedAsset) => {
    setAssets([newAsset, ...assets]);
  };

  const handleClaimSettled = (claimId: string, grossAmount: number, netPayout: number) => {
    setClaims(claims.map(c => c.id === claimId ? { ...c, status: 'paid' } : c));
    const targetClaim = claims.find(c => c.id === claimId);
    if (targetClaim) {
      setMatches(matches.map(m => m.id === targetClaim.matchId ? { ...m, status: 'licensed' } : m));

      const newTxn: FinancialTransaction = {
        id: `txn_${Date.now() % 100000}`,
        date: new Date().toISOString(),
        source: `Settlement: ${targetClaim.uploaderName} (${targetClaim.targetPlatform})`,
        type: 'settlement_fee',
        grossAmount: grossAmount,
        platformFee: grossAmount - netPayout,
        netPayout: netPayout,
        status: 'completed'
      };
      setTransactions([newTxn, ...transactions]);
    }
  };

  const handleSimulateScan = () => {
    const newMatch: DetectionMatch = {
      id: `mtc_${Date.now() % 10000}`,
      assetTitle: 'Facial Geometry & Biometric Scan Match',
      assetType: 'biometric_face',
      targetPlatform: 'TikTok',
      infringingUrl: 'https://tiktok.com/@unauthorized_ai/video/99102',
      uploaderName: '@unauthorized_ai',
      visualSimilarity: 97.8,
      audioSimilarity: 0,
      matchCategory: 'brand_commercial',
      viewCount: 198000,
      estimatedLostRevenue: 600.00,
      detectedAt: new Date().toISOString(),
      status: 'settlement_sent',
      timestampStart: '00:00',
      timestampEnd: '00:00'
    };

    setMatches([newMatch, ...matches]);

    const newClaim: SettlementClaim = {
      id: `clm_${Date.now() % 10000}`,
      matchId: newMatch.id,
      infringingUrl: newMatch.infringingUrl,
      targetPlatform: newMatch.targetPlatform,
      uploaderName: newMatch.uploaderName,
      matchCategory: newMatch.matchCategory,
      retroactiveFee: 600.00,
      suggestedAction: 'pay_license',
      gracePeriodHoursRemaining: 48,
      claimUrl: `https://claim.authr.id/c${Date.now() % 10000}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setClaims([newClaim, ...claims]);
  };

  const handleSelectDiscipline = (newDiscipline: string) => {
    if (currentUser) {
      const updated = { ...currentUser, discipline: newDiscipline };
      setCurrentUser(updated);
      localStorage.setItem('rg_user_session', JSON.stringify(updated));
    }
  };

  const pendingClaimsCount = claims.filter(c => c.status === 'pending').length;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* Navigation Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        policyMode={policyMode}
        setPolicyMode={setPolicyMode}
        pendingClaimsCount={pendingClaimsCount}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onSelectDiscipline={handleSelectDiscipline}
        onOpenUpgradeModal={() => setActiveTab('dashboard')}
      />

      {/* Main Canvas View */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {/* PUBLIC UNAUTHENTICATED LANDING & AUTH GUARDS */}
        {!currentUser ? (
          <>
            {activeTab === 'dashboard' && (
              <PublicLanding
                onOpenRegister={() => setIsAuthModalOpen(true)}
                onOpenLogin={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'biometrics' && (
              <AuthGuard
                title="Biometric & Likeness Registry Locked"
                description="Sign in with your verified Government ID to access your 128-landmark facial mesh vectors and spectral voice prints."
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'assets' && (
              <AuthGuard
                title="Art & Asset Vault Protected"
                description="Sign in to register original media works, embed C2PA cryptographic signatures, and generate steganographic watermarks."
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'detection' && (
              <AuthGuard
                title="Web Scrape Monitor Access Restricted"
                description="Sign in to view real-time scrape detection alerts across YouTube, TikTok, Instagram, and AI model training datasets."
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'settlement' && (
              <AuthGuard
                title="Licensing & Settlement Portal Protected"
                description="Sign in to manage settlement claims, issue automated licensing invoices, and execute checkout clearances."
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'legal' && (
              <AuthGuard
                title="DMCA & Legal Notice Studio Locked"
                description="Sign in to generate 17 U.S.C. § 512(c) statutory takedown notices and BIPA legal enforcement documents."
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            )}

            {activeTab === 'financials' && (
              <AuthGuard
                title="Royalty Ledger & Financials Protected"
                description="Sign in to view private royalty earnings, transaction histories, and execute Stripe Connect bank payouts."
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            )}
          </>
        ) : (
          /* AUTHENTICATED CREATOR VAULT VIEWS */
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                digitalTwin={digitalTwin}
                assets={assets}
                matches={matches}
                claims={claims}
                policyMode={policyMode}
                setActiveTab={setActiveTab}
                onSimulateScan={handleSimulateScan}
                currentUser={currentUser}
              />
            )}

            {activeTab === 'biometrics' && (
              <LikenessRegistry
                digitalTwin={digitalTwin}
                policyMode={policyMode}
                setPolicyMode={setPolicyMode}
                onUpdateDigitalTwin={setDigitalTwin}
                currentUser={currentUser}
              />
            )}

            {activeTab === 'assets' && (
              <AssetProtection
                assets={assets}
                onAddAsset={handleAddAsset}
                setActiveTab={setActiveTab}
                currentUser={currentUser}
              />
            )}

            {activeTab === 'detection' && (
              <DetectionNetwork
                matches={matches}
                setActiveTab={setActiveTab}
                onSimulateScan={handleSimulateScan}
                policyMode={policyMode}
                currentUser={currentUser}
              />
            )}

            {activeTab === 'settlement' && (
              <SettlementPortal
                claims={claims}
                onClaimSettled={handleClaimSettled}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'legal' && (
              <LegalEnforcement
                digitalTwin={digitalTwin}
                matches={matches}
              />
            )}

            {activeTab === 'financials' && (
              <Financials
                transactions={transactions}
              />
            )}

            {activeTab === 'webservices' && (
              <WebServicesDashboard />
            )}

            {activeTab === 'admin' && (
              <AdminPanel
                matches={matches}
                claims={claims}
                onResolveMatch={(id) => {
                  setMatches(matches.map(m => m.id === id ? { ...m, status: 'resolved' } : m));
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Full-Stack Authentication & Biometric KYC Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}


export default App;
