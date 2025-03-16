const itemModel = require('../models/itemModel')

const postitem = async(req,res)=>{
 
    const {username,productname,userId,price,picture,type,bidded} = req.body
    try{
    const newitem = itemModel({username,productname,userId,price,picture,type,bidded})
    const item = await newitem.save()
    if(item){
        console.log('item saved succesffuly')
        res.status(200).send(item)
    }
 } catch (error) {
    res.status(400).send(error)
    console.log(error)
 }

}

const allitem =async(req,res)=>{

    try {
        const data = await itemModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send('unable to dinf the products')
    }
}

const getitems = async(req,res)=>{
try {
    const {query,minprice,maxprice,type} = req.query
    const filters={}
     console.log(query)
     
    if(query){
      filters.$or=[
        {username:new RegExp(query,'i')},
        {productname:new RegExp(query,'i')}
      ]
    }

    if(minprice){filters.price = {...filters.price,$gte:parseInt(minprice)}}
    if(maxprice){filters.price = {...filters.price ,$lte:parseInt(maxprice)}}
    if(type){filters.type =type}
    //console.log(filters)
    const prodcuts = await itemModel.find(filters)
    //console.log(prodcuts)
    if(prodcuts){
      res.status(200).send(prodcuts)
    }
    else{
          res.status(404).send('the product isnot found')
    }
   
} catch (error) {
    res.status(500).send('failed toget the product')
    console.log(error)
}
    
}
const updatebidded = async(req,res)=>{
    
try {
    const itemid = req.params.id;
    const Item = await itemModel.findByIdAndUpdate(
        itemid,
        {bidded:true},
        {new:true}
    )
    if(!Item){
        res.status(404).send('item not found')
    }
    else{
        res.status(200).json(Item)
    }

} catch (error) {
    res.status(400).send(error)
}
}
const typenname = async(req,res)=>{
  try {
    const{id}=req.query
    const item = await itemModel.findById(id)
    if(item){
      res.status(200).send({type:item.type,productname :item.productname})
    }
    else{
      res.status(404).send('item not found')
    }
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
}
module .exports ={postitem,allitem,getitems,updatebidded,typenname}