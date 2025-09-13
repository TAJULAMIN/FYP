import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import { useAuth } from "../Context/AuthContext"; // ✅ NEW


const TablesListPage = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ NEW

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
  sx={{ p: 3, borderRadius: "12px", cursor: "pointer" }}
  onClick={() => 
  navigate(`/tables/${table._id}/menu`, { state: { tableNumber: table.tableNumber } })
}
>
  {table.image && (
    <img
      src={`http://localhost:5000/${table.image}`}
      alt={`Table ${table.tableNumber}`}
      style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
    />
  )}
  <Typography variant="h6">Table {table.tableNumber}</Typography>
  <Typography>Capacity: {table.capacity}</Typography>
  <Typography>Status: {table.status}</Typography>
</Paper>


          </Grid>
        ))}

        {/* ➕ Create Table Button at the end */}
       {user?.role === "admin" && (
  <Grid item xs={12} sm={6} md={4}>
    <Paper
      sx={{
        p: 4, // same as table cards
        borderRadius: "12px",
        textAlign: "center",
        border: "2px dashed #FF5722",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 220, // roughly match table card height (image + content)
      }}
      onClick={() => navigate("/tables/create")}
    >
      <Button
        variant="contained"
        sx={{ backgroundColor: "#FF5722", px: 3, py: 1 }} // smaller button
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
