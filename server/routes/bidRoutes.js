const express = require('express')
const router = express.Router()
const{createbid,postbid,getbid,getbidId} = require('../controllers/bidController')
router.post('/cbid',createbid)
router.post('/pbid',postbid)
router.get('/gbid',getbid)
router.get('/gbidid',getbidId)
module.exports = router