// src/context/Firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { createContext, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

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

const storage = getStorage(app);
const fireStore = getFirestore(app);
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

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(fireBaseAuth);
  } catch (error) {
    console.error('Error signing out: ', error);
    throw error;
  }
};

// Add listing
const handleCreateNewListing = async (
  name,
  price,
  isbn,
  coverPic,
  currentUser
) => {
  try {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    return await addDoc(collection(fireStore, 'books'), {
      name,
      isbn,
      price,
      imageUrl: uploadResult.ref.fullPath,
      user: currentUser.email, // Save the current user's email
    });
  } catch (error) {
    console.log('Error', error);
    console.log('Error', error.message);
  }
};

// Get all books
export const getListAllBooks = async () => {
  try {
    const booksCollection = collection(fireStore, 'books');
    const bookSnapshot = await getDocs(booksCollection);
    return bookSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error fetching books: ', error);
    throw error;
  }
};

// Create a context
const FireBaseContext = createContext(null);

// Create a provider
export const FireBaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(fireBaseAuth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const isLoggedIn = currentUser ? true : false;
  return (
    <FireBaseContext.Provider
      value={{
        signUp,
        signIn,
        googleSignIn,
        signOutUser,
        isLoggedIn,
        currentUser,
        handleCreateNewListing,
        getListAllBooks,
      }}
    >
      {children}
    </FireBaseContext.Provider>
  );
};

// Use the context
export const useFireBase = () => useContext(FireBaseContext);
