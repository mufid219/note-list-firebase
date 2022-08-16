import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import Button from "../../../components/atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../config/redux/action";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.id]: e.target.value,
    });
  };

  const isLoading = useSelector((state) => state.isLoading);
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const { email, password } = formLogin;
    const data = { auth, email, password };

    const res = await dispacth(loginUser(data)).catch((err) => err);

    if (res) {
      localStorage.setItem("dataUser", JSON.stringify(res));
      navigate("/");
      return setFormLogin({
        email: "",
        password: "",
      });
    } else {
      console.log("login failed");
    }
  };
  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p>Login Page</p>
        <input
          className="input"
          type="text"
          id="email"
          onChange={handleChangeText}
          placeholder="Email"
          value={formLogin.email}
        />
        <input
          className="input"
          type="password"
          id="password"
          onChange={handleChangeText}
          placeholder="Password"
          value={formLogin.password}
        />
        <Button title="Login" loading={isLoading} />
      </form>
      {/* <button>Go to Dashboard</button> */}
    </div>
  );
}

export default Login;
