const mongoose = require('mongoose')

const bddingschema = mongoose.Schema({

    bidId:{
        type:String
    },
    sendername:{
        type:String
    },
    bidprice:{
        type:Number
    }
})
const biddingModel = mongoose.model('biddingModel',bddingschema)
module.exports = biddingModel