// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBbcoNDYn6lXmwgtrzQkjjYKaLSVjwv7e0",
  authDomain: "onal-mudiyum.firebaseapp.com",
  projectId: "onal-mudiyum",
  storageBucket: "onal-mudiyum.firebasestorage.app",
  messagingSenderId: "843102660266",
  appId: "1:843102660266:web:9efda8bafa88a13e7cd2d3",
  measurementId: "G-KF34M4W6R0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication
export const auth = getAuth(app);


// Firestore Database (To-Do, Study, Fitness, Profile)
export const db = getFirestore(app);

export default app;