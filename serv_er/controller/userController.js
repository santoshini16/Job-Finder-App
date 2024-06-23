const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const JWT_PRIVATE_KEY= process.env.JWT_PRIVATE_KEY;
function registerUser() {
    return async (req, res, next) => {
        try {
            const { name, email, mobile, password } = req.body;

            const existingUser = await User.findOne({ email: email });

            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists, please use another email address',
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = new User({
                    name,
                    email,
                    mobile,
                    password: hashedPassword,
                });
                console.log(newUser);

                await newUser.save();

                res.status(201).json({
                    message: 'User created successfully',
                    user: newUser
                });
            }
        } catch (error) {
            console.log(error);
            next("Error Creating User", error);
        }

    };
}

function handleLogin() {
    return async (req, res,next) => {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email: email });

            if (existingUser) {
                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign(
                        { userID: existingUser._id },
                        JWT_PRIVATE_KEY 
                    );
                    res.status(200).json({
                        message: 'Login successful',
                        email: existingUser.email,
                        token
                    });

                    // a jsonwebtoken is a string that tells the server that the user is authenticated
                } else {
                    res.status(400).json({
                        message: 'Invalid credentials',
                    });
                }
            } else {
                res.status(400).json({
                    message: 'User not found',
                });
            }
        } catch (error) {
            next("Error Logging In", error);
        }
    };
}

module.exports = {
    registerUser,
    handleLogin
};