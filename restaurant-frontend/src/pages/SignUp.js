import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthContext"; // ✅ import AuthContext

// Slide-in animation
const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Background styling
const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${require("../assets/book1.jpg")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "93.8vh",
  width: "100vw",
  position: "absolute",
  right: 0,
  top: 0,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: theme.spacing(3),
}));

// Form container styling
const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  maxWidth: "400px",
  width: "100%",
  margin: theme.spacing(4),
  animation: `${slideIn} 0.6s ease-out`,
}));

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth(); // ✅ get login function from context
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    toast.error("Passwords do not match ❌");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      username: name,
      email,
      password,
    });

    // Save token & user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Show auto-close toast
    toast.success("User registered & logged in 🎉", {
      position: "top-right",
      autoClose: 3000, // closes after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  // ✅ Update global AuthContext
      login(res.data.user, res.data.token);
    // Redirect after a short delay so toast is visible
    setTimeout(() => navigate("/"), 1500);

  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    toast.error(err.response?.data?.msg || "Signup failed ❌");
  }
};

  return (
    <BackgroundBox>
      <ToastContainer position="top-right" />
      <FormContainer component="form" onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#FF5722", mb: 3 }}
        >
          Sign Up
        </Typography>

        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#FF5722",
            color: "white",
            mt: 2,
            "&:hover": { backgroundColor: "#E64A19" },
          }}
          fullWidth
        >
          Register
        </Button>

        <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{
            mt: 2,
            color: "#FF5722",
            borderColor: "#FF5722",
            "&:hover": { borderColor: "#E64A19", color: "#E64A19" },
          }}
          fullWidth
        >
          Back to Home
        </Button>
      </FormContainer>
    </BackgroundBox>
  );
}
