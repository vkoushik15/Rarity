
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Pprofile = () => {
    const [data, setData] = useState(null); // User data
    const [posts, setPosts] = useState([]); // User's posts
    const { id } = useParams();

    useEffect(() => {
        const getUser = async () => {
            try {
                const userdata = await axios.get(`http://localhost:8000/user/gdata/${id}`);
                const userposts = await axios.get(`http://localhost:8000/user/posts/${id}`);
                setData(userdata.data);
                setPosts(userposts.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        getUser();
    }, [id]);

    return (
        <div style={styles.container}>
            {data && (
                <div style={styles.userInfo}>
                    <h2>{data.name}</h2>
                    <p>{data.email}</p>
                </div>
            )}

            <h3>User's Posts</h3>
            <div style={styles.postsContainer}>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={post.id || post._id || index} style={styles.card}>
                            <img src={post.picture} alt={post.productname} style={styles.image} />
                            <div style={styles.cardContent}>
                                <h4>{post.productname}</h4>
                                <p>Price: ${post.price}</p>
                                <p>Type: {post.type}</p>
                                <p>Bidded: {post.bidded ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
    },
    userInfo: {
        marginBottom: "20px",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px"
    },
    postsContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px"
    },
    card: {
        width: "250px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        overflow: "hidden",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
    },
    image: {
        width: "100%",
        height: "150px",
        objectFit: "cover"
    },
    cardContent: {
        padding: "10px"
    }
};

export default Pprofile;
