import {getApp,getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAohq5eXZxSdm1V8KrB54xpsxbDQrM6Y34",
    authDomain: "nexusai-pdf.firebaseapp.com",
    projectId: "nexusai-pdf",
    storageBucket: "nexusai-pdf.firebasestorage.app",
    messagingSenderId: "324366417775",
    appId: "1:324366417775:web:cee4200297670b8d06f29a"
  };


  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  const db = getFirestore(app);
  const storage = getStorage(app)

  export {db, storage}