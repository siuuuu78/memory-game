import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyAS7jQrHEXzCXCG_0TOSRcP4jyW-7NXLig",
    authDomain: "memory-game-bbe77.firebaseapp.com",
    projectId: "memory-game-bbe77",
    storageBucket: "memory-game-bbe77.firebasestorage.app", 
    messagingSenderId: "3042881591",
    appId: "1:3042881591:web:a2a7a2c983de007457cfb2",
    measurementId: "G-VFD0VYWEQ7"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(app);


// Ekspor db agar dapat digunakan di file lain
export { db };
