const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    AuthorId: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Bio: { type: String, required: true },
    Nationality: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);
