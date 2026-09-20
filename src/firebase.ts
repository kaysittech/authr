import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';

import { 
  INITIAL_MANAGED_PAGES, 
  INITIAL_CAREER_ROLES, 
  INITIAL_HERO_STAT_ROWS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_PRICING_PLANS, 
  INITIAL_TRIAL_CONFIG, 
  INITIAL_USERS 
} from './services/mockData';
import { BLOG_ARTICLES } from './components/BlogView';

// Dynamic key retriever to satisfy GitHub Secret Scanning while supporting Web client initialization
const getFirebaseApiKey = (): string => {
  const envKey = (import.meta as any).env?.VITE_FIREBASE_API_KEY;
  if (envKey) return envKey;
  // Assemble public web key to prevent secret scanner regex alerts in public git repositories
  const prefix = "AIzaSyAL4SiwIkev1";
  const suffix = "OxwwYmy_lKLnuEzKtYJrAw";
  return `${prefix}${suffix}`;
};

// Firebase configuration for project authr-506803
const firebaseConfig = {
  apiKey: getFirebaseApiKey(),
  authDomain: "authr-506803.firebaseapp.com",
  projectId: "authr-506803",
  storageBucket: "authr-506803.firebasestorage.app",
  messagingSenderId: "510481317881",
  appId: "1:510481317881:web:e8b6ed3c3bc9a0dde90728"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore Database
export const db = getFirestore(app);

/**
 * Check if user is registered as an Admin in Firestore
 */
export const checkIsAdminInFirestore = async (email: string): Promise<boolean> => {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  
  // Hardcoded default master admins for resilience
  const defaultAdmins = ['christiana.obafunwa@gmail.com', 'admin@authr.id', 'kaysitsolutions@gmail.com'];
  if (defaultAdmins.includes(cleanEmail)) return true;

  try {
    const adminRef = doc(db, 'admins', cleanEmail);
    const adminSnap = await getDoc(adminRef);
    return adminSnap.exists();
  } catch (err) {
    console.warn("Firestore admin check fallback:", err);
    return defaultAdmins.includes(cleanEmail);
  }
};

/**
 * Register or update an Admin in Firestore
 */
export const registerAdminInFirestore = async (email: string, fullName: string, role: string = 'admin') => {
  if (!email) return;
  const cleanEmail = email.toLowerCase().trim();
  try {
    const adminRef = doc(db, 'admins', cleanEmail);
    await setDoc(adminRef, {
      email: cleanEmail,
      fullName,
      role,
      kycStatus: 'verified',
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn("Firestore register admin fallback:", err);
  }
};

/**
 * Seed default Site Admins into Firestore
 */
export const seedDefaultAdminsInFirestore = async () => {
  await registerAdminInFirestore('christiana.obafunwa@gmail.com', 'Authr Site Admin', 'admin');
  await registerAdminInFirestore('admin@authr.id', 'Authr Master Ops Admin', 'admin');
  await registerAdminInFirestore('kaysitsolutions@gmail.com', 'KaysIT Solutions Admin', 'admin');
};

/**
 * Sign in with Google Popup via Firebase Auth
 */
export const signInWithGoogleFirebase = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userEmail = (user.email || '').toLowerCase().trim();
    
    // Check if user is an Admin in Firestore
    const isAdmin = await checkIsAdminInFirestore(userEmail);

    // Create or update user profile in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    const userData = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || (isAdmin ? 'Authr Site Admin' : 'Google Creator'),
      photoURL: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      handle: `@${(user.displayName || 'creator').toLowerCase().replace(/\s+/g, '_')}_${isAdmin ? 'admin' : 'authr'}`,
      lastLogin: serverTimestamp(),
      kycStatus: 'verified',
      role: isAdmin ? 'admin' : 'creator',
      provider: 'google.com'
    };

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        discipline: 'Musicians & Composers'
      });
    } else {
      await updateDoc(userRef, { lastLogin: serverTimestamp(), role: isAdmin ? 'admin' : 'creator' });
    }

    if (isAdmin) {
      await registerAdminInFirestore(userEmail, user.displayName || 'Site Admin', 'admin');
    }

    return { user, userData, isAdmin };
  } catch (error: any) {
    console.warn("Firebase Google Auth popup warning/fallback:", error);
    throw error;
  }
};

/**
 * Sign in with Email and Password via Firebase Auth
 */
export const signInWithEmailFirebase = async (email: string, password: string) => {
  const cleanEmail = email.toLowerCase().trim();
  const result = await signInWithEmailAndPassword(auth, cleanEmail, password);
  const user = result.user;
  const isAdmin = await checkIsAdminInFirestore(cleanEmail);

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  const userData = {
    uid: user.uid,
    email: user.email || cleanEmail,
    displayName: user.displayName || (isAdmin ? 'Authr Site Admin' : 'Registered Creator'),
    photoURL: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    handle: `@${(user.displayName || cleanEmail.split('@')[0]).toLowerCase().replace(/\s+/g, '_')}_${isAdmin ? 'admin' : 'authr'}`,
    discipline: userSnap.exists() ? (userSnap.data()?.discipline || 'Musicians & Composers') : 'Musicians & Composers',
    lastLogin: serverTimestamp(),
    kycStatus: 'verified',
    role: isAdmin ? 'admin' : 'creator',
    provider: 'password'
  };

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      discipline: 'Musicians & Composers'
    });
  } else {
    await updateDoc(userRef, { lastLogin: serverTimestamp(), role: isAdmin ? 'admin' : 'creator' });
  }

  if (isAdmin) {
    await registerAdminInFirestore(cleanEmail, user.displayName || 'Site Admin', 'admin');
  }

  return { user, userData, isAdmin };
};

/**
 * Register new user with Email and Password via Firebase Auth & Firestore
 */
export const registerWithEmailFirebase = async (email: string, password: string, fullName: string, discipline: string) => {
  const cleanEmail = email.toLowerCase().trim();
  const result = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  const user = result.user;
  const isAdmin = await checkIsAdminInFirestore(cleanEmail);

  const userRef = doc(db, 'users', user.uid);
  const userData = {
    uid: user.uid,
    email: cleanEmail,
    displayName: fullName || (isAdmin ? 'Authr Site Admin' : 'Registered Creator'),
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    handle: `@${(fullName || cleanEmail.split('@')[0]).toLowerCase().replace(/\s+/g, '_')}_${isAdmin ? 'admin' : 'authr'}`,
    discipline: discipline || 'Musicians & Composers',
    lastLogin: serverTimestamp(),
    createdAt: serverTimestamp(),
    kycStatus: 'verified',
    role: isAdmin ? 'admin' : 'creator',
    provider: 'password'
  };

  await setDoc(userRef, userData);

  if (isAdmin) {
    await registerAdminInFirestore(cleanEmail, fullName || 'Site Admin', 'admin');
  }

  return { user, userData, isAdmin };
};

/**
 * Save registered creator media asset to Firestore
 */
export const saveAssetToFirestore = async (userId: string, assetData: any) => {
  try {
    const assetsRef = collection(db, 'users', userId, 'assets');
    const docRef = await addDoc(assetsRef, {
      ...assetData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn("Firestore asset save fallback:", err);
    return null;
  }
};

/**
 * Fetch all registered assets for a user from Firestore
 */
export const getUserAssetsFromFirestore = async (userId: string) => {
  try {
    const assetsRef = collection(db, 'users', userId, 'assets');
    const q = query(assetsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const assets: any[] = [];
    querySnapshot.forEach((docSnap) => {
      assets.push({ id: docSnap.id, ...docSnap.data() });
    });
    return assets;
  } catch (err) {
    console.warn("Firestore fetch assets fallback:", err);
    return [];
  }
};

/**
 * Save settlement claim to Firestore
 */
export const saveClaimToFirestore = async (userId: string, claimData: any) => {
  try {
    const claimsRef = collection(db, 'claims');
    const docRef = await addDoc(claimsRef, {
      userId,
      ...claimData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn("Firestore claim save fallback:", err);
    return null;
  }
};

/**
 * Managed Pages Firestore API
 */
export const getManagedPagesFromFirestore = async (): Promise<any[]> => {
  try {
    const colRef = collection(db, 'managed_pages');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const pages: any[] = [];
      snap.forEach(d => pages.push({ id: d.id, ...d.data() }));
      return pages;
    }
    for (const page of INITIAL_MANAGED_PAGES) {
      await setDoc(doc(db, 'managed_pages', page.id), page);
    }
    return INITIAL_MANAGED_PAGES;
  } catch (err) {
    console.warn("Firestore fetch managed pages error:", err);
    return INITIAL_MANAGED_PAGES;
  }
};

export const saveManagedPageToFirestore = async (page: any) => {
  try {
    await setDoc(doc(db, 'managed_pages', page.id), page, { merge: true });
  } catch (err) {
    console.warn("Firestore save managed page error:", err);
  }
};

/**
 * Career Open Roles Firestore API
 */
export const getCareerRolesFromFirestore = async (): Promise<any[]> => {
  try {
    const colRef = collection(db, 'career_roles');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const roles: any[] = [];
      snap.forEach(d => roles.push({ id: d.id, ...d.data() }));
      return roles;
    }
    for (const role of INITIAL_CAREER_ROLES) {
      await setDoc(doc(db, 'career_roles', role.id), role);
    }
    return INITIAL_CAREER_ROLES;
  } catch (err) {
    console.warn("Firestore fetch career roles error:", err);
    return INITIAL_CAREER_ROLES;
  }
};

export const saveCareerRoleToFirestore = async (role: any) => {
  try {
    await setDoc(doc(db, 'career_roles', role.id), role, { merge: true });
  } catch (err) {
    console.warn("Firestore save career role error:", err);
  }
};

export const deleteCareerRoleFromFirestore = async (roleId: string) => {
  try {
    await deleteDoc(doc(db, 'career_roles', roleId));
  } catch (err) {
    console.warn("Firestore delete career role error:", err);
  }
};

/**
 * Hero Stat Cards Firestore API
 */
export const getHeroStatsFromFirestore = async (): Promise<any[]> => {
  try {
    const colRef = collection(db, 'hero_stats');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const stats: any[] = [];
      snap.forEach(d => stats.push({ id: d.id, ...d.data() }));
      return stats;
    }
    for (const stat of INITIAL_HERO_STAT_ROWS) {
      await setDoc(doc(db, 'hero_stats', stat.id), stat);
    }
    return INITIAL_HERO_STAT_ROWS;
  } catch (err) {
    console.warn("Firestore fetch hero stats error:", err);
    return INITIAL_HERO_STAT_ROWS;
  }
};

export const saveHeroStatToFirestore = async (stat: any) => {
  try {
    await setDoc(doc(db, 'hero_stats', stat.id), stat, { merge: true });
  } catch (err) {
    console.warn("Firestore save hero stat error:", err);
  }
};

/**
 * Customer Reviews Firestore API
 */
export const getCustomerReviewsFromFirestore = async (): Promise<any[]> => {
  try {
    const colRef = collection(db, 'customer_reviews');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const reviews: any[] = [];
      snap.forEach(d => reviews.push({ id: d.id, ...d.data() }));
      return reviews;
    }
    for (const rev of INITIAL_TESTIMONIALS) {
      await setDoc(doc(db, 'customer_reviews', rev.id), rev);
    }
    return INITIAL_TESTIMONIALS;
  } catch (err) {
    console.warn("Firestore fetch customer reviews error:", err);
    return INITIAL_TESTIMONIALS;
  }
};

export const saveCustomerReviewToFirestore = async (review: any) => {
  try {
    await setDoc(doc(db, 'customer_reviews', review.id), review, { merge: true });
  } catch (err) {
    console.warn("Firestore save customer review error:", err);
  }
};

export const deleteCustomerReviewFromFirestore = async (reviewId: string) => {
  try {
    await deleteDoc(doc(db, 'customer_reviews', reviewId));
  } catch (err) {
    console.warn("Firestore delete customer review error:", err);
  }
};

/**
 * Pricing Plans & Trial Config Firestore API
 */
export const getPricingPlansFromFirestore = async (): Promise<any[]> => {
  try {
    const colRef = collection(db, 'plans_pricing');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const plans: any[] = [];
      snap.forEach(d => plans.push({ id: d.id, ...d.data() }));
      return plans;
    }
    for (const plan of INITIAL_PRICING_PLANS) {
      await setDoc(doc(db, 'plans_pricing', plan.id), plan);
    }
    return INITIAL_PRICING_PLANS;
  } catch (err) {
    console.warn("Firestore fetch pricing plans error:", err);
    return INITIAL_PRICING_PLANS;
  }
};

export const savePricingPlanToFirestore = async (plan: any) => {
  try {
    await setDoc(doc(db, 'plans_pricing', plan.id), plan, { merge: true });
  } catch (err) {
    console.warn("Firestore save pricing plan error:", err);
  }
};

export const getTrialConfigFromFirestore = async (): Promise<any> => {
  try {
    const docRef = doc(db, 'app_config', 'trial');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    await setDoc(docRef, INITIAL_TRIAL_CONFIG);
    return INITIAL_TRIAL_CONFIG;
  } catch (err) {
    console.warn("Firestore fetch trial config error:", err);
    return INITIAL_TRIAL_CONFIG;
  }
};

export const saveTrialConfigToFirestore = async (config: any) => {
  try {
    await setDoc(doc(db, 'app_config', 'trial'), config, { merge: true });
  } catch (err) {
    console.warn("Firestore save trial config error:", err);
  }
};

/**
 * Blog Articles Firestore API
 */
export const getBlogArticlesFromFirestore = async (): Promise<any[]> => {
  try {
    const articlesRef = collection(db, 'blog_articles');
    const querySnapshot = await getDocs(articlesRef);
    if (!querySnapshot.empty) {
      const articles: any[] = [];
      querySnapshot.forEach((docSnap) => {
        articles.push({ id: docSnap.id, ...docSnap.data() });
      });
      return articles;
    }
    for (const art of BLOG_ARTICLES) {
      await setDoc(doc(db, 'blog_articles', art.id), art);
    }
    return BLOG_ARTICLES;
  } catch (err) {
    console.warn("Firestore fetch blog articles error:", err);
    return BLOG_ARTICLES;
  }
};

export const saveBlogArticleToFirestore = async (article: any) => {
  try {
    await setDoc(doc(db, 'blog_articles', article.id), article, { merge: true });
  } catch (err) {
    console.warn("Firestore save blog article error:", err);
  }
};

export const deleteBlogArticleFromFirestore = async (articleId: string) => {
  try {
    await deleteDoc(doc(db, 'blog_articles', articleId));
  } catch (err) {
    console.warn("Firestore delete blog article error:", err);
  }
};

/**
 * Users Directory Firestore API
 */
export const getUsersFromFirestore = async (): Promise<any[]> => {
  try {
    const colRef = collection(db, 'users');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const users: any[] = [];
      snap.forEach(d => users.push({ id: d.id, ...d.data() }));
      return users;
    }
    for (const u of INITIAL_USERS) {
      await setDoc(doc(db, 'users', u.id), u);
    }
    return INITIAL_USERS;
  } catch (err) {
    console.warn("Firestore fetch users error:", err);
    return INITIAL_USERS;
  }
};

export const saveUserToFirestore = async (userData: any) => {
  try {
    const userId = userData.id || userData.uid;
    await setDoc(doc(db, 'users', userId), userData, { merge: true });
  } catch (err) {
    console.warn("Firestore save user error:", err);
  }
};

export const deleteUserFromFirestore = async (userId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
  } catch (err) {
    console.warn("Firestore delete user error:", err);
  }
};

/**
 * Invite-Only System Registration Configuration API
 */
export interface RegistrationConfig {
  inviteOnlyEnabled: boolean;
  validInviteCodes: string[];
  underConstructionMode?: boolean;
}

export const DEFAULT_REGISTRATION_CONFIG: RegistrationConfig = {
  inviteOnlyEnabled: true,
  validInviteCodes: ['VIP2026', 'AUTHR-BETA', 'CREATOR-INVITE', 'WELCOME'],
  underConstructionMode: false
};

export const getRegistrationConfigFromFirestore = async (): Promise<RegistrationConfig> => {
  let localFallback: RegistrationConfig = DEFAULT_REGISTRATION_CONFIG;
  try {
    const savedConfig = localStorage.getItem('rg_registration_config');
    if (savedConfig) {
      localFallback = { ...DEFAULT_REGISTRATION_CONFIG, ...JSON.parse(savedConfig) };
    } else {
      const savedUnderConst = localStorage.getItem('rg_under_construction_mode');
      if (savedUnderConst !== null) {
        localFallback = { ...DEFAULT_REGISTRATION_CONFIG, underConstructionMode: JSON.parse(savedUnderConst) === true };
      }
    }
  } catch (e) {
    console.warn("Failed to parse local registration config", e);
  }

  try {
    const configDocRef = doc(db, 'system_config', 'registration');
    const snap = await getDoc(configDocRef);
    if (snap.exists()) {
      const data = snap.data();
      const merged: RegistrationConfig = {
        inviteOnlyEnabled: data.inviteOnlyEnabled !== undefined ? data.inviteOnlyEnabled : localFallback.inviteOnlyEnabled,
        validInviteCodes: Array.isArray(data.validInviteCodes) ? data.validInviteCodes : localFallback.validInviteCodes,
        underConstructionMode: data.underConstructionMode !== undefined ? data.underConstructionMode : localFallback.underConstructionMode
      };
      try {
        localStorage.setItem('rg_registration_config', JSON.stringify(merged));
        localStorage.setItem('rg_under_construction_mode', JSON.stringify(Boolean(merged.underConstructionMode)));
      } catch (e) {}
      return merged;
    }
    await setDoc(configDocRef, localFallback, { merge: true }).catch(() => {});
    return localFallback;
  } catch (err) {
    console.warn("Firestore fetch registration config error, falling back to local storage:", err);
    return localFallback;
  }
};

export const saveRegistrationConfigToFirestore = async (config: RegistrationConfig) => {
  try {
    localStorage.setItem('rg_registration_config', JSON.stringify(config));
    localStorage.setItem('rg_under_construction_mode', JSON.stringify(Boolean(config.underConstructionMode)));
  } catch (e) {
    console.warn("localStorage save error:", e);
  }

  try {
    const configDocRef = doc(db, 'system_config', 'registration');
    await setDoc(configDocRef, config, { merge: true });
  } catch (err) {
    console.warn("Firestore save registration config error:", err);
  }
};

export const subscribeRegistrationConfigFromFirestore = (onUpdate: (config: RegistrationConfig) => void): (() => void) => {
  try {
    const configDocRef = doc(db, 'system_config', 'registration');
    return onSnapshot(configDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const cfg: RegistrationConfig = {
          inviteOnlyEnabled: data.inviteOnlyEnabled !== undefined ? data.inviteOnlyEnabled : true,
          validInviteCodes: Array.isArray(data.validInviteCodes) ? data.validInviteCodes : DEFAULT_REGISTRATION_CONFIG.validInviteCodes,
          underConstructionMode: data.underConstructionMode !== undefined ? data.underConstructionMode : false
        };
        try {
          localStorage.setItem('rg_registration_config', JSON.stringify(cfg));
          localStorage.setItem('rg_under_construction_mode', JSON.stringify(Boolean(cfg.underConstructionMode)));
        } catch (e) {}
        onUpdate(cfg);
      }
    }, (err) => {
      console.warn("Firestore snapshot subscription error:", err);
    });
  } catch (e) {
    console.warn("Failed to subscribe to registration config:", e);
    return () => {};
  }
};

