
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const Bidchat = () => {
  const [data, setData] = useState([]); // Initialize data as an array
 const url = new URL(window.location.href)
 const postid =url.searchParams.get('query')
 
  console.log('from bidchat the post is',postid)
  useEffect(() => {
    const getData = async () => {
      try {
        const gdata = await axios.get(
          `http://localhost:8000/bid/gbid?query=${postid}`
        );
        console.log(gdata.data);
        setData(gdata.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
    const socket= io('http://localhost:8800')
    socket.on("update-bids",(newBid)=>{
      console.log('newbid recieved',newBid)
      setData((prevdata)=>[...prevdata,newBid])
    })
    return ()=>{
      socket.disconnect()
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:"400px",
        height: '100vh',
        width:'700px',
        backgroundColor: '#f5f5f5',
      }}
    >
     
      <div
        style={{
          width: '75%',
          height: '600px',
          border: '2px solid black',
          borderRadius: '10px',
          backgroundColor: 'white',
          overflowY: 'auto',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            padding: '10px',
            borderBottom: '2px solid gray',
          }}
        >
          Bid Details
        </div>

        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.2)';
              }}
            >
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.sendername}</p>
              <p style={{ fontSize: '14px', marginTop: '5px' }}>Bid Price: {item.bidprice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bidchat;*/
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';

// const Bidchat = () => {
//   const [data, setData] = useState([]); // Initialize data as an array
//   const url = new URL(window.location.href);
//   const postid = url.searchParams.get('query');

//   console.log('from bidchat the post is', postid);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const gdata = await axios.get(
//           `http://localhost:8000/bid/gbid?query=${postid}`
//         );
//         console.log(gdata.data);
//         // Sort the fetched data in descending order of bidprice
//         const sortedData = gdata.data.sort((a, b) => b.bidprice - a.bidprice);
//         setData(sortedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     getData();

//     const socket = io('http://localhost:8800');
//     socket.on('update-bids', (newBid) => {
//       console.log('newbid received', newBid);
//       setData((prevData) => {
//         const updatedData = [...prevData, newBid];
//         // Sort the updated data in descending order of bidprice
//         return updatedData.sort((a, b) => b.bidprice - a.bidprice);
//       });
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: '400px',
//         height: '100vh',
//         width: '700px',
//         backgroundColor: '#f5f5f5',
//       }}
//     >
//       {/* Outer box */}
//       <div
//         style={{
//           width: '75%',
//           height: '600px',
//           border: '2px solid black',
//           borderRadius: '10px',
//           backgroundColor: 'white',
//           overflowY: 'auto',
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             backgroundColor: 'black',
//             color: 'white',
//             textAlign: 'center',
//             fontSize: '20px',
//             fontWeight: 'bold',
//             padding: '10px',
//             borderBottom: '2px solid gray',
//           }}
//         >
//           Bid Details
//         </div>

//         {/* Scrollable content */}
//         <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//           {data.map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundColor: 'green',
//                 color: 'white',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
//                 transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.02)';
//                 e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.2)';
//               }}
//             >
//               <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.sendername}</p>
//               <p style={{ fontSize: '14px', marginTop: '5px' }}>Bid Price: {item.bidprice}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bidchat;


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