
import React, { useState, useContext } from "react";
import axios from "axios";
import '../styling/login.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/context";
import bgimage from "../images/login.jpg"; 
import "../styling/login.css"; 
import Navbar from "../components/navbar";

const Login = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        loginData
      );

      alert("Login successful");
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="login-container">
      <div className="login-bg">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="loginName">Name:</label>
          <input
            type="text"
            id="loginName"
            value={loginData.name}
            onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
            required
            className="login-input"
          />

          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            id="loginPassword"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
            className="login-input"
          />

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
