const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    debugger;
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const hashedPasswor = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPasswor,
            });
            res.status(200).json({ message: "User created successfully", id: user._id });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};
exports.logOutUser = async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
    res.clearCookie("token");
    res.send();
};