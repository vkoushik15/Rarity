

import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("http://localhost:8800");

const UserChats = ({ onselected }) => {
    const [user, setUser] = useState(null);
    const [chatMembersData, setChatMembersData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const tokendata = jwtDecode(token);
            setUser(tokendata);
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchUserChats = async () => {
            try {
                const chatResponse = await axios.get(`http://localhost:8000/chats/${user.id}`);
                const otherMemberIds = chatResponse.data
                    .map((chat) => chat.members.find((memberId) => memberId !== user.id))
                    .filter((id) => id);

                const uniqueMemberIds = [...new Set(otherMemberIds)];

                const userDetails = await Promise.all(
                    uniqueMemberIds.map(async (memberId) => {
                        const userResponse = await axios.get(`http://localhost:8000/user/gdata/${memberId}`);
                        const chatId = chatResponse.data.find(chat => chat.members.includes(memberId))._id;
                        const unseenMessagesResponse = await axios.get(`http://localhost:8000/msg/gumc/${chatId}/${user.id}`);
                        return {
                            ...userResponse.data,
                            chatId, // Add chatId to the member data
                            unseenCount: unseenMessagesResponse.data.unseenCount
                        };
                    })
                );

                setChatMembersData(userDetails);
            } catch (error) {
                console.error("Error fetching chats or user details:", error);
            }
        };

        fetchUserChats();

        // Listen for new chats
        socket.on("update-chats", (chatData) => {
            console.log("New chat received:", chatData);
            fetchUserChats(); // Refresh the chat list
        });

        // Cleanup socket listener
        return () => {
            socket.off("update-chats");
        };
    }, [user]);

    const handleChatClick = async (memberId, chatId, memberName) => {
        try {
            // Mark messages as seen
            await axios.post(`http://localhost:8000/msg/markmsg`, {
                chatId,
                userId: user.id
            });

            // Refresh the unseen message count for this chat
            const updatedChatMembersData = chatMembersData.map((member) => {
                if (member._id === memberId) {
                    return { ...member, unseenCount: 0 }; // Set unseenCount to 0
                }
                return member;
            });

            setChatMembersData(updatedChatMembersData);

            // Call the onselected function to open the chat
            onselected(memberName, memberId);
        } catch (error) {
            console.error("Error marking messages as seen:", error);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>User Chats</h2>
            {!user ? (
                <p>No user data available. Please log in.</p>
            ) : chatMembersData.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {chatMembersData.map((member, index) => (
                        <li
                            key={member._id || index}
                            style={{
                                padding: "15px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                backgroundColor: member.unseenCount > 0 ? "#e0e0e0" : "#f5f5f5", // Darker background for unseen messages
                                transition: "all 0.3s ease",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                position: "relative" // For positioning the red dot
                            }}
                            onClick={() => handleChatClick(member._id, member.chatId, member.name)}
                        >
                            <p>
                                <strong>Name:</strong>
                                <Link
                                    to={`/Pprofile/${member._id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "#007bff",
                                        fontWeight: "bold"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                                    onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                                >
                                    {member.name}
                                </Link>
                            </p>
                            {member.unseenCount > 0 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        backgroundColor: "red"
                                    }}
                                />
                            )}
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