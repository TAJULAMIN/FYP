const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true }, // ✅ required
    items: [{ name: String, description: String, price: Number, image: String }],
    icon: { type: String, default: "LocalDining" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", SectionSchema);
