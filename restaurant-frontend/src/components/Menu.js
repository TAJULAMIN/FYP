import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, CircularProgress, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import additem from "../assets/additem.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";


const BookButton = styled("button")({
  backgroundColor: "#FF5722",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px 20px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    backgroundColor: "#ff7043", // slightly lighter on hover
  },
});


const StyledContainer = styled(Container)({
  padding: "32px",
  minHeight: "80vh",
  backgroundColor: "#fff8f0",
});

const SectionTitle = styled(Typography)({
  margin: "32px 0 16px",
  fontWeight: "bold",
  fontSize: "1.8rem",
  textTransform: "uppercase",
  color: "#e64a19",
  borderBottom: "2px solid #e64a19",
  paddingBottom: "8px",
});

const Card = styled(Paper)({
  padding: "16px",
  borderRadius: "8px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 300,
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  transition: "0.3s",
  position: "relative", // so delete button can be positioned inside
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
  },
});

const ItemImg = styled("img")({
  width: "100%",
  height: 150,
  objectFit: "cover",
  marginBottom: 8,
  borderRadius: 8,
});

const TableMenuPage = () => {
  
     const { user, isAuthenticated } = useAuth();
      const isAdmin = isAuthenticated && user?.role === "admin"; // ✅ check role
  const { tableId } = useParams();
  const navigate = useNavigate();
   const location = useLocation();
 const tableNumber = location.state?.tableNumber; // ✅ optional chaining

  const [sections, setSections] = useState([]);
  const [itemsMap, setItemsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectionsAndItems = async () => {
      try {
        setLoading(true);
       const res = await axios.get(`http://localhost:5000/api/sections/table/${tableId}`);
        const sectionsData = res.data || [];
        setSections(sectionsData);

        const itemsPromises = sectionsData.map(async (sec) => {
          try {
           const itemsRes = await axios.get(
    `http://localhost:5000/api/items/section/${sec._id}`

            );
            return { sectionId: sec._id, items: itemsRes.data || [] };
          } catch (err) {
            console.error(`Failed to fetch items for section ${sec._id}:`, err);
            return { sectionId: sec._id, items: [] };
          }
        });

        const itemsResults = await Promise.all(itemsPromises);
        const map = {};
        itemsResults.forEach((r) => {
          map[r.sectionId] = r.items;
        });
        setItemsMap(map);
      } catch (err) {
        console.error("Failed to fetch sections or items:", err);
        setSections([]);
        setItemsMap({});
      } finally {
        setLoading(false);
      }
    };

    fetchSectionsAndItems();
  }, [tableId]);

  const handleAddItem = (sectionId) => {
    navigate(`/add-item/${sectionId}`);
  };

  const handleManageSections = () => {
    navigate(`/manage-sections/${tableId}`);
  };

  const handleDeleteItem = async (sectionId, itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Item deleted!");
      setItemsMap((prev) => ({
        ...prev,
        [sectionId]: prev[sectionId].filter((i) => i._id !== itemId),
      }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
       {tableNumber && (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FF5722" }}>
      🍽️ Table {tableNumber} Menu
    </Typography>

    <BookButton onClick={() => navigate(`/book-table`)}>
  Book Table
</BookButton>

  </div>
)}

      {sections.map((section) => {
        const title = section.title || section.name || "Section";

        return (
          <div key={section._id}>
            <SectionTitle>{title}</SectionTitle>

            <Grid container spacing={2}>
              {(itemsMap[section._id] || []).map((item) => {
                const imageSrc = item.imageUrl
                  ? item.imageUrl
                  : item.imagePath
                  ? `http://localhost:5000/${item.imagePath}`
                  : null;

                return (
                  <Grid item xs={12} sm={6} md={3} key={item._id}>
                    <Card>
  {imageSrc && <ItemImg src={imageSrc} alt={item.name} />}
  <Typography variant="h6">{item.name}</Typography>
  <Typography variant="body2" color="textSecondary">
    {item.description || "No description"}
  </Typography>
  <Typography
    variant="body1"
    color="textPrimary"
    sx={{ fontWeight: "bold", marginTop: 1 }}
  >
    {typeof item.price === "number"
      ? `$${item.price}`
      : item.price || "No price"}
  </Typography>
 {isAdmin && (
  <IconButton
    color="error"
    onClick={() => handleDeleteItem(section._id, item._id)}
    sx={{ marginTop: 1 }}
  >
    <DeleteIcon />
  </IconButton>
)}
</Card>

                  </Grid>
                );
              })}

              {/* Add Item button (per section) */}
              {isAdmin && (
  <Grid item xs={12} sm={6} md={3}>
                <Card onClick={() => handleAddItem(section._id)}>
                  <img
                    src={additem}
                    alt="Add Item"
                    style={{ width: 60, height: 60, marginBottom: 10 }}
                  />
                  <Typography variant="h6">Add Item</Typography>
                </Card>
              </Grid>
)}
             
            </Grid>
          </div>
        );
      })}

      {/* Manage Sections card */}
     
        {isAdmin && (
          
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
          
        <Grid item xs={12} sm={6} md={3}>
          <Card onClick={handleManageSections}>
            <img
              src={additem}
              alt="Manage Sections"
              style={{ width: 60, height: 60, marginBottom: 10 }}
            />
             
            <Typography variant="h6">Manage Sections</Typography>
          </Card>
        </Grid>
      </Grid>
        )}
      <ToastContainer position="top-right" autoClose={2000} />
    </StyledContainer>
  );
};

export default TableMenuPage;
