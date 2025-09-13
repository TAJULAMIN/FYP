const mongoose = require("mongoose");

const AddItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String }, // for URL images
  imagePath: { type: String }, // for uploaded file path
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
});

module.exports = mongoose.model("AddItem", AddItemSchema);
