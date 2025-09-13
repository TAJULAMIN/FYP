const express = require("express");
const router = express.Router();
const TableBooking = require("../models/TableBooking");
const { verifyToken } = require("../middleware/auth");

// GET - Fetch bookings by userId
router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const reservations = await TableBooking.find({ userId: req.params.userId });
    res.json(reservations); // <-- send array, not an object
  } catch (err) {
    console.error("Error fetching user reservations:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
