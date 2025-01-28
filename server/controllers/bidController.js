const bidModel = require('../models/bidModel')
const biddingModel = require('../models/biddingModel')
const createbid = async(req,res)=>{

   const{ownerId,ownername,productname,price} =req.body

   try {
    const Bid = await bidModel({ownerId,ownername,productname,price})
    const biddata = await Bid.save()
    res.status(200).send(biddata)

   } catch (error) {
    res.status(400).send('error in creating a room for bid ')
   }
    
}

const postbid = async(req,res)=>{
const {bidId,sendername,bidprice} =req.body
try {
    const bd = await biddingModel({bidId,sendername,bidprice})
    const bdd = await bd.save()
    res.status(200).send(bdd)

} catch (error) {
    res.status(400).send('error in postin the bid')
    console.log(error)
}
}

const getbid = async(req,res)=>{
    const bidid = req.query
   
    try {
        const gbi = await biddingModel.find({bidId:bidid.query}).sort({bidprice:-1})
        if(gbi){
            res.status(200).send(gbi)
        }
        if(!gbi){
            res.status(404).send('no room is found with the bidid')
        }
    } catch (error) {
        res.status(400).send('unable to givethe bid room details')
    }
}
const getbidId = async(req,res)=>{
    const{ownerId,ownername,productname,price} = req.query
    try {
        const result =await bidModel.findOne({
            ownerId,
            ownername,
            productname,
            price:Number(price)
        })
        if(result){
            res.status(200).send(result._id)
        }
        else{
            res.status(400).send('error in getting the bid id')
        }
    } catch (error) {
        res.status(404).send('no bid is found with these details')
    }

}
module.exports ={createbid,postbid,getbid,getbidId}