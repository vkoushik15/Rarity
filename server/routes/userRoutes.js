const express = require('express')
const route = express.Router()
const {register,Login,searchUsers,getUserdata,getuserposts}= require('../controllers/AuthController')
route.post('/register',register)
route.post('/login',Login)
route.get('/suser',searchUsers)
route.get('/gdata/:id',getUserdata)
route.get('/posts/:id',getuserposts)
module.exports = route