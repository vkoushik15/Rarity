const mongoose = require('mongoose')

const itemschema =  mongoose.Schema({

    username:{
        type:String,
        required:true,
        
    },
    productname:{
        type:String,
        required:true
    },
    userId:{type:String},
    price:{type:Number,required:true},
    picture:{type:String},
    type:{type:String},
    bidded:{type:Boolean,default:false}
})
const itemModel = mongoose.model('itemModel',itemschema)
module.exports = itemModel