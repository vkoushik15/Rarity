
import React, { useState } from "react";
import axios from "axios";
import'../styling/sitem.css'
const Searchitem = () => {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [items, setItems] = useState([]);
  const[msg,setMsg]= useState("")
  // Handle checkbox selection
  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // Submit search
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const types = selectedTypes.join(","); // Join the selected types (a, b, c, d) into a comma-separated string
      const response = await axios.get("http://localhost:8000/item/gitem", {
        params: {
          query,
          minprice: minPrice,
          maxprice: maxPrice,
          type: types, // Send types to the backend
        },
      });
    
      setItems(response.data);
      if(!response){
        setMsg("items not found")
        console.log('nothign ofund')
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setItems([]); // Reset items if no data is found
    }
  };

  return (
<div className="form-container">
  <h1 className="searchitems">Search Items</h1>
  <form onSubmit={handleSubmit}>
    {/* Search Bar */}
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

    {/* Price Range */}
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

    {/* Type Checkboxes */}
    <div className="checkbox-container">
      <span>Filter by Type:</span>
      <div className="labelss">
        {["a", "b", "c", "d"].map((type, idx) => (
          <label key={idx}>
            <input
              type="checkbox"
              value={type}
              onChange={() => handleCheckboxChange(type)}
            />
            {type.toUpperCase()}
          </label>
        ))}
      </div>
    </div>
  </form>



      {/* Display Items */}
      <div className="displayitems">
        {items.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" } } className="displaycards">
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
                <p><strong>Username:</strong> {item.username}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <p><strong>Type:</strong> {item.type}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>{msg}</p>
        )}
      </div>
    </div>
  );
};

export default Searchitem;

