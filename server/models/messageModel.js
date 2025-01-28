const mongoose = require('mongoose')

const messageschema = mongoose.Schema({

    chatId:{
        type:String
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    }
},
{timestamps:true})
const messageModel = mongoose.model('Messages',messageschema)
module.exports = messageModel