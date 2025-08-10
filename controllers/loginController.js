const User = require('../model/users');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')


exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const found = await User.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: username.toLowerCase() }
            ]
        });

        if (!found) {
            return res.status(401).render('login', { message: "Invalid Credintials" })
        }
        const isMatch = await bcrypt.compare(password, found.password);

        if (!isMatch) {
            return res.status(401).render('login', { message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: found._id, username: found.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        return res.redirect('/home');

    } catch (err) {
        console.log("Error fetching user:", err);
        return res.status(500).render('login', { message: 'server error' })
    }
}


