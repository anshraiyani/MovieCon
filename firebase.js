import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCieZKB6HQ-XnlhiWvbM_GKu3aMtSBgzp8",
  authDomain: "mmdb-dev.firebaseapp.com",
  projectId: "mmdb-dev",
  storageBucket: "mmdb-dev.appspot.com",
  messagingSenderId: "362852436659",
  appId: "1:362852436659:web:46c39fb050e9bc0a577ec6",
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const firestore_db=getFirestore(app);

export {app,firestore_db}