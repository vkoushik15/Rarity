import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import{UserContext} from '../context/context'
import { jwtDecode } from 'jwt-decode';
import '../styling/upload.css'
import bgimage from '../images/upnew.jpg'
import Navbar from '../components/navbar';
function Upload() {
  const user1 = useContext(UserContext)
  console.log('hi')
  console.log('hi from ',user1.id)
  //const userId = user1.id 
    const navigate = useNavigate()
  const [username, setUserName] = useState('');
  const[productname,setProductname] = useState('')
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState('');
  const[type,setType] = useState('')

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPicture(reader.result);
    reader.readAsDataURL(file); // Convert to Base64
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    const user1 = jwtDecode(token)
    const userId = user1.id
    console.log('id from the user is ',userId)
   const post =  await axios.post('http://localhost:8000/item/pitem', {
      username,
      productname,
      userId,
      price,
      picture,
      type
    });
    if(post){
      console.log('hi it is uploaded')
      alert('Post Uploaded!');
    setUserName('');
    setPrice('');
    setPicture('')
    setType('')
    navigate('/')
    }
    
    
    
  };

  return (
    <>
    <Navbar/>
    <div className='handleupload'>
     <img src={bgimage}></img>
      <form onSubmit={handleSubmit} >
      <h2>Upload a Collectible</h2>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input type="text" placeholder='productname' value={productname} onChange={(e)=>setProductname(e.target.value)}/>
        <input
          type="number"
          placeholder="Starting Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} required />
        <input type ='text' value ={type} placeholder='tpye' onChange={(e)=>setType(e.target.value)}/>
        <button type="submit">Upload</button>
      </form>
    </div>
    </>
  );
}

export default Upload;
