import React from "react";
import { useState } from "react";
import "./Register.scss";
// import { auth } from "../../../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();

    const { email, password } = formRegister;

    console.log("data before send", email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("result", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p>Register Page</p>
        <input
          className="input"
          type="text"
          id="email"
          onChange={handleChangeText}
          placeholder="Email"
        />
        <input
          className="input"
          type="password"
          id="password"
          onChange={handleChangeText}
          placeholder="Password"
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      {/* <button>Go to Dashboard</button> */}
    </div>
  );
}

export default Register;
