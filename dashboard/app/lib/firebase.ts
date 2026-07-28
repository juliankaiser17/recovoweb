import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDGdecWngN_zZFlJyq_L0_BLD8KEMcBpgI',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'theironpalace-ffb85.firebaseapp.com',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://theironpalace-ffb85-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'theironpalace-ffb85',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'theironpalace-ffb85.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '708398928493',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:708398928493:web:cf4698cc7d3ba69ff9a564',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getDatabase(app);
