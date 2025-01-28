/*
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/context";
import bgimage from '../images/login.jpg'
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
      navigate("/chats");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    }}>
      <image src={bgimage}></image>
      <h2 style={{ fontFamily: "Arial, sans-serif", marginBottom: "20px" }}>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label htmlFor="loginName" style={{ marginBottom: "8px" }}>Name:</label>
        <input
          type="text"
          id="loginName"
          value={loginData.name}
          onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
          required
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <label htmlFor="loginPassword" style={{ marginBottom: "8px" }}>Password:</label>
        <input
          type="password"
          id="loginPassword"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          required
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login
*/
import React, { useState, useContext } from "react";
import axios from "axios";
import '../styling/login.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/context";
import bgimage from "../images/login.jpg"; // Import the background image
import "../styling/login.css"; // Import the external CSS file

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
  );
};

export default Login;
