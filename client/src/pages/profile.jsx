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

export default Profile*/
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/navbar";
// const Profile = () => {
//   const url = new URL(window.location.href);
//   const id = url.searchParams.get("query"); 
//   const [query, setQuery] = useState("");

  
//   useEffect(() => {
//     setQuery(id);
//   }, [id]);

  
//   useEffect(() => {
//     const getUserPosts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/user/posts/${query}`);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching user posts:", error);
//       }
//     };

//     if (query) {
//       getUserPosts();
//     }
//   }, [query]);

//   return (
//     <>
//     <Navbar/>
//       <h1>Profile</h1>
//     </>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

const Profile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("query");

  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]); // Store fetched posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setQuery(id);
    }
  }, [id]);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/posts/${query}`);
        setPosts(response.data); // Store response data in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setError("Failed to load posts.");
        setLoading(false);
      }
    };

    if (query) {
      getUserPosts();
    }
  }, [query]);

  return (
    <>
      <Navbar />
      <h1>Profile</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
              <h3>{post.productname}</h3>
              <p>Price: ${post.price}</p>
              <img src={post.picture} alt={post.productname} style={{ width: "200px", height: "auto" }} />
              <p>Type :{post.type}</p>
            </div>
          ))
        ) : (
          !loading && <p>No posts found.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
//	KsHR58y3LSoiaCIw6i92SZgrd79Y3VHcct9zkGmS