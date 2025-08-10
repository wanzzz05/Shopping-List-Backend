const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashedPassword});

        res.status(201).json({msg: "User created successfully"});
    } catch (error) {
        res.status(500).json({msg: "Server error"});
    }
};

const signin = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, "MySuperSecretKey123", {
            expiresIn: "1d",
        });

        res
           . status(200)
           .json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
           });
        } catch (error) {
          res.status(500).json({ msg: "Server error"})
        }
};

module.exports = {signup, signin};