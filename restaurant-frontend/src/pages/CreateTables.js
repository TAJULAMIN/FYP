import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Typography, Button, Box } from "@mui/material";

const CreateTablePage = () => {
  const [image, setImage] = useState(null);
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("tableNumber", tableNumber);
    formData.append("capacity", capacity);
    formData.append("status", "available");
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token"); // 🔑

    const res = await axios.post("http://localhost:5000/api/tables", formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}` // 🔑 send token
      },
    });

    alert(`✅ Table ${res.data.tableNumber} created!`);
    navigate(`/tables`);
  } catch (err) {
    console.error(err);
    alert("❌ Failed to create table");
  }
};


  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#FF5722" }}>
        ➕ Create New Table
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Table Number"
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
        />
        <TextField
          label="Capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />

        <Button variant="outlined" component="label">
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Table Preview"
            style={{ maxWidth: "200px", borderRadius: "8px", marginTop: "10px" }}
          />
        )}

        <Button type="submit" variant="contained" sx={{ backgroundColor: "#FF5722" }}>
          Create Table
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTablePage;
