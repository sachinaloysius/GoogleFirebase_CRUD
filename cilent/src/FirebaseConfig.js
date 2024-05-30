
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBD2y_M-XIyqqY-4iInEQANQ35GftAWQQg",
  authDomain: "tidal-fiber-416305.firebaseapp.com",
  projectId: "tidal-fiber-416305",
  storageBucket: "tidal-fiber-416305.appspot.com",
  messagingSenderId: "820483428518",
  appId: "1:820483428518:web:99f99d76beaf9578fbe467"
};

 const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)

export const storage=getStorage(app)