
import React, { useState, createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 


const UserContext = createContext();


const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to fetch user from the token
  const fetchUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken.id);

        // Check for token expiration
        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.log("Token has expired");
          setUser(null);
          localStorage.removeItem("token");
        } else {
          setUser(decodedToken);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
  };

  // Run fetchUserFromToken on mount
  useEffect(() => {
    fetchUserFromToken();
  }, []);

  // Watch for changes in localStorage token
  useEffect(() => {
    const handleStorageChange = () => {
      fetchUserFromToken();
    };

    // Listen for `storage` events
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser: fetchUserFromToken, userid: user?.id }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
