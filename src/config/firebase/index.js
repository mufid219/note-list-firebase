import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAK51O0zJ0PRxJL3rE5lk0aXIAq8Uu-hEM",
  authDomain: "note-list-yt.firebaseapp.com",
  projectId: "note-list-yt",
  storageBucket: "note-list-yt.appspot.com",
  messagingSenderId: "722235828873",
  appId: "1:722235828873:web:ce2357544b0d3256973458",
  measurementId: "G-XZTS7E0VW5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
