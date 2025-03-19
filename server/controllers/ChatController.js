const chatModel = require('../models/chatModel')
const userModel = require('../models/chatModel')
const mongoose = require('mongoose')
const createchat = async(req,res)=>{
    const newchat = new chatModel({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {
        const result = await newchat.save()
       return res.status(200).json(result)
    } catch (error) {
      return   res.status(400).send(error)
        
    } 
  
} 
const userChats = async(req,res)=>{

    try {
        const chat = await chatModel.find({
            members:{$in:[req.params.userId]}
        })
        
        const secondMemberIds = chat.map(chatDoc => chatDoc.members[1]);
      
          return res.status(200).json(chat)
         

    } catch (error) {
        return res.status(500).json(error)
    }
       
   
}
const findchat = async(req,res)=>{
    try {
        const chat = await chatModel.find({
            members:{$all:[req.params.firstId,req,params.secondId]}
        })
        return res.status(200).json(chat)
    } catch (error) {
       return res.status(400).send(error)
       
    }
  
}
const ischat = async(req,res)=>{
    try {
        const { member1, member2 } = req.body;
        
        // Validate input
        if (!member1 || !member2) {
            return res.status(400).json({ 
                success: false, 
                message: 'Both member IDs are required' 
            });
        }

        // Find chat where both members exist
        const existingChat = await chatModel.findOne({
            members: { $all: [member1, member2] }
        });
        if(existingChat){
            return res.status(200).send(true);
        }
        // Return response based on whether chat exists
        else{
            return res.status(200).send(false)
        }

    } catch (error) {
        console.error('Error checking chat existence:', error);
        return res.status(500).send(error );
    }
}
const getChatid = async(req,res)=>{
    try {
        const{member1,member2} = req.body
        if(!member1||!member2){
            console.log('both fieldsare required')
            return res.status(400).send('both fields are required')
        }
        const chat = await chatModel.findOne({
            members:{$all:[member1,member2]}
        })
       
        res.status(200).send(chat._id.toString())
        if(!chat){
            return res.status(404).send('no chat found')
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports = {createchat,userChats,findchat,getChatid,ischat}
