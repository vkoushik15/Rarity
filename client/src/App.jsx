import { useState } from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register1'
import Login from './pages/Login'
import Chatpage from './pages/chatpage'
import UserChats from './components/UserChats'
import Home from './pages/Home'
import Upload from './pages/upload'
import Searchitem from './pages/searchitem'

import Bidding from './pages/bidding'
import Navbar from './components/navbar'
import Profile from './pages/profile'
import DetailedDesc from './pages/detailedDesc'
import Pprofile from './pages/Pprofile'
function App() {
return(
  <> 
<BrowserRouter>

  <Routes>
   
    <Route path='/' element={<Home/>}/>
    <Route path='/sitem' element={<Searchitem/>}/>
    <Route path ='/uploads' element={<Upload/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/chats' element={<Chatpage/>}/>
    <Route path ='/test' element={<UserChats/>}/>
    <Route path='/bidding' element={<Bidding/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/detailedDesc/:id' element={<DetailedDesc/>}/> 
    <Route path='/Pprofile/:id'element={<Pprofile/>}/>

  </Routes>
  </BrowserRouter>
  </>
)
}

export default App
