import React from 'react'
import BidInput from '../components/bidinput'
import Bidchat from '../components/bidchat'

const Bidding = () => {
   const url = new URL(window.location.href)
   const query= url.searchParams.get('query')

    console.log('hi from bidding ',query)
  return (
    <>
    
    <BidInput />
    <Bidchat/>
    
    </>
  )
}

export default Bidding