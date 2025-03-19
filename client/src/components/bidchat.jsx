


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const Bidchat = () => {
    const [data, setData] = useState([]);
    const url = new URL(window.location.href);
    const postid = url.searchParams.get('query');

    console.log('Post ID from bidchat:', postid);

    useEffect(() => {
        const getData = async () => {
            try {
                const gdata = await axios.get(`http://localhost:8000/bid/gbid?query=${postid}`);
                console.log('Fetched data:', gdata.data);
                const sortedData = gdata.data.sort((a, b) => b.bidprice - a.bidprice); // Sort by bid price
                setData(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();

        const socket = io('http://localhost:8800');
        socket.on('update-bids', (newBid) => {
            console.log('New bid received:', newBid);
            setData((prevData) => {
                const updatedData = [...prevData, newBid];
                return updatedData.sort((a, b) => b.bidprice - a.bidprice); // Sort by bid price
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [postid]);

    return (
        <div className="bidchat-container">
            <div className="bidchat-box">
                <div className="bidchat-header">
                    <h2>Live Bidding</h2>
                    <p>Current Bids</p>
                </div>
                <div className="bidchat-content">
                    {data.map((item, index) => (
                        <div key={index} className="bid-item">
                            <div className="bid-sender">{item.sendername}</div>
                            <div className="bid-price">₹{item.bidprice}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bidchat;
