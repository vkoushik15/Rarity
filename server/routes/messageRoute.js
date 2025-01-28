const express = require('express')
const {addmessage,getMessage}=require('../controllers/messageController')
const router = express.Router()
router.post('/',addmessage)
router.get('/:chatId',getMessage)
module.exports = router 