import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE,
  projectId: process.env.NEXT_PUBLIC_FIREBASE,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE,
  appId: process.env.NEXT_PUBLIC_FIREBASE,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
