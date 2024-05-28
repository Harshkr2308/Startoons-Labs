import React, { useState } from "react";
import logo from "./image/logo.png";
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";

const SignUP = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male", 
  });
  const navigate = useNavigate();
  const handlesignin = () => {
    navigate("/login");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://startoons-labs.onrender.com/register",
        formData
      );
      // console.log(response.data);
      navigate("/login"); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main">
      <div className="left">
        <img src={logo} alt="SignUP" />
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gen">
            <label>Gender:</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className="btn">
            <button className="btn1" type="submit">
              Sign Up
            </button>
            <button className="btn2" type="button" onClick={handlesignin}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUP;
