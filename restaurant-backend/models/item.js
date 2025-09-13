// models/Item.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // store file path or URL
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true }, // link to section
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);
