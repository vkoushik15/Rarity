const messageModel = require('../models/messageModel')
const addmessage= async(req,res)=>{
    const{chatId,senderId,text}=req.body
    const message = new messageModel({
        chatId,
        senderId,
        text
    })
    try {
        const result = await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getMessage = async(req,res)=>{

    const {chatId } = req.params
   
    try {
        
        const result = await messageModel.find({chatId:chatId})
        
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}
module.exports = {addmessage,getMessage} 