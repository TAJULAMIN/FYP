const express = require("express");
const Table = require("../models/Table"); // match exact file name
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

const TableBooking = require("../models/TableBooking");

// Create a new table
router.post("/",verifyToken, verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    let { tableNumber, capacity, status } = req.body;
    tableNumber = Number(tableNumber);
    capacity = Number(capacity);
    if (isNaN(tableNumber) || isNaN(capacity)) {
      return res.status(400).json({ error: "Table Number and Capacity must be numbers" });
    }
    const newTable = new Table({
      tableNumber,
      capacity,
      status: status || "available",
      image: req.file ? req.file.path : undefined,
    });

    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (err) {
    console.error("Create Table Error:", err);
    res.status(500).json({ error: "Failed to create table", details: err.message });
  }
});

// Get all tables with current booking status
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    const now = new Date();

    const tablesWithStatus = await Promise.all(
      tables.map(async (table) => {
        // Find all bookings for this table today
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const bookings = await TableBooking.find({
          tableNumber: table.tableNumber,
          date: { $gte: startOfDay, $lte: endOfDay },
        });

        // Check if any booking overlaps with the current time
        let status = "available";
        for (let booking of bookings) {
          const [hour, minute] = booking.time.split(":").map(Number);
          const bookingStart = new Date(booking.date);
          bookingStart.setHours(hour, minute, 0, 0);

          const bookingEnd = new Date(bookingStart);
          bookingEnd.setHours(bookingEnd.getHours() + 1); // assuming 1-hour booking

          if (now >= bookingStart && now <= bookingEnd) {
            status = "booked";
            break; // no need to check further
          }
        }

        return {
          ...table.toObject(),
          status
        };
      })
    );

    res.json(tablesWithStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tables" });
  }
});
// routes/menu.js
router.get("/table/:tableId", async (req, res) => {
  try {
    const sections = await Section.find({ table: req.params.tableId });
    res.json(sections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch sections" });
  }
});


module.exports = router;
