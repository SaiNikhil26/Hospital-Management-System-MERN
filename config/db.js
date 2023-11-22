const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Database connected ${mongoose.connection.host}`.bgGreen.white)
    }
    catch(err){
        console.log(`Mongodb Server Issue ${err}`.bgRed.white)
    }
}

module.exports = connectDB;
