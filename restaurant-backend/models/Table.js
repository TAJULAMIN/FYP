// models/Table.js
const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
  image: { type: String },
});

module.exports = mongoose.model("Table", TableSchema);
