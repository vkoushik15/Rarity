const express = require('express')
const {addmessage,getMessage,markmsgseen,getUnseenMessageCount,getallunseen}=require('../controllers/messageController')
const router = express.Router()
router.post('/',addmessage)
router.get('/:chatId',getMessage)
router.post('/markmsg',markmsgseen)
router.get('/gumc/:chatId/:userId', getUnseenMessageCount); 
router.post('/gumc/all', getallunseen); 
module.exports = router 