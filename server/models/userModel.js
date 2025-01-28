const mongoose = require('mongoose')

const userschema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

}
,{timestamps:true}
)

const userModel = mongoose.model('User',userschema)
module.exports = userModel