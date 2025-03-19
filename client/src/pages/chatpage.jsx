
import React, { useEffect, useRef, useState, useContext } from "react";
import SearchUsers from "../components/SearchUsers.jsx";
import Chatbox from "../components/chatbox.jsx";
import UserChats from "../components/UserChats.jsx";
import { io } from "socket.io-client";
import { UserContext } from "../context/context.jsx";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/navbar.jsx";

const Chatpage = () => {
    const socket = useRef();
    const [user1, setUser1] = useState(null); // State for the logged-in user
    const [selecteduser, setSelecteduser] = useState(null);
    const [auid, setAuid] = useState(null);
    const [sendmessage, setSendmessage] = useState(null);
    const [recmessage, setRecmessage] = useState(null);

    // Decode user from token on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser1(decodedUser); // Set the decoded user
                console.log("Decoded User:", decodedUser);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    // Initialize Socket.IO when user1 is available
    useEffect(() => {
        if (!user1) return;
        console.log('the checking for scoket in fe',user1.id)
        socket.current = io("ws://localhost:8800");

        socket.current.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        // Emit the new-user-add event with user1's ID
        
        socket.current.emit("new-user-add", user1.id);
        socket.current.on("receive-message", (data) => {
            console.log("Received message:", data);
            setRecmessage(data);
        });
        return () => {
            socket.current.disconnect();
        };
    }, [user1]); // Depend only on user1

    // Send message to the server
    useEffect(() => {
        if (sendmessage) {
            socket.current.emit("send-message", sendmessage);
            console.log('message for sendig is ',sendmessage)
        }
    }, [sendmessage]);

    // Receive message from the server


    // Handle user selection
    const handleselecteduser = (user, id) => {
        setSelecteduser(user);
        setAuid(id);
    };

    return (
        <>
        <Navbar/>
        <div style={styles.container}>
            <div style={styles.leftSidebar}>
                <div style={styles.searchContainer}>
                    <SearchUsers />
                </div>
                <div style={styles.userChatsContainer}>
                    <UserChats onselected={handleselecteduser} />
                </div>
            </div>
            <div style={styles.chatboxContainer}>
                <Chatbox selecteduser={selecteduser} auid={auid} setSendmessage={setSendmessage} recmessage={recmessage} />
            </div>
        </div>
        </>
    );
};

const styles = {
    container: {
        marginTop:"300px",
        display: "flex",
        height: "100vh",
    },
    leftSidebar: {
        width: "25%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#f4f4f4",
        borderRight: "1px solid #ddd",
    },
    searchContainer: {
        flex: 1,
    },
    userChatsContainer: {
        flexShrink: 0,
        marginTop: "20px",
    },
    chatboxContainer: {
        width: "75%",
        padding: "10px",
        backgroundColor: "#fff",
    },
};

export default Chatpage;
