
import React, { useState, useContext } from "react";
import axios from "axios";
import "../styling/sitem.css";
import { UserContext } from "../context/context";
import Navbar from "../components/navbar";
import { NavLink } from "react-router-dom";

const Searchitem = () => {
  const { userid } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  console.log("userid from context is", userid);

  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const types = selectedTypes.join(",");
      const response = await axios.get("http://localhost:8000/item/gitem", {
        params: { query, minprice: minPrice, maxprice: maxPrice, type: types },
      });

      setItems(response.data);
      console.log("Fetched items:", response.data);

      if (!response || response.data.length === 0) {
        setMsg("Items not found");
        console.log("Nothing found");
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setItems([]);
    }
  };

  const handleSwapRequest = async (ownerId, productname) => {
    console.log(ownerId,productname)
    const ischat = await axios.post('http://localhost:8000/chats/ischat',{
      member1:ownerId,
      member2:userid
    })
    console.log(ischat)
    if(ischat.data){
     try {
        const chatid = await axios.post('http://localhost:8000/chats/gcid',{
          member1:ownerId,
          member2:userid
        })
      console.log(chatid.data)
      try {
        const addmsg =await axios.post('http://localhost:8000/msg',{
          chatId:chatid.data,
          senderId:userid,
          text:`im interested in swapping this prdouct ${productname}`
        })
        alert('swap request sent sucessfully')
      } catch (error) {
        console.log('error in sedning msg to exisitng user',error)
      }
     } catch (error) {
      console.log('error inexisint guser',error)
     }


    }
    else{
      try {
        const createchat = await axios.post('http://localhost:8000/chats',{
          senderId:userid,
          receiverId:ownerId
        })
        
        console.log(createchat.data)
        console.log(createchat.data._id)
        console.log(createchat._id)
        const newchatid = createchat.data._id
        try {
          const admsg = await axios.post('http://localhost:8000/msg',{
            chatId:createchat.data._id,
            senderId:userid,
            text:`hi im interested in swapping with you the product ${productname}`
          })
          alert('swap request to new user sent')
        } catch (error) {
          
        }
      } catch (error) {
        console.log('error in creating new chat',error)
      }
 

    }
  };
  

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h1 className="searchitems">Search Items</h1>
        <form onSubmit={handleSubmit}>
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search text"
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div className="price-range">
            <label>
              Min Price:
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
              />
            </label>
            <label>
              Max Price:
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="1000"
              />
            </label>
          </div>

          <div className="checkbox-container">
            <span>Filter by Type:</span>
            <div className="labelss">
              {["a", "b", "c", "d"].map((type, idx) => (
                <label key={idx}>
                  <input type="checkbox" value={type} onChange={() => handleCheckboxChange(type)} />
                  {type.toUpperCase()}
                </label>
              ))}
            </div>
          </div>
        </form>

        <div className="displayitems">
          {items.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }} className="displaycards">
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "10px",
                    width: "250px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  className="dispcard"
                >
                  <img
                    src={item.picture}
                    alt={item.productname}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <h3 style={{ margin: "10px 0" }}>{item.productname}</h3>
                  <p>
                    <strong>Username:</strong> {item.username}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{item.price}
                  </p>
                  <p>
                    <strong>Type:</strong> {item.type}
                  </p>

                  <NavLink to={`/detailedDesc/${item._id}`}>View Details</NavLink>

                  {/* Swap Request Button */}
                  <button
                    onClick={() => handleSwapRequest(item.userId, item.productname)}
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Request to Swap
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>{msg}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Searchitem;
