

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../styling/navbar.css";

const Navbar = ({ logged }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(logged);
  const [user, setUser] = useState(null);
  const [unseenCount, setUnseenCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUser(decodedUser);
          setIsLoggedIn(true);
          fetchUnseenMessageCount(decodedUser.id);
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, [location]);

 
  const fetchUnseenMessageCount = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:8000/msg/gumc/all`,{
        userId:userId
      });
      setUnseenCount(response.data.unseenCount);
      console.log(unseenCount)
    } catch (error) {
      console.error("Error fetching unseen message count:", error);
    }
  };
  useEffect(()=>{
    fetchUnseenMessageCount()
      },[])
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">Rarity</div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className="navbar-link">Home</NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/chats"
                  className="navbar-link"
                  style={{
                    backgroundColor: unseenCount > 0 ? "#dcdcdc" : "transparent",
                    position: "relative",
                    padding: "8px 15px",
                    borderRadius: "5px",
                  }}
                >
                  Chats
                  {unseenCount > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    />
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/profile?query=${user.id}`} className="navbar-link">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/uploads" className="navbar-link">Uploads</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="navbar-button">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="navbar-link">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register" className="navbar-link">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
