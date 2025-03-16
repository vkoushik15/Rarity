const mongoose = require('mongoose')

const Db = async () => {
    try {
        await mongoose.connect("mongodb+srv://venkatkoushik15:Mn7UlWFxTtM64b04@rarity.27iht.mongodb.net/myDatabase?retryWrites=true&w=majority")
        console.log('vooonected to themongdb')
    } catch (error) {
        console.log('error in connecting to db',error)
    }
}
module.exports = Db