// // connect to MongoDB database
// const mongoose = require('mongoose')
// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://mahak:1407@cluster0.vauszcs.mongodb.net/')
//         console.log('Connected to MongoDB sucessfully')
//     }
//     catch (err) {
//         console.log('Error Occured:', err)
//     };
// }
// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mahak:1407@cluster0.vauszcs.mongodb.net/librarydb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.log('Error Occurred:', err);
  }
};

module.exports = connectDB;
