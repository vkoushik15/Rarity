const express = require('express')
const router = express.Router()
const {createchat,userChats,findchat,getChatid} = require('../controllers/ChatController')
router.post('/',createchat)
router.get('/:userId',userChats)
router.get('/find/:firstId/:secondId',findchat)
router.post('/gcid',getChatid)
module.exports = router