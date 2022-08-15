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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    const { email, password } = formRegister;

    const data = { auth, email, password };

    const dataRegister = await dispacth(registerNewUser(data)).catch(
      (err) => err
    );

    if (dataRegister) {
      setFormRegister({
        email: "",
        password: "",
      });
    }
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
          value={formRegister.email}
        />
        <input
          className="input"
          type="password"
          id="password"
          onChange={handleChangeText}
          placeholder="Password"
          value={formRegister.password}
        />
        <Button title="Register" loading={isLoading} />
      </form>
      {/* <button>Go to Dashboard</button> */}
    </div>
  );
}

export default Register;
