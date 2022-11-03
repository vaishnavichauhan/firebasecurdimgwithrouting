import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

//fbroutCrud in firebase 
const firebaseConfig = {
  apiKey: "AIzaSyDc62hpfQsNAoTvA7QxeOYKmLgwRp4S_4w",
  authDomain: "fbroutcrud.firebaseapp.com",
  projectId: "fbroutcrud",
  storageBucket: "fbroutcrud.appspot.com",
  messagingSenderId: "804503606929",
  appId: "1:804503606929:web:319b87803e828dd8d09130",
  measurementId: "G-W0QQ19VMYS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

