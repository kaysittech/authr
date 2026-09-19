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
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

// Firebase configuration for project authr-506803
const firebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || "AIzaSyAuthr506803DefaultApiKeyForPublicAuth",
  authDomain: "authr-506803.firebaseapp.com",
  projectId: "authr-506803",
  storageBucket: "authr-506803.appspot.com",
  messagingSenderId: "506803123456",
  appId: "1:506803123456:web:authr506803app"
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
 * Fetch blog articles from Firestore
 */
export const getBlogArticlesFromFirestore = async () => {
  try {
    const articlesRef = collection(db, 'blog_articles');
    const querySnapshot = await getDocs(articlesRef);
    const articles: any[] = [];
    querySnapshot.forEach((docSnap) => {
      articles.push({ id: docSnap.id, ...docSnap.data() });
    });
    return articles;
  } catch (err) {
    console.warn("Firestore fetch blog articles fallback:", err);
    return [];
  }
};
