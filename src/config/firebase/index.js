import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAK51O0zJ0PRxJL3rE5lk0aXIAq8Uu-hEM",
  authDomain: "note-list-yt.firebaseapp.com",
  projectId: "",
  storageBucket: "note-list-yt.appspot.com",
  messagingSenderId: "722235828873",
  appId: "1:722235828873:web:ce2357544b0d3256973458",
  measurementId: "G-XZTS7E0VW5",
  databaseURL: "https://note-list-yt-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);

export default app;
