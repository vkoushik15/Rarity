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
const markmsgseen = async (req,res) => {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
        return res.status(400).json({ message: "chatId and userId are required." });
    }

    try {
        await messageModel.updateMany(
            { chatId, senderId: { $ne: userId }, isSeen: false },
            { $set: { isSeen: true } }
        );
        res.status(200).json({ message: "Messages marked as seen." });
    } catch (error) {
        console.error("Error marking messages as seen:", error);
        res.status(500).json({ message: "Failed to mark messages as seen." });
    }

}
const getUnseenMessageCount = async (req, res) => {
    const { chatId, userId } = req.params;

    if (!chatId || !userId) {
        return res.status(400).json({ message: "chatId and userId are required." });
    }

    try {
        const unseenCount = await messageModel.countDocuments({
            chatId,
            senderId: { $ne: userId },
            isSeen: false
        });
        res.status(200).json({ unseenCount });
    } catch (error) {
        console.error("Error fetching unseen message count:", error);
        res.status(500).json({ message: "Failed to fetch unseen message count." });
    }
};


const getallunseen = async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "userId is required." });
      }
  
      console.log("User ID received:", userId);
  
      const unseencount = await messageModel.countDocuments({
        senderId: userId, // Filtering by senderId for now
        isSeen: false
      });
  
      console.log("Unseen message count:", unseencount);
      return res.status(200).json({ unseenCount: unseencount });
  
    } catch (error) {
      console.error("Error fetching unseen messages:", error);
      return res.status(500).json({ message: "Failed to fetch unseen messages." });
    }
  };

  
  module.exports = { addmessage, getMessage, markmsgseen, getUnseenMessageCount, getallunseen };
