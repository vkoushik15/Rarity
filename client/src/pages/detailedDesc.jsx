
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styling/DetailedDesc.css'; 

const DetailedDesc = () => {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [numistaData, setNumistaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/item/titem?id=${id}`);
                console.log("Item Data:", response.data);
                setItemData(response.data);
            } catch (error) {
                console.error("Error fetching item:", error);
                setError("Failed to fetch item details.");
            }
        };

        getItem();
    }, [id]);

    useEffect(() => {
        const fetchNumistaData = async () => {
            if (!itemData) return;

            const { productname, type } = itemData;
            console.log(name,type)
            try {
                setLoading(true);

                const searchResp = await axios.get(`https://api.numista.com/v2/types?q=${encodeURIComponent(productname)}`, {
                    headers: { 'Numista-API-Key': 'KsHR58y3LSoiaCIw6i92SZgrd79Y3VHcct9zkGmS' }
                });

                if (!searchResp.data[type] || searchResp.data[type].length === 0) {
                    console.log("No matching item found.");
                    setNumistaData(null);
                    return;
                }

                const itemId = searchResp.data[type][0].id;
                console.log(`Numista ${type} ID:`, itemId);

                const detailResp = await axios.get(`https://api.numista.com/v2/types/${itemId}`, {
                    headers: { 'Numista-API-Key': 'KsHR58y3LSoiaCIw6i92SZgrd79Y3VHcct9zkGmS' }
                });

                setNumistaData(detailResp.data);
                console.log(`Numista ${type} Details:`, detailResp.data);

            } catch (error) {
                console.error("Error fetching Numista data:", error);
                setError("Failed to fetch Numista details.");
            } finally {
                setLoading(false);
            }
        };

        fetchNumistaData();
    }, [itemData]);

    return (
        <div className="container">
            <h1 className="header">Item Details</h1>

            {itemData ? (
                <div className="section">
                    <h2>{itemData.name}</h2>
                    <p><strong>Type:</strong> {itemData.type}</p>
                    <p><strong>Issuer:</strong> {itemData.issuer?.name || "Unknown"}</p>
                    <p><strong>Years in Use:</strong> {itemData.min_year} - {itemData.max_year}</p>
                </div>
            ) : (
                <p>Loading item details...</p>
            )}

            {loading && <p>Loading Numista details...</p>}
            {error && <p className="error">{error}</p>}

            {numistaData ? (
                <div className="numista-section">
                    <h2>Numista Details</h2>
                    <p><strong>Title:</strong> {numistaData.title}</p>
                    <p><strong>Category:</strong> {numistaData.category}</p>
                    <p><strong>Issuer:</strong> {numistaData.issuer?.name || "Unknown"}</p>
                    <p><strong>Years in Use:</strong> {numistaData.min_year} - {numistaData.max_year}</p>
                    <p><strong>Value:</strong> {numistaData.value?.text} ({numistaData.value?.currency?.name})</p>
                    <p><strong>Demonetized:</strong> {numistaData.demonetization?.is_demonetized ? "Yes" : "No"}</p>

                    <div className="coin-images">
                        <div className="coin-side">
                            <h3>Obverse</h3>
                            <p>{numistaData.obverse?.description || "No description available"}</p>
                            <p><strong>Lettering:</strong> {numistaData.obverse?.lettering || "N/A"}</p>
                            <p><strong>Translation:</strong> {numistaData.obverse?.lettering_translation || "N/A"}</p>
                            {numistaData.obverse?.thumbnail && (
                                <img src={numistaData.obverse.thumbnail} alt="Obverse" />
                            )}
                        </div>

                        <div className="coin-side">
                            <h3>Reverse</h3>
                            <p>{numistaData.reverse?.description || "No description available"}</p>
                            {numistaData.reverse?.thumbnail && (
                                <img src={numistaData.reverse.thumbnail} alt="Reverse" />
                            )}
                        </div>
                    </div>

                    <h3>References</h3>
                    {numistaData.references?.length > 0 ? (
                        <ul>
                            {numistaData.references.map((ref, index) => (
                                <li key={index}>
                                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                                        {ref.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No references available.</p>
                    )}

                    <p><a href={numistaData.url} target="_blank" rel="noopener noreferrer" className="numista-link">
                        View on Numista
                    </a></p>
                </div>
            ) : (
                <p>No Numista details found.</p>
            )}
        </div>
    );
};

export default DetailedDesc;
