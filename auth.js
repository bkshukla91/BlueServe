const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// ✅ Signup API
router.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: '✅ Signup successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Login API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: '❌ User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: '❌ Invalid password' });

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1d' });

        res.json({ message: '✅ Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
