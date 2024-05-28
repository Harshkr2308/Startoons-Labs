import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./image/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesignup = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    //  console.log("email, password", email, password);

    let result = await fetch("https://startoons-labs.onrender.com/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    // console.log("result", result);

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      
      // Check user role and navigate accordingly
      if (result.user.role === "admin") {
        navigate("/dash");
      } else {
        navigate("/profile");
      }
    } else {
      alert(result.result);
    }
  };

  return (
    <div className="main">
      <div className="left">
        <img src={logo} alt="SignUP" />
      </div>
      <div className="right">
        <form onSubmit={handleLogin}>
          <div className="txt">
            <h1>Sign In</h1>
          </div>
          <div>
            <input
              className="log"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              name="email"
              value={email}
              required
            />
          </div>
          <div>
            <input
              className="log"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              name="password"
              value={password}
              required
            />
          </div>
          <div className="btn">
            <button className="btn1" type="button" onClick={handlesignup}>
              Sign Up
            </button>
            <button className="btn2" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
