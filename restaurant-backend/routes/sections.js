const express = require("express");
const Section = require("../models/Section");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const router = express.Router();
const mongoose = require("mongoose");
  
// Get all sections for a specific table
router.get("/table/:tableId", async (req, res) => {
  try {
    const sections = await Section.find({ table: req.params.tableId });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sections" });
  }
});
// GET  section  100% work
router.get("/section/:sectionId", async (req, res) => {
  try {
    const items = await Item.find({ section: req.params.sectionId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
});
// GET  section  for mange section page
router.get("/section/:sectionId", async (req, res) => {
  try {
    const items = await Item.find({ section: req.params.sectionId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
});




// Create a new section for a specific table
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, table, items, icon } = req.body;

    if (!title || !table) {
      return res.status(400).json({ message: "Title and Table are required" });
    }

    // Check if tableId is a valid Mongo ID
    if (!mongoose.Types.ObjectId.isValid(table)) {
      return res.status(400).json({ message: "Invalid Table ID" });
    }

    const section = new Section({
      title,
      table,
      items: items || [],
      icon: icon || "LocalDining",
    });

    await section.save();
    res.status(201).json(section);
  } catch (err) {
    console.error("Add Section Error:", err);
    res.status(500).json({ message: "Failed to add section", error: err.message });
  }
});

// DELETE a section by ID
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({ message: "Section deleted successfully" });
  } catch (err) {
    console.error("Delete Section Error:", err);
    res.status(500).json({ message: "Failed to delete section", error: err.message });
  }
});



module.exports = router;
