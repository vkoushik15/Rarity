const express = require('express')
const router = express.Router()

const{postitem,allitem,getitems,updatebidded,typenname} = require('../controllers/itemControllers')
router.post('/pitem',postitem)
router.get('/aitem',allitem)
router.get('/gitem',getitems)
router.put('/upitem/:id',updatebidded)
router.get('/titem',typenname)
module.exports = router