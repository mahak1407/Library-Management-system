const User=require("../model/users");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});


 const sendOTP =async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.render('forgotPassword', { message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP',
        html: `<p>Your OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.render('forgotPassword', { message: 'Failed to send OTP' });
        }
        res.render('verifyOtp', { message: 'OTP sent to your email' });
    });
};

 const veriftOtp=async (req, res) => {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
        return res.render('verifyOtp', { message: 'Invalid or expired OTP' });
    }

    user.password = password;
    console.log(user.password);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    // res.render('login', { message: 'Password reset successful. Please login.' });
    res.redirect('/login?message=Password reset successful. Please login.');

};
module.exports = { sendOTP,veriftOtp };