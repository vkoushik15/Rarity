import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';
const BidInput = () => {
  const url = new URL(window.location.href)
  const bidId = url.searchParams.get('query')
  const [inputBid, setInputBid] = useState(''); 
  
  const token = localStorage.getItem('token');
  const resp = jwtDecode(token);
  const sendername = resp.name; 
 
console.log('bidind from navigate',bidId)
  
  const sendBid = async () => {
    // Prevent sending if input is empty
    if (!inputBid.trim()) {
      alert('Please enter a bid amount.');
      return;
    }

    const data = {
      bidId,
      sendername,
      bidprice: inputBid,
    };

    try {
      const response = await axios.post('http://localhost:8000/bid/pbid', data);
      console.log('Bid sent successfully:', response.data);
      setInputBid(''); // Clear the input box
      const socket = io('http://localhost:8800')
      socket.emit('new-bid',data)
    } catch (error) {
      console.error('Error sending bid:', error);
    }
  };

  // Handle input change to allow only numbers
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputBid(value); // Update state only if the input is numeric
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-80 h-60 shadow-lg rounded-lg flex flex-col justify-between p-4">
        {/* Header */}
        <div className="bg-green-500 text-white p-2 rounded-t-lg text-center font-bold">
          Enter Your Bid
        </div>

        {/* Input Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputBid}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your bid..."
          />
          <button
            onClick={sendBid}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidInput;
