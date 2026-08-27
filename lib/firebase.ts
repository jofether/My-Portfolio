// ============================================================================
// FIREBASE INITIALIZATION
// ----------------------------------------------------------------------------
// 1. Create a project at https://console.firebase.google.com
// 2. Enable Cloud Firestore (Build > Firestore Database > Create database).
// 3. Register a Web App in Project Settings and copy the config values below
//    into a `.env.local` file at the project root (see `.env.local.example`).
// 4. NEXT_PUBLIC_* variables are exposed to the browser — this is expected
//    and safe for Firebase client config; access control is handled via
//    Firestore Security Rules, NOT by hiding these values.
// ============================================================================

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Guard against re-initializing the app on hot reloads / multiple imports.
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

function getFirebaseApp(): FirebaseApp | null {
  // If required config is missing (e.g. running without .env.local yet),
  // skip initialization instead of throwing — the UI falls back gracefully.
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    return null;
  }
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!db) {
    db = getFirestore(firebaseApp);
  }
  return db;
}

export { firebaseConfig };
