import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcH73vInmmbQLuN7hdDwbW6TQAoc65kKw",
  authDomain: "stateview-supervisor.firebaseapp.com",
  databaseURL: "https://stateview-supervisor-default-rtdb.firebaseio.com",
  projectId: "stateview-supervisor",
  storageBucket: "stateview-supervisor.firebasestorage.app",
  messagingSenderId: "997810853393",
  appId: "1:997810853393:web:8866544497d1b7e74083b0",
  measurementId: "G-EWY5PVPHM3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
