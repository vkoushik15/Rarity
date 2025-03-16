
import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/context";
import { jwtDecode } from "jwt-decode";

const Chatbox = ({ selecteduser, auid, setSendmessage, recmessage }) => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatid, setChatid] = useState("");
    const [user, setUser] = useState(null); // State to store decoded user data
    const messageEndRef = useRef(null);

    // Decode user from token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
               // console.log("Decoded User in Chatbox:", decodedUser);
            } catch (error) {
                console.error("Error decoding token in Chatbox:", error);
            }
        }
    }, []);

    // Fetch chat ID
    useEffect(() => {
        const getChatId = async () => {
            if (!user || !auid) return;

            try {
                const members = {
                    member1: user.id,
                    member2: auid,
                };
                const response = await axios.post("http://localhost:8000/chats/gcid", members);
                setChatid(response.data);
            } catch (error) {
                console.error("Error fetching chat ID:", error);
            }
        };

        getChatId();
    }, [auid, user]);

    // Fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            if (!chatid) return;

            try {
                const response = await axios.get(`http://localhost:8000/msg/${chatid}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [chatid]);

    // Scroll to the latest message
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle incoming messages
    useEffect(() => {
        if (recmessage && recmessage.chatId === chatid) {
            setMessages((prev) => [...prev, recmessage]);
        }
    }, [recmessage, chatid]);

    // Handle input change
    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('heiieee')

      //  if (!text.trim() || !user || !auid) return;


        console.log('chatid',chatid)
        console.log('senderid',user.id)
        console.log('receiverid',auid)
        console.log('text',text)
        const messageData = {
            chatId: chatid,
            senderId: user.id,
            receiverId: auid,
            text,
        };
        

        console.log("Sending message:", messageData);

        try {
            const response = await axios.post("http://localhost:8000/msg", messageData);
            setMessages((prev) => [...prev, response.data]);
            setSendmessage(messageData); // Send message to socket
            setText(""); // Clear input
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h1>{selecteduser ? selecteduser : "Tap to chat"}</h1>
            <div style={styles.chatContainer}>
                {messages.map((message, index) => (
                    <div
                        key={message.id || `${message.senderId}-${index}`} // Ensure a unique key
                        style={{
                            ...styles.message,
                            alignSelf: message.senderId === user?.id ? "flex-end" : "flex-start",
                            backgroundColor: message.senderId === user?.id ? "#DCF8C6" : "#fff",
                        }}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={text}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Send
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    chatContainer: {
        flex: 1,
        overflowY: "scroll",
        padding: "10px",
        backgroundColor: "#f1f1f1",
    },
    message: {
        backgroundColor: "#f1f1f1",
        padding: "8px",
        margin: "5px 0",
        borderRadius: "5px",
        maxWidth: "60%",
    },
    form: {
        display: "flex",
        borderTop: "1px solid #ddd",
        padding: "10px",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        width:"200px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    button: {
        marginLeft: "10px",
        padding: "10px",
        backgroundColor: "#25D366",
        border: "none",
        borderRadius: "5px",
        color: "#fff",
        width:"120px"
    },
};

export default Chatbox;
