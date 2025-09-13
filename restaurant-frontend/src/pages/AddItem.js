import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledContainer = styled(Container)({
  padding: "40px 20px",
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fef7f0",
});

const Card = styled(Paper)({
  padding: "40px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: 600,
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
});

const ImagePreview = styled("img")({
  width: "100%",
  maxHeight: 300,
  objectFit: "cover",
  borderRadius: "8px",
  marginTop: "10px",
});

const AddItemPage = () => {
 const { sectionId } = useParams(); // gets the sectionId from the URL
const navigate = useNavigate();



const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [imageFile, setImageFile] = useState(null);
const [imageUrl, setImageUrl] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!name.trim() || !price.trim()) {
    return toast.error("Name and Price are required!");
  }

  const formData = new FormData();
  formData.append("name", name.trim());
  formData.append("description", description.trim());
  formData.append("price", parseFloat(price));
formData.append("sectionId", sectionId);
  if (imageFile) formData.append("image", imageFile);
  else if (imageUrl) formData.append("imageUrl", imageUrl.trim());

  try {
    setLoading(true);
    const res = await axios.post(
  "http://localhost:5000/api/items",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);
    toast.success("Item added successfully!");
    console.log("Server response:", res.data);
    // wait a moment so toast can show before redirect
    setTimeout(() => {
     navigate(`/tables`);
    }, 1500);
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to add item");
  } finally {
    setLoading(false);
  }
};

  return (
    <StyledContainer>
      
      <Card>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Item
        </Typography>

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />

        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />

        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setImageFile(null); // reset file if URL entered
          }}
          fullWidth
          placeholder="Paste image URL here"
        />

        <Box>
          <Typography variant="body1" gutterBottom>
            Or Upload Image:
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              setImageUrl(""); // reset URL if file selected
            }}
          />
        </Box>

        {(imageFile || imageUrl) && (
          <ImagePreview
            src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
            alt="Preview"
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ padding: "12px 0", fontSize: "16px" }}
        >
          {loading ? "Adding..." : "Add Item"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(-1)}
          sx={{ padding: "12px 0", fontSize: "16px" }}
        >
          Cancel
        </Button>
      </Card>
      <ToastContainer position="top-right" autoClose={2000} />
    </StyledContainer>
  );
};

export default AddItemPage;
