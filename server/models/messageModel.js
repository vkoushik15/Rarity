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
    },
    isSeen:{
        type:Boolean,
        default:false
    }
},
{timestamps:true})
const messageModel = mongoose.model('Messages',messageschema)
module.exports = messageModel