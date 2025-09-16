const express = require("express");
const router = express.Router();
const TableBooking = require("../models/TableBooking");
const User = require("../models/User");  // ✅ make sure to import User model
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const Table = require("../models/Table");

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


    const { tableNumber, date, time } = req.body;
    // ✅ Prevent double booking for the same table at the same date/time
    const existingBooking = await TableBooking.findOne({
      tableNumber,
      date: new Date(date),
      time,
    });
        if (existingBooking) {
      return res.status(400).json({ error: `Table ${tableNumber} is already booked at this time.` });
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



// GET available tables
router.get("/availability", async (req, res) => {
  try {
    const { date, time } = req.query;
    if (!date || !time) return res.status(400).json({ error: "Date and time are required" });

    // Get all tables
    const allTables = await Table.find();

    // Compute start and end of day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Get booked tables for that date & time
    const bookedTables = await TableBooking.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      time, // assuming time is stored as a string like "18:00"
    }).select("tableNumber");

    const bookedTableNumbers = bookedTables.map((b) => b.tableNumber);

    // Filter available tables
    const availableTables = allTables.filter(
      (table) => !bookedTableNumbers.includes(table.tableNumber)
    );

    res.json(availableTables);
  } catch (err) {
    console.error("Error fetching available tables:", err);
    res.status(500).json({ error: "Server error" });
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
