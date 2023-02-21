const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post('/register', async (req, res) => {
    const newUser = new User({ name: req.body.name, email: req.body.email, password: req.body.password });

    try {
        const result = await newUser.save();
        res.send(result);
        console.log(result);
    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await User.findOne({ email: email, password: password });
        if (result) {
            const temp = {
                name: result.name,
                email: result.email, 
                _id: result._id
            }
            res.send(temp);
        }
        else {
            return res.status(400).json({ message: "Login Failed" });
        }

    } catch (error) {
        return res.status(400).json({ error });
    }
})
module.exports = router;