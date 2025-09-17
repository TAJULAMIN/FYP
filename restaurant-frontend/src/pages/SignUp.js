import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthContext";

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

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
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // 🔹 Field-level validation
  const validateField = (field, value) => {
    let message = "";

    switch (field) {
     case "name":
         if (!value.trim()) message = "Full Name is required";
        else if (value.length < 5) message = "Full Name must be at least 5 characters";
        else if (!/^[A-Za-z\s]+$/.test(value)) message = "Name can only contain letters and spaces";
        break;

      case "email":
        if (!value.trim()) message = "Email is required";
        else if (!validateEmail(value)) message = "Enter a valid email";
        break;
      case "password":
        if (!value) message = "Password is required";
        else if (value.length < 6)
          message = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== password) message = "Passwords do not match ❌";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
    return message === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation for all fields
    const valid =
      validateField("name", name) &
      validateField("email", email) &
      validateField("password", password) &
      validateField("confirmPassword", confirmPassword);

    if (!valid) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username: name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("User registered & logged in 🎉", { autoClose: 3000 });
      login(res.data.user, res.data.token);
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
          onBlur={() => validateField("name", name)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateField("email", email)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => validateField("password", password)}
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => validateField("confirmPassword", confirmPassword)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
