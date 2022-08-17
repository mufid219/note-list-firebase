import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { onValue, push, ref, set } from "firebase/database";
import { database } from "../../firebase";

export const actionChangeUsername = () => (dispacth) => {
  setTimeout(() => {
    return dispacth({ type: "CHANGE_USER", value: "mufid isnan" });
  }, 2000);
};

export const registerNewUser = (data) => (dispacth) => {
  return new Promise((resolve, reject) => {
    dispacth({ type: "CHANGE_LOADING", value: true });
    createUserWithEmailAndPassword(data.auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispacth({ type: "CHANGE_LOADING", value: false });

        console.log("success", user);
        resolve(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispacth({ type: "CHANGE_LOADING", value: false });

        console.log(errorCode, errorMessage);
        reject(false);
      });
  });
};

export const loginUser = (data) => (dispacth) => {
  return new Promise((resolve, reject) => {
    dispacth({ type: "CHANGE_LOADING", value: true });
    signInWithEmailAndPassword(data.auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const dataUser = {
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
          refreshToken: user.stsTokenManager.refreshToken,
        };
        console.log(dataUser);
        dispacth({ type: "CHANGE_LOADING", value: false });
        dispacth({ type: "CHANGE_ISLOGIN", value: true });
        dispacth({ type: "CHANGE_USER", value: dataUser });

        console.log("success", user);
        resolve(dataUser);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispacth({ type: "CHANGE_LOADING", value: false });
        dispacth({ type: "CHANGE_ISLOGIN", value: false });

        console.log(errorCode, errorMessage);
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => (dispacth) => {
  push(ref(database, "notes/" + data.userId), {
    title: data.title,
    date: data.date,
    content: data.content,
  });
};

export const getDataFromAPI = (userId) => (dispacth) => {
  return new Promise((resolve, reject) => {
    const starCountRef = ref(database, "notes/" + userId);
    onValue(starCountRef, (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispacth({ type: "CHANGE_NOTES", value: data });
      console.log(data);
      resolve(data);
    });
  });
};

export const updateDataAPI = (data) => (dispacth) => {
  return new Promise((resolve, reject) => {
    set(ref(database, `notes/${data.userId}/${data.noteId}`), {
      title: data.title,
      date: data.date,
      content: data.content,
    })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(false);
      });
  });
};
