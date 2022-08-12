import React from "react";
import { useSelector } from "react-redux";

function Login() {
  const state = useSelector((state) => state);
  console.log("state", state);
  return (
    <div>
      <p>Login Page {state.isLogin}</p>
      <button>Go to Register</button>
      <button>Go to Dashboard</button>
    </div>
  );
}

export default Login;
