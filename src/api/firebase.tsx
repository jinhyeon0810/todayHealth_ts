// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onUserStateChange(callback: any) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
const db = getFirestore(app);
export default db;

// export async function addNewProduct(product, imageUrl) {}

export function imageUpload(file: File | null, v4: () => string, setImageList: React.Dispatch<React.SetStateAction<string | undefined>>) {
  if (file === null) return;
  const storage = getStorage();
  const storageRef = ref(storage, `images/${file.name + v4()} `);
  uploadBytes(storageRef, file).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((url) => {
      setImageList(url);
    })
  );
}
