import React from "react";
import { useState } from "react";
import "./Register.scss";
import { getAuth } from "firebase/auth";
import Button from "../../../components/atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../../../config/redux/action";

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

  const isLoading = useSelector((state) => state.isLoading);
  const dispacth = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();

    const { email, password } = formRegister;

    const data = { auth, email, password };

    dispacth(registerNewUser(data));
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
        <Button title="Register" loading={isLoading} />
      </form>
      {/* <button>Go to Dashboard</button> */}
    </div>
  );
}

export default Register;
