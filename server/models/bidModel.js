const mongoose = require('mongoose')
const bidschema = mongoose.Schema({
  ownerId:{
   type:String
  },
  ownername:{type:String},
  productname:{type:String},
  price:{type:Number},

   })
const bidModel = mongoose.model('bidModel',bidschema)
module.exports=bidModel