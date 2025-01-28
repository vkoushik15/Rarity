const express = require('express')
const router = express.Router()

const{postitem,allitem,getitems,updatebidded} = require('../controllers/itemControllers')
router.post('/pitem',postitem)
router.get('/aitem',allitem)
router.get('/gitem',getitems)
router.put('/upitem/:id',updatebidded)
module.exports = router