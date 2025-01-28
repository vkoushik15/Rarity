const mongoose = require('mongoose')

const chatschema = mongoose.Schema({
    members:{
      type:Array
    }
},{timestamps:true})

const chatModel = mongoose.model('chatModel',chatschema)
module.exports = chatModel