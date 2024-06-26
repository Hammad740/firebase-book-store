import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { createContext, useContext } from 'react';

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
const analytics = getAnalytics(app);

//// create a context
const FireBaseContext = createContext(null);

//// create a provider

export const FireBaseProvider = (props) => {
  return <FireBaseContext.Provider>{props.children}</FireBaseContext.Provider>;
};

//// use the context

export const useFireBase = () => useContext(FireBaseContext);
