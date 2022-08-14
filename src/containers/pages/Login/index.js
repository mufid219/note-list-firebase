import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionChangeUsername } from "../../../config/redux/action";

function Login() {
  const state = useSelector((state) => state);
  const dispacth = useDispatch();
  console.log("state", state);
  return (
    <div>
      <p>Login Page {state.user}</p>
      <button onClick={() => dispacth(actionChangeUsername())}>
        Change username
      </button>
      <button>Go to Dashboard</button>
    </div>
  );
}

export default Login;
