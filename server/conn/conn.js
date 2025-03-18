const mongoose = require('mongoose')

const Db = async () => {
    try {
        await mongoose.connect(PROCESS.ENV.URI)
        console.log('vooonected to themongdb')
    } catch (error) {
        console.log('error in connecting to db',error)
    }
}
module.exports = Db
