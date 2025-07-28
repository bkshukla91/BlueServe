// Booking model placeholder
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  contact: String,
  professional: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
