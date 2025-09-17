const mongoose = require("mongoose");

const TableBookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    date: {
      type: Date,
      required: [true, "Booking date is required"],
    },

    time: {
      type: String,
      required: [true, "Booking time is required"],
    },

    guests: {
      type: Number,
      required: true,
      min: [1, "At least 1 guest is required"],
    },

    branch: {
      type: String,
      required: true,
    },

    tableNumber: {
      type: Number,
      required: true, // ✅ table is mandatory
    },

    // 🔹 Discount tracking
    discountApplied: {
      type: Boolean,
      default: false,
    },

    // (Optional) Pricing
    totalPrice: {
      type: Number,
    },

    // 🔹 NEW: Booking status
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TableBooking", TableBookingSchema);
