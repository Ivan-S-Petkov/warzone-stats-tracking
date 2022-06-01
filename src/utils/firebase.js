// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDGeB7vAsuzodmKalVx4Hhc1jCYRmpJbAU',
  authDomain: 'call-of-duty-9faf7.firebaseapp.com',
  projectId: 'call-of-duty-9faf7',
  storageBucket: 'call-of-duty-9faf7.appspot.com',
  messagingSenderId: '1085580147600',
  appId: '1:1085580147600:web:da7847b7bf98b205355115',
  measurementId: 'G-4HS1HMB2GH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
