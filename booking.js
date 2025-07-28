const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ Booking API
router.post('/', async (req, res) => {
    try {
        const { customerName, address, contact, professional } = req.body;

        const booking = new Booking({ customerName, address, contact, professional });
        await booking.save();

        res.json({ message: '✅ Booking successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
