import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Typography, TextField, Button, Paper, Avatar } from "@mui/material";
import { Star } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ add this
import { toast } from "react-toastify"; // ✅
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ comment: "", rating: 5 });
   const navigate = useNavigate(); // ✅
  // Load latest 3 feedbacks
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:5000/api/feedback/latest");
    setFeedbacks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
if (!token) {
  toast.info("Please sign in to comment ✨"); // show toast
  setTimeout(() => navigate("/signin"), 1500); // redirect after 1.5s

      return;
    }

    try {
      await axios.post("http://localhost:5000/api/feedback", form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setForm({ comment: "", rating: 5 });
      fetchFeedbacks();
      toast.success("Feedback submitted 🎉"); // ✅ success toast
    } catch (err) {
      console.error("Feedback submit error:", err.response?.data || err.message);
    }
  };

  return (
    <Box sx={{ py: 6, backgroundColor: "#212121", color: "white" }}>
      <Container maxWidth="md">
         <ToastContainer position="top-center" autoClose={3000} />
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4, color: "#FFEB3B" }}>
          Customer Feedback
        </Typography>

        {/* Latest Feedbacks */}
        {feedbacks.map((fb) => (
          <Paper key={fb._id} sx={{ p: 3, mb: 2, backgroundColor: "#2c2c2c" }}>
            <Avatar sx={{ bgcolor: "#FF5722", mb: 1 }}>
              {fb.userId?.username ? fb.userId.username[0] : "U"}
            </Avatar>
            <Typography variant="subtitle2" sx={{ color: "#FFEB3B" }}>
              - {fb.userId?.username || "Unknown"}
            </Typography>
            
            <Typography variant="body1" sx={{ fontStyle: "italic", mb: 1 }}>
              "{fb.comment}"
            </Typography>
            <Box sx={{ display: "flex", mb: 1 }}>
              {[...Array(fb.rating)].map((_, i) => (
                <Star key={i} sx={{ color: "#FFEB3B" }} />
              ))}
            </Box>
            
          </Paper>
        ))}

        {/* Feedback Form */}
        <Paper sx={{ p: 3, mb: 4, backgroundColor: "#2c2c2c" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Your Comment"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
            />

            <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ color: "white" }}>Your Rating:</Typography>
              <Rating
                name="rating"
                value={form.rating}
                onChange={(e, newValue) => setForm({ ...form, rating: newValue })}
                size="large"
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#FF5722", "&:hover": { backgroundColor: "#e64a19" } }}
            >
              Submit Feedback
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default FeedbackSection;
