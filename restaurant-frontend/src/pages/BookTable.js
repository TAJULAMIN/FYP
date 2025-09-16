import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, Grid, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";

// Animation
const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Background
const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${require('../assets/book1.jpg')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '93.8vh',
  width: '100vw',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

// Form container
const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  maxWidth: '400px',
  width: '100%',
  margin: theme.spacing(4),
  animation: `${slideIn} 0.6s ease-out`,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(3),
}));

export default function BookTable() {
  const { user } = useAuth(); // Logged-in user
  const [availableTables, setAvailableTables] = useState([]);
  const [formData, setFormData] = useState({
     name: user?.username || '',
  email: user?.email || '',
    date: '',
    time: '',
    guests: '',
    branch: '',
    tableNumber: '',
  });
  const [errors, setErrors] = useState({});

  // Fetch available tables when date/time changes
  useEffect(() => {
    const fetchAvailableTables = async () => {
      if (!formData.date || !formData.time) return;
      try {
        const res = await axios.get('http://localhost:5000/api/book-table/availability', {
          params: { date: formData.date, time: formData.time },
        });
        setAvailableTables(res.data);
      } catch (err) {
        console.error("Error fetching available tables:", err);
      }
    };
    fetchAvailableTables();
  }, [formData.date, formData.time]);

  // Handle form changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Validation
  const validateField = (name, value) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      switch (name) {
        case 'date':
          newErrors.date = value >= new Date().toISOString().split('T')[0] ? '' : 'Date cannot be in the past.';
          break;
        case 'time':
          newErrors.time = value ? '' : 'Time is required.';
          break;
        case 'guests':
          newErrors.guests = (value >= 1 && value <= 20) ? '' : 'Guests should be between 1 and 20.';
          break;
        case 'branch':
          newErrors.branch = value ? '' : 'Please select a branch.';
          break;
        case 'tableNumber':
          newErrors.tableNumber = value ? '' : 'Please select a table.';
          break;
        default:
          break;
      }
      return newErrors;
    });
  };

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors
    const validationErrors = {
      date: formData.date >= new Date().toISOString().split("T")[0] ? "" : "Date cannot be in the past.",
      time: formData.time ? "" : "Time is required.",
      guests: (formData.guests >= 1 && formData.guests <= 20) ? "" : "Guests should be between 1 and 20.",
      branch: formData.branch ? "" : "Please select a branch.",
      tableNumber: formData.tableNumber ? "" : "Please select a table.",
    };

    if (Object.values(validationErrors).some(error => error)) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to book a table.");
      return;
    }

    try {
      const payload = {
          name: user?.username, 
        email: user?.email,   
        tableNumber: formData.tableNumber,
        date: new Date(formData.date),
        time: formData.time,
        guests: Number(formData.guests),
        branch: formData.branch,
      };

      const response = await axios.post(
        "http://localhost:5000/api/book-table",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Table booked successfully!");
      setFormData({ date: "", time: "", guests: "", branch: "", tableNumber: "" });
      setErrors({});
      console.log("Booking response:", response.data);
    } catch (error) {
      console.error("Error booking the table:", error.response || error);
      toast.error(error.response?.data?.error || "Error booking the table. Please try again.");
    }
  };

  return (
    <>


    
      <BackgroundBox>
        <FormContainer component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>


          
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#FF5722', mb: 3 }}>
            Book a Table
          </Typography>
          
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
  Booking as: {user?.username} ({user?.email})
</Typography>


          <Grid container spacing={2}>



{/* Name */}
<Grid item xs={12}>
  <TextField
    label="Full Name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    fullWidth
    variant="outlined"
    sx={{ mb: 2 }}
  />
</Grid>

{/* Email */}
<Grid item xs={12}>
  <TextField
    label="Email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    fullWidth
    variant="outlined"
    sx={{ mb: 2 }}
  />
</Grid>




            {['date', 'time', 'guests'].map(field => (
              <Grid item xs={12} sm={field === 'date' || field === 'time' ? 6 : 12} key={field}>
                <TextField
                  required
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === 'guests' ? 'number' : field}
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

            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                label="Select Table"
                name="tableNumber"
                value={formData.tableNumber}
                onChange={handleChange}
                error={!!errors.tableNumber}
                helperText={errors.tableNumber}
              >
                {availableTables.map(table => (
                  <MenuItem key={table._id} value={table.tableNumber}>
                    Table {table.tableNumber} (Capacity: {table.capacity})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <ButtonContainer>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '48%', backgroundColor: '#FF5722', color: 'white', '&:hover': { backgroundColor: '#E64A19' } }}
            >
              Book Now
            </Button>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              sx={{ width: '48%', color: '#FF5722', borderColor: '#FF5722', '&:hover': { borderColor: '#E64A19', color: '#E64A19' } }}
            >
              Back to Home
            </Button>
          </ButtonContainer>
        </FormContainer>
      </BackgroundBox>
      <ToastContainer position="top-right" />
    </>
  );
}
