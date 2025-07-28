
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/blueserve', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);

// ✅ Server Start
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});
