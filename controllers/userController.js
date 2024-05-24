const User = require('../models/user.js');
const jwt=require('jsonwebtoken')
exports.createUserController = async (req, res) => {
    try {
        const { email, password,  } = req.body;
        if (!email   || !password ) {
            return res.status(400).send('All fields are required');
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).send('User already exists');
        }
       
        const newUser = new User({
           email, password
        });
        await newUser.save();
        return res.status(200).send("User registered successfully");
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({message : err.message});
    }
};

exports.getUserController =async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await User.findOne({ email });
        if (!exist) {
            return res.status(400).send('User not exist');
        }
        if (exist.password !== password) {
            return res.status(403).send('Invalid Password');
        }
        const payload = {
            user: {
                id: exist.id
            }
        };
        jwt.sign(payload,  process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
        console.log(process.env.JWT_EXPIRY)
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};