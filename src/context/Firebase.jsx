import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { createContext, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'fir-bookstore-86a54.firebaseapp.com',
  projectId: 'fir-bookstore-86a54',
  storageBucket: 'fir-bookstore-86a54.appspot.com',
  messagingSenderId: '373256191822',
  appId: '1:373256191822:web:28b95b7e7583905ae3a81f',
  measurementId: 'G-6HRE3F3LP8',
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const fireBaseAuth = getAuth(app);

// Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      fireBaseAuth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error('Error signing up with email and password: ', error);
    throw error;
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(
      fireBaseAuth,
      email,
      password
    );
    return user;
  } catch (error) {
    console.error('Error signing in with email and password: ', error);
    throw error;
  }
};

// Google provider
const googleProvider = new GoogleAuthProvider();

// Google sign-in
export const googleSignIn = async () => {
  try {
    const googleUser = await signInWithPopup(fireBaseAuth, googleProvider);
    return googleUser;
  } catch (error) {
    console.error('Error signing in with Google: ', error);
    throw error;
  }
};

// Create a context
const FireBaseContext = createContext(null);

// Create a provider
export const FireBaseProvider = ({ children }) => {
  return (
    <FireBaseContext.Provider value={{ signUp, signIn, googleSignIn }}>
      {children}
    </FireBaseContext.Provider>
  );
};

// Use the context
export const useFireBase = () => useContext(FireBaseContext);
