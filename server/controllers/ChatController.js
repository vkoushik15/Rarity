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
        //return res.status(200).json(chat)
        //console.log(chat)
        const secondMemberIds = chat.map(chatDoc => chatDoc.members[1]);
        //console.log(secondMemberIds)
       /* const userNames = await userModel.find({
            _id: { $in: secondMemberIds }
          }).select('name');
          console.log(userNames)*/
          return res.status(200).json(chat)
          //return res.status(200).json(userNames.map(user => user.name));

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
        //console.log('this from chat',chat)
       // console.log(chat._id.toString())
        res.status(200).send(chat._id.toString())
        if(!chat){
            return res.status(404).send('no chat found')
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports = {createchat,userChats,findchat,getChatid}
