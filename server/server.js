const express = require('express')
const app = express()
const PORT =8000
const Db = require('./conn/conn')
const cors = require('cors')
const bodyParser = require('body-parser');
const corsoptions = {
    origin:"http://localhost:5173",
    method:"POST,GET,PUT,PATCH",
    credentials:true
}
app.use(bodyParser.json({ limit: '50mb' })); // Increase the JSON body size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Increase for URL-encoded bodies
app.use(cors(corsoptions))
const userrouter = require('./routes/userRoutes')
const chatrouter = require('./routes/chatRoutes')
const messagerouter = require('../server/routes/messageRoute')
const itemrouter = require('./routes/itemroutes')
const bidrouter = require('./routes/bidRoutes')
app.use(express.json())
app.use('/user',userrouter)
app.use('/chats',chatrouter)
app.use('/msg',messagerouter)
app.use('/item',itemrouter)
app.use('/bid',bidrouter)
Db().then(()=>{
    app.listen(PORT,()=>{
        console.log(`started at ${PORT}`)
    })
})

