const mongoose = require('mongoose');

const TableBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  email: String,
  date: Date,
  time: String,
  guests: Number,
  branch: String,
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('TableBooking', TableBookingSchema);
