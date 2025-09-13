import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";




const StyledContainer = styled(Container)({
  padding: "32px",
  minHeight: "80vh",
  backgroundColor: "#fff8f0",
});

const Card = styled(Paper)({
  padding: "16px",
  borderRadius: "8px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 150,
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
  },
});

const ManageSectionsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";
const { tableId } = useParams(); // tableId from URL
  const [sections, setSections] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // Fetch sections
  useEffect(() => {
  const fetchSections = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sections/table/${tableId}`);
      setSections(res.data || []);
    } catch (err) {
      console.error("Failed to fetch sections:", err);
    }
  };
  fetchSections();
}, [tableId]);

  if (!isAdmin) return <Typography>You are not authorized to access this page.</Typography>;

  // Add section
const handleAddSection = async () => {
  if (!newTitle) return toast.error("Please enter a section title.");

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/sections", // ✅ correct URL
      { title: newTitle, table: tableId, items: [], icon: "LocalDining" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setSections([...sections, res.data]);
    setNewTitle("");
    toast.success("Section added successfully!");
  } catch (err) {
    console.error("Failed to add section:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to add section");
  }
};


const handleDeleteSection = (id, title) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete the section "{title}"?</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF5722",
              color: "white",
              "&:hover": { backgroundColor: "#E64A19" },
            }}
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5000/api/sections/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setSections(prev => prev.filter(s => s._id !== id));
                toast.success("Section deleted successfully!");
                closeToast();
              } catch (err) {
                console.error(err.response?.data || err.message);
                toast.error(err.response?.data?.message || "Failed to delete section");
              }
            }}
          >
            Yes, Delete
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#FF5722",
              borderColor: "#FF5722",
              "&:hover": { borderColor: "#E64A19", color: "#E64A19" },
            }}
            onClick={closeToast}
          >
            Cancel
          </Button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>Manage Sections</Typography>

      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        {/* Add Section Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <TextField
              label="New Section Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="success" onClick={handleAddSection}>
              + Add Section
            </Button>
          </Card>
        </Grid>

        {/* Existing Sections with Delete */}
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={3} key={section._id}>
            <Card>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {section.title}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteSection(section._id, section.title)}
              >
                - Delete Section
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ToastContainer />
    </StyledContainer>
  );
};

export default ManageSectionsPage;
