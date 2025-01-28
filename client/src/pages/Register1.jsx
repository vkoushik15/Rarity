/*import React,{useState} from 'react'
import axios from 'axios'

const Register = () => {
const [registerdata,setRegisterdata]=useState({name:"",email:"",password:""})
const handlesubmit=async(e)=>{
    e.preventDefault()
    try {
        const resp = await axios.post("http://localhost:8000/user/register",registerdata)
        console.log(resp)
        alert('registration sucesful')
    } catch (error) {
        alert('failure in registrationi')
        console.log(error)
    }
    


}
  
  return (
    <>
   <form onSubmit={handlesubmit}>
   
          <label htmlFor="registerName">Name:</label>
          <input
            type="text"
            id="registerName"
            value={registerdata.name}
            onChange={(e) => setRegisterdata({ ...registerdata, name: e.target.value })}
            required
          />
          
          <label htmlFor="registerName">Name:</label>
          <input
            type="text"
            id="registeremail"
            value={registerdata.email}
            onChange={(e) => setRegisterdata({ ...registerdata, email: e.target.value })}
            required
          />
          
          <label htmlFor="registerName">Name:</label>
          <input
            type="text"
            id="registerpassword"
            value={registerdata.password}
            onChange={(e) => setRegisterdata({ ...registerdata, password: e.target.value })}
            required
          />
          
    <button type='submit'>Submit</button>
   </form>
    </>
  )
}

export default <Register></Register> */
/*import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registerData)
    try {
      const response = await axios.post(
        "http://localhost:8000/user/register",
        registerData
      );
      console.log(response);
      alert("Registration successful");
    } catch (error) {
      alert("Failure in registration");
      
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="registerName">Name:</label>
        <input
          type="text"
          id="registerName"
          value={registerData.name}
          onChange={(e) =>
            setRegisterData({ ...registerData, name: e.target.value })
          }
          required
        />

        <label htmlFor="registerEmail">Email:</label>
        <input
          type="email"
          id="registerEmail"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
          required
        />

        <label htmlFor="registerPassword">Password:</label>
        <input
          type="password"
          id="registerPassword"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;*/
/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
 const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Payload:", registerData); // Debug payload

    try {
      const response = await axios.post(
        "http://localhost:8000/user/register",
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Registration successful");
      localStorage.setItem('token',response.data.token)
      navigate('/chats')
      
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.error || "Failure in registration");
      } else {
        console.error("Error:", error.message);
        alert("An error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="registerName">Name:</label>
        <input
          type="text"
          id="registerName"
          value={registerData.name}
          onChange={(e) =>
            setRegisterData({ ...registerData, name: e.target.value })
          }
          required
        />

        <label htmlFor="registerEmail">Email:</label>
        <input
          type="email"
          id="registerEmail"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
          required
        />

        <label htmlFor="registerPassword">Password:</label>
        <input
          type="password"
          id="registerPassword"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Payload:", registerData); // Debug payload

    try {
      const response = await axios.post(
        "http://localhost:8000/user/register",
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Registration successful");
      localStorage.setItem("token", response.data.token);
      navigate("/chats");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.error || "Failure in registration");
      } else {
        console.error("Error:", error.message);
        alert("An error occurred");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="registerName"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Name:
          </label>
          <input
            type="text"
            id="registerName"
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <label
            htmlFor="registerEmail"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            id="registerEmail"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <label
            htmlFor="registerPassword"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            id="registerPassword"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#007BFF")
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;


