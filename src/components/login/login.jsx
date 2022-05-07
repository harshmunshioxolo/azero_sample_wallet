import React, { useState } from "react";
import "./login.css";
import {useNavigate} from 'react-router-dom';

export const Login = (props) => {
  let navigate = useNavigate();
  // use the useState hook
  const [text, setText] = useState(navigate('/'));
  const txt = "Create Account";

  return (
    <div
      className="wallet_login"
      style={{
        position: "absolute",
      }}
    >
      <div
        style={{
          position: "relative",
          left: props.x_container,
          top: props.y_container,
        }}
      >
        <button className="wallet_login-new" onClick={() => setText(navigate('/makeaccount'))}>{txt}</button>
      </div>

      <div
        style={{
          position: "relative",
          left: props.x_container,
          top: 1.2 * props.y_container,
        }}
      >
        <button className="wallet_login-existing">{"Access Existing"}</button>
      </div>
    </div>
  );
};
