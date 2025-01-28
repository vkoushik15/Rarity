
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/context";
import { jwtDecode } from "jwt-decode";
const SearchUsers = () => {
  //const user1 = useContext(UserContext)
  const token = localStorage.getItem('token')
  const user1 = jwtDecode(token)
  console.log('from user1 itis',user1.id)
  const [searchText, setSearchText] = useState(""); // Search input value
  const [results, setResults] = useState([]); // Results from the backend
  const [error, setError] = useState(null); // Error message
   
  const handleSearch = async () => {
    if (!searchText.trim()) {
      setError("Please enter a search term.");
      setResults([]);
      return;
    } 

    try {
      const response = await axios.get("http://localhost:8000/user/suser", {
        params: { text: searchText },
      });

      setResults(response.data); 
      setError(null); 
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No users found.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setResults([]);
    }
  };
 
  const handleUserClick = async(user) => {
    
      const members = {
        senderId:user1.id,
        receiverId:user._id
      }
    console.log('members are ',members)
    try {
      const addchat = await axios.post("http://localhost:8000/chats",members)
      console.log('from add chats',addchat)
      console.log('added succesfully')
    } catch (error) {
      console.log('error in adding',error)
    }
   

    }
  ;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "black" }}>Search Users</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter name or part of name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            color: "black",
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {results.length > 0 && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {results.map((user) => (
              <li
                key={user._id}
                style={{
                  color: "black",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p>
                  <strong
                    onClick={() => handleUserClick(user)}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Name: {user.name}
                  </strong>
                </p>
                {user.number && (
                  <p>
                    <strong>Number:</strong> {user.number}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
