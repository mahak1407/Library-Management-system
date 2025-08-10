const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    BookId: { type: Number, required: true, unique: true },
    Title: { type: String, required: true },
    Genre: { type: String, required: true },
    Publication_Year: { type: Number, required: true },
    authId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
