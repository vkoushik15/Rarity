/*import React,{useState,createContext,useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'
const UserContext = createContext()

const UserProvider = ({children})=>{
const[user,setUser]= useState(null)
useEffect(()=>{

    const fetchUserfromtoken =()=>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                const decodedtoken = jwtDecode(token)
                setUser(decodedtoken)
            } catch (error) {
                console.log('eror from context',error)
            }
        }
    }
    fetchUserfromtoken()
},[])


return(
    <UserContext.Provider value ={user}>
        {children}
    </UserContext.Provider>
)
}
export  {UserContext,UserProvider}
/*import React, { useState, createContext, useEffect } from "react";
import {jwt_decode} from "jwt-decode"; // Correct import

// Create Context
const UserContext = createContext();

// Provider Component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserFromToken = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decodedToken = jwt_decode(token); // Decode token
                    setUser(decodedToken); // Set user data from token
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        };

        fetchUserFromToken();
    }, []); // Runs only once on mount

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
*/
import React, { useState, createContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Make sure you have the correct import

// Create UserContext
const UserContext = createContext();

// UserProvider Component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to fetch user from the token
  const fetchUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Optional: Check for token expiration
        const currentTime = Date.now() / 1000; // Current time in seconds
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

  // Run the fetchUserFromToken function on mount
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
    <UserContext.Provider value={{ user, refreshUser: fetchUserFromToken }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
