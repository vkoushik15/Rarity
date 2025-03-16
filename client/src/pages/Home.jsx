
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Img from "../images/home1.jpg";
import "../styling/home.css"; // Import the custom CSS file
import Navbar from "../components/navbar";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null); // State to store the user ID
  const[logged,setLogged] =useState(false)
  const token = localStorage.getItem("token");
  
  // Check if token exists and decode user ID if it does
  useEffect(() => {
    if (token) {
      const user1 = jwtDecode(token);
      setUserId(user1.id); // Store user ID if token exists
      setLogged(true)
    }
  }, [token]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/item/aitem");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Function to handle the "Start Bid" button click
  const handleStartBid = async (post) => {
    const postid = post._id;
    const ownername = post.username;
    const productname = post.productname;
    const ownerId = post.userId;
    const price = post.price;

    try {
      const roomdata = { ownerId, ownername, productname, price };
      const createroom = await axios.post(
        "http://localhost:8000/bid/cbid",
        roomdata
      );
      console.log("The created room is", createroom.data._id);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/item/upitem/${postid}`
      );
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postid ? { ...p, bidded: true } : p
        )
      );
      console.log("Bidded updated:", response.data);
    } catch (error) {
      console.error("Error updating bid:", error);
    }
  };

  // Function to navigate to bidding
  const handlegobid = async (post) => {
    const getbidid = await axios.get(
      `http://localhost:8000/bid/gbidid?ownerId=${post.userId}&ownername=${post.username}&productname=${post.productname}&price=${post.price}`
    );
    navigate(`/bidding?query=${getbidid.data}`);
  };

  return (
    <>
    <Navbar logged={logged} />
    <div>
      <div className="image-container">
        <img src={Img} alt="Home" />
        <h1>Discover over a million unique collectibles waiting for you—each one a treasure, each one a story. Start your collection today and own a piece of something extraordinary!</h1>
      </div>
      <h1 style={{fontSize:"2rem",marginLeft:"400px"}}>Search products based on your choice </h1>
      <NavLink to="/sitem" className="search-link">
        Search Products
      </NavLink>
      <h2>Collectibles Gallery</h2>
      <div className="collectibles-gallery">
        {posts.map((post) => (
          <div key={post._id} className="collectible-card">
            <img src={post.picture} alt="not found" />
            <h3>{post.username}</h3>
            <h3>{post.productname}</h3>
            <p>Starting Price: ₹{post.price}</p>
            <p>Bidded: {post.bidded ? "Yes" : "No"}</p>
            {/* If user is logged in and the post is not bidded, show "Start Bid" button */}
            {userId && userId === post.userId && !post.bidded && (
              <button
                style={{ color: "blue" }}
                onClick={() => handleStartBid(post)}
              >
                Start Bid
              </button>
            )}
            {/* If the post is bidded, show the "Go to Bidding" button */}
            {(post.bidded&&token) && (
              <button
                style={{ color: "green" }}
                onClick={() => handlegobid(post)}
              >
                Go to Bidding
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;

