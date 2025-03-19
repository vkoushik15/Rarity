


import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';

const BidInput = () => {
    const url = new URL(window.location.href);
    const bidId = url.searchParams.get('query');
    const [inputBid, setInputBid] = useState('');

    const token = localStorage.getItem('token');
    const resp = jwtDecode(token);
    const sendername = resp.name;

    console.log('Bid ID from navigate:', bidId);

    const sendBid = async () => {
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
            setInputBid(''); // Clear input after sending bid

            // Emit new bid to Socket.IO server
            const socket = io('http://localhost:8800');
            socket.emit('new-bid', data);
        } catch (error) {
            console.error('Error sending bid:', error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Allow only numeric input
            setInputBid(value);
        }
    };

    return (
        <div className="bid-input-container">
            <div className="bid-input-box">
                <input
                    type="text"
                    value={inputBid}
                    onChange={handleInputChange}
                    placeholder="Enter your bid..."
                />
                <button onClick={sendBid}>Place Bid</button>
            </div>
        </div>
    );
};

export default BidInput;
