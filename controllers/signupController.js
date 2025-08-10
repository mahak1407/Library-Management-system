const User = require('../model/users');
exports.signupUser = async (req, res) => {
    const { email, username, password } = req.body;
    const existtingUser = await User.findOne({ username: username });
    const existtingEmail = await User.findOne({ email: email });

    try {
        if (existtingUser || existtingEmail) {
            return res.status(409).render('signup', { message: 'User Already Exists' })
        }
        const newuser = new User({
            email: email.toLowerCase(),
            password: password,
            username: username.toLowerCase()
        })

        await newuser.save();
        return res.render('signup', { message: "Added sucessfully" })
    }
    catch (err) {
        console.log("Error fetching user:", err);
        return res.status(500).send({ message: 'Error retrieving data' })
    }

}