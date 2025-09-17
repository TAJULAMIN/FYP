import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Grid,
  Tabs,
  Tab
} from "@mui/material";
import { Star, TrendingUp, PieChart, BarChart } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    ratingDistribution: [0, 0, 0, 0, 0],
    averageRating: 0,
    totalFeedbacks: 0,
    monthlyTrends: []
  });
  const [form, setForm] = useState({ comment: "", rating: 5 });
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  // Load latest feedbacks and stats
  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback/latest");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
      // Mock data for demonstration
      setStats({
        ratingDistribution: [5, 12, 35, 80, 150],
        averageRating: 4.3,
        totalFeedbacks: 282,
        monthlyTrends: [4.2, 4.3, 4.5, 4.6, 4.7, 4.7, 4.8]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please sign in to comment ✨");
      setTimeout(() => navigate("/signin"), 1500);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/feedback", form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setForm({ comment: "", rating: 5 });
      fetchFeedbacks();
      fetchStats(); // Refresh stats after submission
      toast.success("Feedback submitted 🎉");
    } catch (err) {
      console.error("Feedback submit error:", err.response?.data || err.message);
      toast.error("Failed to submit feedback");
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Chart data configurations
  const distributionData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Number of Ratings',
        data: stats.ratingDistribution,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Average Rating',
        data: stats.monthlyTrends,
        borderColor: 'rgb(255, 235, 59)',
        backgroundColor: 'rgba(255, 235, 59, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const sentimentData = {
    labels: ['Positive (4-5 stars)', 'Neutral (3 stars)', 'Negative (1-2 stars)'],
    datasets: [
      {
        label: 'Feedback Sentiment',
        data: [
          stats.ratingDistribution[3] + stats.ratingDistribution[4],
          stats.ratingDistribution[2],
          stats.ratingDistribution[0] + stats.ratingDistribution[1]
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };

  return (
    <Box sx={{ py: 6, backgroundColor: "#212121", color: "white", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <ToastContainer position="top-center" autoClose={3000} />
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4, color: "#FFEB3B" }}>
          Customer Feedback Analytics
        </Typography>

        {/* Statistics Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, backgroundColor: "#2c2c2c", textAlign: "center" }}>
              <TrendingUp sx={{ fontSize: 40, color: "#4caf50", mb: 1 }} />
              <Typography variant="h5" sx={{ color: "#4caf50" }}>
                {stats.averageRating.toFixed(1)}/5
              </Typography>
              <Typography variant="body2">Average Rating</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, backgroundColor: "#2c2c2c", textAlign: "center" }}>
              <BarChart sx={{ fontSize: 40, color: "#2196f3", mb: 1 }} />
              <Typography variant="h5" sx={{ color: "#2196f3" }}>
                {stats.totalFeedbacks}
              </Typography>
              <Typography variant="body2">Total Feedbacks</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, backgroundColor: "#2c2c2c", textAlign: "center" }}>
              <PieChart sx={{ fontSize: 40, color: "#ff9800", mb: 1 }} />
              <Typography variant="h5" sx={{ color: "#ff9800" }}>
                {Math.round((stats.ratingDistribution[3] + stats.ratingDistribution[4]) / stats.totalFeedbacks * 100)}%
              </Typography>
              <Typography variant="body2">Positive Reviews</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Paper sx={{ p: 3, mb: 4, backgroundColor: "#2c2c2c" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab icon={<BarChart />} label="Rating Distribution" />
            <Tab icon={<TrendingUp />} label="Monthly Trends" />
            <Tab icon={<PieChart />} label="Sentiment Analysis" />
          </Tabs>

          <Box sx={{ mt: 3, height: 300 }}>
            {activeTab === 0 && (
              <Bar data={distributionData} options={chartOptions} />
            )}
            {activeTab === 1 && (
              <Line data={trendData} options={{
                ...chartOptions,
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    min: 3,
                    max: 5
                  }
                }
              }} />
            )}
            {activeTab === 2 && (
              <Doughnut data={sentimentData} options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'white'
                    }
                  }
                }
              }} />
            )}
          </Box>
        </Paper>

        {/* Feedback Form and List */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={{ mb: 2, color: "#FFEB3B" }}>
              Recent Feedback
            </Typography>
            
            {feedbacks.map((fb) => (
              <Paper key={fb._id} sx={{ p: 3, mb: 2, backgroundColor: "#2c2c2c" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ bgcolor: "#FF5722", mr: 2 }}>
                    {fb.userId?.username ? fb.userId.username[0] : "U"}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "#FFEB3B" }}>
                      {fb.userId?.username || "Unknown"}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          sx={{ 
                            color: i < fb.rating ? "#FFEB3B" : "#555",
                            fontSize: 18
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ fontStyle: "italic", mt: 1 }}>
                  "{fb.comment}"
                </Typography>
              </Paper>
            ))}
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, backgroundColor: "#2c2c2c" }}>
              <Typography variant="h5" sx={{ mb: 2, color: "#FFEB3B" }}>
                Share Your Feedback
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your Comment"
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  sx={{ 
                    mb: 2, 
                    "& .MuiInputBase-root": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#FFEB3B" },
                    }
                  }}
                />

                <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "white" }}>Your Rating:</Typography>
                  <Rating
                    name="rating"
                    value={form.rating}
                    onChange={(e, newValue) => setForm({ ...form, rating: newValue })}
                    size="large"
                    sx={{ color: "#FFEB3B" }}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ 
                    backgroundColor: "#FF5722", 
                    "&:hover": { backgroundColor: "#e64a19" },
                    py: 1.5
                  }}
                >
                  Submit Feedback
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeedbackSection;