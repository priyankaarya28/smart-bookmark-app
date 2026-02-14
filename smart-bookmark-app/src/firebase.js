import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getDatabase, ref, push, remove, onValue, query, orderByChild, equalTo } from 'firebase/database';

// Get Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase config is complete
const isFirebaseConfigured = Object.values(firebaseConfig).every(value => value);

let app, auth, database;

if (isFirebaseConfigured) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);
} else {
  console.error('❌ Firebase not configured. Please set up .env.local file');
}

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export helper to check if Firebase is configured
export const isConfigured = () => isFirebaseConfigured;

// Sign in with Google
export const signInWithGoogle = () => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase not configured. Please set up .env.local file');
  }
  return signInWithPopup(auth, googleProvider)
    .catch((error) => {
      console.error('Google sign-in error:', error);
      throw error;
    });
};

// Sign out
export const signOutUser = () => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase not configured');
  }
  return signOut(auth);
};

// Add bookmark
export const addBookmark = (userId, url, title) => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase not configured');
  }
  const bookmarksRef = ref(database, 'bookmarks');
  return push(bookmarksRef, {
    userId,
    url,
    title,
    timestamp: Date.now(),
    createdAt: new Date().toISOString(),
  });
};

// Delete bookmark
export const deleteBookmark = (bookmarkId) => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase not configured');
  }
  const bookmarkRef = ref(database, `bookmarks/${bookmarkId}`);
  return remove(bookmarkRef);
};

// Listen to user's bookmarks in real-time
export const subscribeToUserBookmarks = (userId, callback) => {
  if (!isFirebaseConfigured) {
    callback([]);
    return () => {};
  }
  const bookmarksRef = ref(database, 'bookmarks');
  const userBookmarksQuery = query(bookmarksRef, orderByChild('userId'), equalTo(userId));
  
  const unsubscribe = onValue(
    userBookmarksQuery,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const bookmarks = Object.entries(data).map(([id, bookmark]) => ({
          id,
          ...bookmark,
        }));
        // Sort by timestamp descending (newest first)
        bookmarks.sort((a, b) => b.timestamp - a.timestamp);
        callback(bookmarks);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error('Database error:', error);
      callback([]);
    }
  );

  return unsubscribe;
};

// Get current user
export const getCurrentUser = () => {
  if (!isFirebaseConfigured) {
    return null;
  }
  return auth.currentUser;
};

// Subscribe to auth state changes
export const subscribeToAuthState = (callback) => {
  if (!isFirebaseConfigured) {
    // If not configured, immediately call callback with null
    callback(null);
    return () => {};
  }
  return auth.onAuthStateChanged(callback);
};

export { auth, database };
