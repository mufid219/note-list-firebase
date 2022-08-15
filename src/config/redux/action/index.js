import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
        };
        console.log(dataUser);
        dispacth({ type: "CHANGE_LOADING", value: false });
        dispacth({ type: "CHANGE_ISLOGIN", value: true });
        dispacth({ type: "CHANGE_USER", value: dataUser });

        console.log("success", user);
        resolve(true);
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
