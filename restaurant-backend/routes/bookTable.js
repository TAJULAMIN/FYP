const express = require("express");
const router = express.Router();
const TableBooking = require("../models/TableBooking");
const User = require("../models/User");  // ✅ make sure to import User model
const { verifyToken, verifyAdmin } = require("../middleware/auth");

/**
 * =========================
 * USER ROUTES
 * =========================
 */

// POST - Book a table (attach userId automatically)
// POST - Book a table (with first-time discount logic)
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("Logged-in user:", req.user);

    // 1️⃣ Find the user from DB
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    let discountApplied = false;
    let finalPrice = req.body.totalPrice || 0; // optional if you track price

    // 2️⃣ Apply discount if first-time user
    if (user.isNewUser) {
      discountApplied = true;
      finalPrice = finalPrice * 0.9; // 10% off
       user.isNewUser = false;        // ✅ disable future discount
      await user.save();
    }

    // 3️⃣ Attach booking data
    const bookingData = {
      ...req.body,
      userId: user._id,
      discountApplied,
      totalPrice: finalPrice,
    };

    console.log("Incoming booking data with userId & discount:", bookingData);

    // 4️⃣ Save booking
    const newBooking = new TableBooking(bookingData);
    const savedBooking = await newBooking.save();
    console.log("Booking saved successfully:", savedBooking);

    // 5️⃣ Respond
    res.status(201).json({
      message: "Table booked!",
      booking: savedBooking,
      discountApplied,
      user, // 🔹 send updated user with isNewUser=false
    });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(400).json({ error: err.message, details: err.errors });
  }
});

router.get("/user/reservations", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from JWT payload
    const reservations = await TableBooking.find({ userId });

    if (reservations.length > 0) {
      res.json({ reservationExists: true, reservations });
    } else {
      res.json({ reservationExists: false, reservations: [] });
    }
  } catch (err) {
    console.error("Error fetching user reservations:", err);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/admin/reservations", verifyToken, verifyAdmin, async (req, res) => {
  const bookings = await TableBooking.find();
  res.json(bookings);
});


// DELETE - Remove a booking (Admin only)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await TableBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
