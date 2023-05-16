// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "todayhealth-7fbad.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      return user;
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
const db = getFirestore(app);
export default db;

// export async function addNewProduct(product, imageUrl) {}

export function imageUpload(file, v4, setImageList) {
  if (file === null) return;
  const storage = getStorage();
  const storageRef = ref(storage, `images/${file.name + v4()} `);
  uploadBytes(storageRef, file).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((url) => {
      setImageList((prev) => [url, ...prev]);
    })
  );
}
