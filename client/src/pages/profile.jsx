/*import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
const Profile = () => {
    const url= new URL(window.location.href)
    const id = url.searchParams.get('query')
    const [query,setQuery] = useState('')
    setQuery(id)
    useEffect(()=>{
    const id = resp.id
    const getuserposts = async()=>{
        const getp = await axios.get(`http://localhost:8000/user/posts/${query}`)
        console.log(getp)
    }
     getuserposts()

    },[])
  return (
    <>
    <h1>Profile</h1>
    
    </>
    
  )
}

export default <Profile*></Profile*/
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("query"); // Extract query parameter from URL
  const [query, setQuery] = useState("");

  // Set `query` state only once when the component mounts
  useEffect(() => {
    setQuery(id);
  }, [id]);

  // Fetch user posts based on `query`
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/posts/${query}`);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (query) {
      getUserPosts();
    }
  }, [query]);

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
