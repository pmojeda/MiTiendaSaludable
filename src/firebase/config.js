import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAI1uZNf0Ra_VWdFv5PYByJLkfTeoCNRJA",
  authDomain: "tiendasaludabledb.firebaseapp.com",
  projectId: "tiendasaludabledb",
  storageBucket: "tiendasaludabledb.firebasestorage.app",
  messagingSenderId: "993482019874",
  appId: "1:993482019874:web:8cc00f6a64e70add59267b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);