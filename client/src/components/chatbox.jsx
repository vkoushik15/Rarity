/*import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/context'; // Assuming the context is stored in context.js

const Chatbox= ({ chatId }) => {
  const [text, setText] = useState(''); // State to hold the message text
  const user = useContext(UserContext) // Get the senderId from the context API

  // Handle the input change
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that the message is not empty
    if (!text.trim()) {
      return; // Optionally show a message if the text is empty
    }

    try {
      // Post the message to the backend
      const response = await axios.post('http://localhost:8000/msg', {
        chatId:"678c9412ae59878fdab55c04",
        senderId: user.id,  // Using senderId from context
        text,              // The text entered by the user
      });

      console.log('Message sent:', response.data);
      setText(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    padding: '5px',
  },
  input: {
    width: '80%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Chatbox;*/
/*
import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../context/context'; // Assuming the context is stored in context.js

const Chatbox = ({ chatId ,selecteduser,auid,setSendmessage,recmessage}) => {
  const [text, setText] = useState(''); // State to hold the message text
  const [messages, setMessages] = useState([]); // State to hold all messages
  const user = useContext(UserContext); // Get the senderId from the context API
  const messageEndRef = useRef(null); // Ref to scroll to the latest message
  const[chatid,setChatid]=useState("")

  // Fetch messages on component mount or when chatId changes
  //console.log('the id from user is ',user.id)
  console.log('auid is ',auid)
  console.log('seelected user is ',selecteduser)
  console.log('memeber1 is',user)
  useEffect(()=>{
    const getChatId = async()=>{
        const members ={
            member1:user.id,
            member2:auid
        }
        const chati= await axios.post('http://localhost:8000/chats/gcid',members)
        console.log('the chat id is this',chati)
        console.log('agian the chat id is',chati.data)
        setChatid(chati.data)
    }
    getChatId()
  },[auid])
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/msg/${chatid}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatid]);

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle the input change
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that the message is not empty
    if (!text.trim()) {
      return; // Optionally show a message if the text is empty
    }

    try {
      // Post the message to the backend
      const response = await axios.post('http://localhost:8000/msg', {
        chatId:chatid,
        senderId: user.id, // Using senderId from context
        text, // The text entered by the user
      });
      console.log('response now is',response) 
      // Add the new message to the messages state (optimistic UI update)
      setMessages((prevMessages) => [...prevMessages, response.data]);

      setText(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
 useEffect9(()=>{
console.log("message arrival",recmessage)
if(recmessage!=null && recmessage.chatId == chat._id){
  setMessages([...messages,recmessage])
}

 })
  return (
    <>
    <h1 style={{
        marginBottom:"-70px"
    }}>{selecteduser?selecteduser:'tap to chat'}</h1>
    <div style={styles.container}>
      <div style={styles.chatContainer}>
        {messages.map((message) => (
          <div
            key={message._id}
            style={{
              ...styles.message,
              alignSelf: message.senderId === user.id ? 'flex-end' : 'flex-start',
              backgroundColor: message.senderId === user.id ? '#DCF8C6' : '#fff',
            }}
          >
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={messageEndRef}></div> {/}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
    </>
  );
};

// Basic inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '10px',
    height: '100vh',
    width: '100%',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    maxHeight: '80vh', // Limit the height of the chat container
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
  },
  message: {
    maxWidth: '80%',
    padding: '10px',
    margin: '5px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    wordWrap: 'break-word',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '80%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Chatbox;*/

/*import React, { useState, useContext, useEffect, useRef } from "react";

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
              console.log("Decoded User in Chatbox:", decodedUser);
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

      if (!text.trim() || !user || !auid) return;

      const messageData = {
          chatId: chatid,
          senderId: user.id,
          receiverId: auid,
          text,
      };

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
                {messages.map((message) => (
                    <div
                        key={message._id}
                        style={{
                            ...styles.message,
                            alignSelf: message.senderId === user.id ? "flex-end" : "flex-start",
                            backgroundColor: message.senderId === user.id ? "#DCF8C6" : "#fff",
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
        justifyContent: "flex-end",
        height: "100vh",
        width: "100%",
    },
    chatContainer: {
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        maxHeight: "80vh",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
    },
    message: {
        maxWidth: "80%",
        padding: "10px",
        margin: "5px",
        borderRadius: "10px",
        wordWrap: "break-word",
    },
    form: {
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px 20px",
        borderRadius: "5px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
};

export default Chatbox;
 <div style={styles.chatContainer}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        style={{
                            ...styles.message,
                            alignSelf: message.senderId === user.id ? "flex-end" : "flex-start",
                            backgroundColor: message.senderId === user.id ? "#DCF8C6" : "#fff",
                        }}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div> 

   */
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
                console.log("Decoded User in Chatbox:", decodedUser);
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

        if (!text.trim() || !user || !auid) return;

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
