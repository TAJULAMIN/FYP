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

// GET latest feedbacks (with user info)
router.get("/latest", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
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

// GET feedback statistics for analytics
router.get("/stats", async (req, res) => {
  try {
    // Get rating distribution
    const ratingDistribution = [0, 0, 0, 0, 0];
    for (let i = 1; i <= 5; i++) {
      const count = await Feedback.countDocuments({ rating: i });
      ratingDistribution[i - 1] = count;
    }

    // Get average rating
    const averageResult = await Feedback.aggregate([
      { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);
    const averageRating = averageResult.length > 0 ? averageResult[0].averageRating : 0;

    // Get total feedbacks
    const totalFeedbacks = await Feedback.countDocuments();

    // Get monthly trends (last 7 months)
    const monthlyTrends = [];
    const currentDate = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
      
      const monthlyAverage = await Feedback.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" }
          }
        }
      ]);
      
      monthlyTrends.push(monthlyAverage.length > 0 ? monthlyAverage[0].averageRating : 0);
    }

    res.json({
      ratingDistribution,
      averageRating,
      totalFeedbacks,
      monthlyTrends
    });
  } catch (err) {
    console.error("Feedback stats error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;