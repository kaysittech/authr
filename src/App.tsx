import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
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
import { BlogView } from './components/BlogView';
import { FooterPagesView } from './components/FooterPagesView';
import { Footer } from './components/Footer';
import { UnderConstructionView } from './components/UnderConstructionView';

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

import { onAuthStateChanged } from 'firebase/auth';
import { fetchAppState } from './services/api';
import { auth, seedDefaultAdminsInFirestore, getRegistrationConfigFromFirestore, subscribeRegistrationConfigFromFirestore, signOutUserFromFirebase, signInWithGoogleFirebase } from './firebase';

const getTabFromHash = () => {
  if (typeof window === 'undefined') return 'dashboard';
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  return hash || 'dashboard';
};

export function App() {
  const [activeTab, setActiveTab] = useState<string>(getTabFromHash);
  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');
  const [policyMode, setPolicyMode] = useState<PolicyMode>('micro_monetization');

  // Scroll to top and sync URL hash on activeTab change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (activeTab === 'dashboard') {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      if (window.location.hash !== `#${activeTab}`) {
        window.location.hash = activeTab;
      }
    }
  }, [activeTab]);

  // Listen to browser hash changes (Direct links, back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromHash();
      setActiveTab(tab);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // State Management
  // State Management
  const [digitalTwin, setDigitalTwin] = useState<DigitalTwin>(INITIAL_DIGITAL_TWIN);
  const [assets, setAssets] = useState<ProtectedAsset[]>(INITIAL_PROTECTED_ASSETS);
  const [matches, setMatches] = useState<DetectionMatch[]>(INITIAL_DETECTION_MATCHES);
  const [claims, setClaims] = useState<SettlementClaim[]>(INITIAL_SETTLEMENT_CLAIMS);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);

  // Authentication & System State (Managed 100% via Firebase Auth & Cloud Firestore)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isUnderConstruction, setIsUnderConstruction] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rg_under_construction_mode') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Real-time Firebase Firestore Registration & Under Construction Config Subscription
  useEffect(() => {
    const syncConfig = async () => {
      try {
        const cfg = await getRegistrationConfigFromFirestore();
        setIsUnderConstruction(Boolean(cfg.underConstructionMode));
      } catch (e) {}
    };
    syncConfig();

    const unsubscribeConfig = subscribeRegistrationConfigFromFirestore((cfg) => {
      setIsUnderConstruction(Boolean(cfg.underConstructionMode));
    });

    const handleCustomUpdate = () => syncConfig();
    window.addEventListener('rg_site_status_updated', handleCustomUpdate);

    return () => {
      unsubscribeConfig();
      window.removeEventListener('rg_site_status_updated', handleCustomUpdate);
    };
  }, []);

  // Real-time Firebase Auth Session Observer
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userEmail = fbUser.email || '';
        const cleanEmail = userEmail.toLowerCase().trim();
        const isMasterAdmin = ['admin@authr.id', 'christiana.obafunwa@gmail.com', 'kaysitsolutions@gmail.com'].includes(cleanEmail);
        const userSession: UserSession = {
          id: fbUser.uid,
          email: userEmail || 'user@authr.id',
          fullName: fbUser.displayName || userEmail.split('@')[0] || 'Authr User',
          handle: `@${(userEmail.split('@')[0] || 'user').toLowerCase().replace(/[^a-z0-9_]/g, '')}`,
          discipline: 'Musicians & Composers',
          avatarUrl: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          token: await fbUser.getIdToken().catch(() => 'firebase_auth_token'),
          kycStatus: 'verified',
          idDocumentType: isMasterAdmin ? "Government Master Key (SITE ADMIN)" : "Verified ID",
          idMatchScore: 99.8,
          role: isMasterAdmin ? 'admin' : 'creator'
        };
        setCurrentUser(userSession);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const isAdminUser = currentUser && (
    currentUser.role === 'admin' ||
    ['admin@authr.id', 'christiana.obafunwa@gmail.com', 'kaysitsolutions@gmail.com'].includes(currentUser.email.toLowerCase()) ||
    currentUser.handle === '@site_admin' ||
    Boolean(currentUser.token && currentUser.token.includes('admin'))
  );

  // Sync state with backend & seed admins in Firestore
  useEffect(() => {
    seedDefaultAdminsInFirestore().catch(console.warn);
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
      .catch(() => {});
  }, []);

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
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
    signOutUserFromFirebase().catch(console.warn);
    setCurrentUser(null);
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
    }
  };

  const pendingClaimsCount = claims.filter(c => c.status === 'pending').length;

  const [isPreviewingPublic, setIsPreviewingPublic] = useState<boolean>(false);

  useEffect(() => {
    const handlePreviewTrigger = () => setIsPreviewingPublic(true);
    window.addEventListener('rg_trigger_preview_public', handlePreviewTrigger);
    return () => window.removeEventListener('rg_trigger_preview_public', handlePreviewTrigger);
  }, []);

  // Public non-admin visitors are locked out to UnderConstructionView when mode is active
  if (isUnderConstruction && !isAdminUser) {
    return (
      <>
        <UnderConstructionView onGoogleSignIn={() => setIsAuthModalOpen(true)} />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  const effectiveUser = isPreviewingPublic ? null : currentUser;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Main Menu Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeAdminTab={activeAdminTab}
        setActiveAdminTab={setActiveAdminTab}
        policyMode={policyMode}
        setPolicyMode={setPolicyMode}
        pendingClaimsCount={pendingClaimsCount}
        currentUser={effectiveUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onSelectDiscipline={handleSelectDiscipline}
      />

      {/* Main Canvas View */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {/* Admin Public Preview Bar */}
        {isPreviewingPublic && (
          <div className="mb-4 p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between text-xs font-mono shadow-md z-40 animate-fadeIn">
            <div className="flex items-center space-x-2.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping flex-shrink-0" />
              <span className="text-amber-400 font-extrabold uppercase tracking-wider">👁️ PUBLIC PREVIEW MODE:</span>
              <span className="text-slate-200">Viewing main website as a public guest</span>
            </div>
            <button
              onClick={() => setIsPreviewingPublic(false)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs transition-all shadow-sm cursor-pointer"
            >
              Exit Preview & Return to Admin ✕
            </button>
          </div>
        )}

        {/* Under Construction Admin Active Banner */}
        {isUnderConstruction && isAdminUser && !isPreviewingPublic && (
          <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-center justify-between text-xs font-bold shadow-xs animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-black uppercase flex-shrink-0">
                🚧 UNDER CONSTRUCTION ACTIVE
              </span>
              <span>Public visitors see ONLY the Google Login screen. As Admin, you have full access.</span>
            </div>
          </div>
        )}
        {/* Admin Demo Simulator Notification Bar */}
        {currentUser && currentUser.token?.includes('jwt_demo_switch_') && (
          <div className="mb-4 p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between text-xs font-bold shadow-sm animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-1 rounded-full bg-[#0144e4] text-white font-mono text-[10px] font-black uppercase">
                ⚡ ADMIN DEMO MODE ACTIVE
              </span>
              <span className="text-slate-200">Testing Vault Profile: <strong className="text-white">{currentUser.fullName}</strong> ({currentUser.handle})</span>
            </div>
            <button
              onClick={() => {
                handleLoginSuccess({
                  id: 'usr_admin_master_01',
                  email: 'admin@authr.id',
                  fullName: 'Authr Site Admin',
                  handle: '@site_admin',
                  discipline: 'Musicians & Composers',
                  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                  token: 'token_master_admin_2026',
                  kycStatus: 'verified',
                  idDocumentType: "Government Master Key (SITE ADMIN)",
                  idMatchScore: 100.0,
                  role: 'admin'
                });
                setActiveTab('admin');
              }}
              className="px-3.5 py-1.5 bg-[#0144e4] hover:bg-[#0038c7] text-white rounded-xl text-xs font-black transition-all shadow-xs"
            >
              Return to Admin Panel
            </button>
          </div>
        )}

        {/* PUBLIC UNAUTHENTICATED LANDING & LANDING PREVIEW */}
        {(activeTab === 'landing' || activeTab === 'public_landing' || !currentUser) ? (
          <>
            {(activeTab === 'landing' || activeTab === 'public_landing' || activeTab === 'dashboard') && (
              <PublicLanding
                onOpenRegister={() => setIsAuthModalOpen(true)}
                onOpenLogin={() => setIsAuthModalOpen(true)}
                onNavigateToBlog={() => setActiveTab('blog')}
                onSelectTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'blog' && (
              <BlogView onOpenRegister={() => setIsAuthModalOpen(true)} />
            )}

            {(['careers', 'about', 'privacy', 'terms', 'email_preferences', 'unsubscribe', 'security', 'search', 'get_started', 'detection', 'biometrics', 'assets', 'settlement', 'legal', 'financials', 'provenance', 'compliance', 'developers', 'webservices', 'counsel', 'pricing'].includes(activeTab) || activeTab.startsWith('page_')) && (
              <FooterPagesView 
                pageId={activeTab === 'webservices' ? 'developers' : activeTab} 
                onNavigateHome={() => setActiveTab('landing')} 
                onOpenRegister={() => setIsAuthModalOpen(true)} 
                onNavigateToTab={(tab) => setActiveTab(tab)}
                isLoggedIn={Boolean(currentUser)}
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
                activeAdminTab={activeAdminTab}
                setActiveAdminTab={setActiveAdminTab}
                onResolveMatch={(id) => {
                  setMatches(matches.map(m => m.id === id ? { ...m, status: 'resolved' } : m));
                }}
                onSwitchDemoUser={(demoUserSession) => {
                  handleLoginSuccess(demoUserSession);
                  setActiveTab('dashboard');
                }}
              />
            )}

            {activeTab === 'blog' && (
              <BlogView onOpenRegister={() => setIsAuthModalOpen(true)} />
            )}

            {(['careers', 'about', 'privacy', 'terms', 'email_preferences', 'unsubscribe', 'security', 'search', 'get_started', 'provenance', 'compliance', 'developers', 'counsel', 'pricing'].includes(activeTab) || activeTab.startsWith('page_')) && (
              <FooterPagesView 
                pageId={activeTab} 
                onNavigateHome={() => setActiveTab('dashboard')} 
                onOpenRegister={() => setIsAuthModalOpen(true)} 
                onNavigateToTab={(tab) => setActiveTab(tab)}
                isLoggedIn={true}
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

      {/* Global Krazy Footer */}
      {activeTab !== 'dashboard' && (
        <Footer 
          onSelectTab={(tab) => setActiveTab(tab)} 
          onOpenRegister={() => setIsAuthModalOpen(true)} 
        />
      )}

    </div>
  );
}


export default App;
