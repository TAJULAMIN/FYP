import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Grid, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// Animation
const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Background
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

// Form container
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

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

export default function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    branch: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch existing booking
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${id}`);
        const booking = res.data;

        setFormData({
          name: booking.name,
          email: booking.email,
          date: booking.date.split("T")[0],
          time: booking.time,
          guests: booking.guests,
          branch: booking.branch,
        });
      } catch (err) {
        console.error("Failed to load booking:", err);
        toast.error("Could not load booking data.");
      }
    };
    fetchBooking();
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      switch (name) {
        case "name":
          newErrors.name = value.length <= 50 ? "" : "Name should not exceed 50 characters.";
          break;
        case "email":
          newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email address.";
          break;
        case "date":
          newErrors.date = value >= new Date().toISOString().split("T")[0] ? "" : "Date cannot be in the past.";
          break;
        case "time":
          newErrors.time = value ? "" : "Time is required.";
          break;
        case "guests":
          newErrors.guests = value >= 1 && value <= 20 ? "" : "Guests should be between 1 and 20.";
          break;
        case "branch":
          newErrors.branch = value ? "" : "Please select a branch.";
          break;
        default:
          break;
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, formData);
      toast.success("Booking updated successfully!");
      navigate("/my-bookings");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking");
    }
  };

  return (
    <>
      <BackgroundBox>
        <FormContainer component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "#FF5722", mb: 3 }}>
            Edit Booking
          </Typography>
          <Grid container spacing={2}>
            {["name", "email"].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  required
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!errors[field]}
                  helperText={errors[field]}
                  sx={{ mb: 2 }}
                />
              </Grid>
            ))}

            {["date", "time", "guests"].map((field) => (
              <Grid item xs={12} sm={field === "guests" ? 12 : 6} key={field}>
                <TextField
                  required
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === "guests" ? "number" : field}
                  value={formData[field]}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors[field]}
                  helperText={errors[field]}
                  sx={{ mb: 2 }}
                />
              </Grid>
            ))}

            {/* Branch Dropdown */}
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                label="Select Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                error={!!errors.branch}
                helperText={errors.branch}
              >
                <MenuItem value="Swabi">Swabi</MenuItem>
                <MenuItem value="Karachi">Karachi</MenuItem>
                <MenuItem value="Lahore">Lahore</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <ButtonContainer>
            <Button
              type="submit"
              variant="contained"
            
              sx={{
                width: "48%",
                backgroundColor: "#FF5722",
                color: "white",
                "&:hover": { backgroundColor: "#E64A19" },
              }}
            >
              Update
             

            </Button>
            <Button
              component={Link}
              to="/my-bookings"
              variant="outlined"
              sx={{
                width: "48%",
                color: "#FF5722",
                borderColor: "#FF5722",
                "&:hover": { borderColor: "#E64A19", color: "#E64A19" },
              }}
            >
              Back
            </Button>
          </ButtonContainer>
        </FormContainer>
      </BackgroundBox>
      <ToastContainer />
    </>
  );
}
