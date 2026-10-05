import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';

// Default Firebase Configuration template for DZONE COLLECTION
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "dzone-collection.firebaseapp.com",
  projectId: "dzone-collection",
  storageBucket: "dzone-collection.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const STORAGE_KEY_FIREBASE = 'dzone_firebase_config_v1';

export const getFirebaseConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FIREBASE);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return { ...DEFAULT_FIREBASE_CONFIG, ...parsed };
      }
    }
  } catch (err) {}
  return DEFAULT_FIREBASE_CONFIG;
};

export const saveFirebaseConfig = (newConfig) => {
  try {
    localStorage.setItem(STORAGE_KEY_FIREBASE, JSON.stringify(newConfig));
  } catch (e) {}
};

let app = null;
let db = null;

const currentConfig = getFirebaseConfig();

try {
  if (currentConfig.apiKey && currentConfig.apiKey.trim() !== "") {
    app = !getApps().length ? initializeApp(currentConfig) : getApp();
    db = getFirestore(app);
    console.log("🔥 Firebase initialized successfully for DZONE COLLECTION!");
  }
} catch (err) {
  console.warn("Firebase initialization warning:", err);
}

export { app, db, collection, doc, setDoc, getDocs, onSnapshot, deleteDoc, updateDoc };
