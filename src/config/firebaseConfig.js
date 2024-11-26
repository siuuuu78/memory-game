import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAS7jQrHEXzCXCG_0TOSRcP4jyW-7NXLig",
    authDomain: "memory-game-bbe77.firebaseapp.com",
    projectId: "memory-game-bbe77",
    storageBucket: "memory-game-bbe77.firebasestorage.app",
    messagingSenderId: "3042881591",
    appId: "1:3042881591:web:a2a7a2c983de007457cfb2",
    measurementId: "G-VFD0VYWEQ7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };

