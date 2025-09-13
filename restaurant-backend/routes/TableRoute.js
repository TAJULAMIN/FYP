const express = require("express");
const Table = require("../models/Table"); // match exact file name
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();
const authMiddleware = require("../middleware/auth");


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

// Get all tables
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
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
