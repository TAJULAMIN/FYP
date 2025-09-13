const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const AddItem = require("../models/AddItem"); // your model
const Section = require("../models/Section"); // your section model
const { verifyToken, verifyAdmin } = require("../middleware/auth");
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
  

// //  Create ADD ITEM

router.post("/", upload.single("image"), async (req, res) => {
  try {
    
   const { sectionId, name, description, price, imageUrl } = req.body;



    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return res.status(400).json({ message: "Invalid section ID" });
    }

    const section = await Section.findById(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a number" });
    }

    const newItem = new AddItem({
      name,
      description,
      price: parsedPrice,
      section: sectionId,
      imageUrl: imageUrl || null,
      imagePath: req.file ? req.file.path : null,
    });

    await newItem.save();

    res.status(201).json({
      message: "Item added",
      item: newItem,
      section: sectionId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});



// DELETE 
router.delete("/:itemId", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await AddItem.findByIdAndDelete(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully", item });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// GET items for a specific section
router.get("/section/:sectionId", async (req, res) => {
  try {
    const { sectionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return res.status(400).json({ message: "Invalid section ID" });
    }

    const items = await AddItem.find({ section: sectionId });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
