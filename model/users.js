const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    otp: {
        type: String,
    },
    
    otpExpiry: {
        type: Date,
    },

    username: {
        unique: true,
        type: String,
        required: true
    }
}, { timestamps: true })




userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err);
    }

})

module.exports = mongoose.model('User', userSchema)