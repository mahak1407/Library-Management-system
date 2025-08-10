// connect to MongoDB database
const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Library')
        console.log('Connected to MongoDB sucessfully')
    }
    catch (err) {
        console.log('Error Occured:', err)
    };
}
module.exports = connectDB;