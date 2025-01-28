

/*import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import '../styling/navbar.css'// Import the custom CSS file

const Navbar = () => {
  const token = localStorage.getItem("token");
 const[isLoggedIn,setIsLoggedIn]=useState(false)
 const[user,setUser]=useState(null)
  useEffect(()=>{
    
 
  

  if (token) {
    try {
      const user1 = jwtDecode(token);
      setUser(user1)
      setIsLoggedIn(true)
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  },[token])
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
       
        <div className="navbar-title">Rarity</div>

       
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className="navbar-link">
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/chats" className="navbar-link">
                  Chats
                </NavLink>
              </li>
              <li>
                <NavLink to={`/profile?query=${user.id}`} className="navbar-link">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/uploads" className="navbar-link">
                  Uploads
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="navbar-button"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="navbar-link">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="navbar-link">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
*/
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "../styling/navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Create an async function inside useEffect
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = await jwtDecode(token);  // Await for token decoding
          setUser(decodedUser);
          setIsLoggedIn(true);
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

    // Call the async function
    checkLoginStatus();
  }, []);  // The empty dependency array ensures this runs once when the component mounts

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");  // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Navbar Title */}
        <div className="navbar-title">Rarity</div>

        {/* Navbar Links */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className="navbar-link">
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/chats" className="navbar-link">
                  Chats
                </NavLink>
              </li>
              <li>
                <NavLink to={`/profile?query=${user.id}`} className="navbar-link">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/uploads" className="navbar-link">
                  Uploads
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="navbar-button"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="navbar-link">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="navbar-link">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
