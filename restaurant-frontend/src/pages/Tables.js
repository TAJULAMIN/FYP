import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { useAuth } from "../Context/AuthContext";

const TablesListPage = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tables");
        setTables(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTables();

    // Optional: refresh every 1 minute to update table status in real-time
    const interval = setInterval(fetchTables, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "#FF5722" }}
      >
        🍽️ All Tables
      </Typography>

      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={4} key={table._id}>


            
        <Paper
  sx={{
    p: 3,
    borderRadius: "12px",
    cursor: "pointer", // ✅ always clickable
    border: table.status === "booked" ? "2px solid red" : "2px solid green",
    backgroundColor: table.status === "booked" ? "#ffe6e6" : "#e6ffe6",
    position: "relative",
    opacity: table.status === "booked" ? 0.7 : 1,
  }}
  
  onClick={() =>
    navigate(`/tables/${table._id}/menu`, { state: { tableNumber: table.tableNumber } })
    
  }
  
>

              {/* Status Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  color: "#fff",
                  fontWeight: "bold",
                  backgroundColor: table.status === "booked" ? "red" : "green",
                  fontSize: "0.8rem",
                }}
              >
                {table.status === "booked" ? "BOOKED NOW" : "AVAILABLE NOW"}
              </Box>

              {table.image && (
                <img
                  src={`http://localhost:5000/${table.image}`}
                  alt={`Table ${table.tableNumber}`}
                  style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
                />
              )}
              <Typography variant="h6">Table {table.tableNumber}</Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Capacity: {table.capacity}
              </Typography>
  

{/* ✅ Show message if booked */}
{table.status === "booked" && (
  <Typography
    variant="caption"
    sx={{ color: "red", fontStyle: "italic", mt: 1, display: "block" }}
  >
    This table is currently booked.  
    You can reserve it for a later time/date.
  </Typography>
)}

            </Paper>
          </Grid>
        ))}

        {/* ➕ Create Table Button */}
        {user?.role === "admin" && (
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: "12px",
                textAlign: "center",
                border: "2px dashed #FF5722",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 220,
              }}
              onClick={() => navigate("/tables/create")}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "#FF5722", px: 3, py: 1 }}
              >
                ➕ Create New Table
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TablesListPage;
