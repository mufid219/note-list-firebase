import { createUserWithEmailAndPassword } from "firebase/auth";

export const actionChangeUsername = () => (dispacth) => {
  setTimeout(() => {
    return dispacth({ type: "CHANGE_USER", value: "mufid isnan" });
  }, 2000);
};

export const registerNewUser = (data) => (dispacth) => {
  dispacth({ type: "CHANGE_LOADING", value: true });
  return createUserWithEmailAndPassword(data.auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      dispacth({ type: "CHANGE_LOADING", value: false });

      console.log("result", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispacth({ type: "CHANGE_LOADING", value: false });

      console.log(errorCode, errorMessage);
    });
};
