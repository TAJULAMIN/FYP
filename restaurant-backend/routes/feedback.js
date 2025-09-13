const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const { verifyToken } = require("../middleware/auth");

// POST feedback (logged-in user only)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { comment, rating } = req.body;

    if (!comment || !rating) {
      return res.status(400).json({ error: "Comment and rating are required" });
    }

    const userId = req.user.id; // comes from JWT
    const feedback = new Feedback({ userId, comment, rating });

    await feedback.save();
    // also populate username for instant display on frontend
    await feedback.populate("userId", "username");

    res.status(201).json(feedback);
  } catch (err) {
    console.error("Feedback POST error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET latest 3 feedbacks (with user info)
router.get("/latest", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("userId", "username"); // only bring username, not full user object
    res.json(feedbacks);
  } catch (err) {
    console.error("Feedback GET error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
