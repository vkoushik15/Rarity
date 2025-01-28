
/*import React, {  useEffect, useState } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserChats = ({ onselected }) => {
  const token = localStorage.getItem('token')
  const tokendata = jwtDecode(token)
  const user = tokendata; 
  const [chatMembersData, setChatMembersData] = useState([]);
 
  console.log("the user is ", user);

  useEffect(() => {
    if (!user) {
      console.warn("User is not logged in or not available");
      return;
    }
    console.log("vks", user.id);

    const fetchUserChats = async () => {
      try {
        const chatResponse = await axios.get(
          `http://localhost:8000/chats/${user.id}`
        );
        console.log("Chats response:", chatResponse.data);

        // Get the other member ID (not user.id), filter out undefined and duplicates
        const otherMemberIds = chatResponse.data
          .map((chat) =>
            chat.members.find((memberId) => memberId !== user.id) // Find the member that is not user.id
          )
          .filter((id) => id); // Remove undefined values

        console.log("Other member IDs:", otherMemberIds);

        // Remove duplicates
        const uniqueMemberIds = [...new Set(otherMemberIds)];

        console.log("Unique Member IDs:", uniqueMemberIds);

        // Fetch user details for each member ID
        const userDetails = await Promise.all(
          uniqueMemberIds.map(async (memberId) => {
            const userResponse = await axios.get(
              `http://localhost:8000/user/gdata/${memberId}`
            );
            return userResponse.data;
          })
        );

        console.log("Fetched user details:", userDetails);

        setChatMembersData(userDetails);
      } catch (error) {
        console.error("Error fetching chats or user details:", error);
      }
    };

    fetchUserChats();
  }, [user]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>User Chats</h2>
      {!user ? (
        <p>No user data available. Please log in.</p>
      ) : chatMembersData.length > 0 ? (
        <ul>
          {chatMembersData.map((member, index) => (
            <li
              key={index}
              onClick={() => onselected(member.name, member._id)} // Passing name and id separately
            >
              <strong>ID:</strong> {member._id} <br />
              <strong>Name:</strong> {member.name} <br />
              <strong>Email:</strong> {member.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chat members available.</p>
      )}
    </div>
  );
};

export default UserChats;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Fixed typo: remove curly braces if jwtDecode is the default export.

const UserChats = ({ onselected }) => {
  const [user, setUser] = useState(null); // Store decoded user data in state
  const [chatMembersData, setChatMembersData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokendata = jwtDecode(token);
      setUser(tokendata); // Set user data once when the token is decoded
    } else {
      console.warn("No token found in localStorage");
    }
  }, []); // Run once on component mount

  console.log("The user is ", user);

  useEffect(() => {
    if (!user) {
      console.warn("User is not logged in or not available");
      return;
    }
    console.log("vks", user.id);

    const fetchUserChats = async () => {
      try {
        const chatResponse = await axios.get(
          `http://localhost:8000/chats/${user.id}`
        );
        console.log("Chats response:", chatResponse.data);

        // Get the other member ID (not user.id), filter out undefined and duplicates
        const otherMemberIds = chatResponse.data
          .map((chat) =>
            chat.members.find((memberId) => memberId !== user.id) // Find the member that is not user.id
          )
          .filter((id) => id); // Remove undefined values

        console.log("Other member IDs:", otherMemberIds);

        // Remove duplicates
        const uniqueMemberIds = [...new Set(otherMemberIds)];

        console.log("Unique Member IDs:", uniqueMemberIds);

        // Fetch user details for each member ID
        const userDetails = await Promise.all(
          uniqueMemberIds.map(async (memberId) => {
            const userResponse = await axios.get(
              `http://localhost:8000/user/gdata/${memberId}`
            );
            return userResponse.data;
          })
        );

        console.log("Fetched user details:", userDetails);

        setChatMembersData(userDetails);
      } catch (error) {
        console.error("Error fetching chats or user details:", error);
      }
    };

    fetchUserChats();
  }, [user]); // Dependency array now depends on stable `user`

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>User Chats</h2>
      {!user ? (
        <p>No user data available. Please log in.</p>
      ) : chatMembersData.length > 0 ? (
        <ul>
          {chatMembersData.map((member, index) => (
            <li
              key={index}
              onClick={() => onselected(member.name, member._id)} // Passing name and id separately
            >
              <strong>ID:</strong> {member._id} <br />
              <strong>Name:</strong> {member.name} <br />
              <strong>Email:</strong> {member.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chat members available.</p>
      )}
    </div>
  );
};

export default UserChats;
