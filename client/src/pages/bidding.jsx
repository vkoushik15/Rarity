


import React from 'react';
import BidInput from '../components/bidinput';
import Bidchat from '../components/bidchat';
import Navbar from '../components/navbar';
import "../styling/bidding.css";

const Bidding = () => {
    const url = new URL(window.location.href);
    const query = url.searchParams.get('query');
    console.log('Query from bidding:', query);

    return (
        <>
            <Navbar />
            <div className="bidding-container">
                <Bidchat />
                <BidInput />
            </div>
        </>
    );
};

export default Bidding;
