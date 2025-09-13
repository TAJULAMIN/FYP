import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TableBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Edit booking
  const handleEdit = (booking) => {
    localStorage.setItem("editBooking", JSON.stringify(booking));
    navigate(`/edit-booking/${booking._id}`);
  };

  // Delete booking
  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this booking?</p>
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
                  await axios.delete(
                    `http://localhost:5000/api/bookings/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  setBookings((prev) => prev.filter((b) => b._id !== id));
                  toast.success("Booking deleted successfully!");
                  closeToast();
                } catch (err) {
                  toast.error("Failed to delete booking");
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

  // Fetch bookings
  useEffect(() => {
  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/signin");
      return;
    }

    try {
      const url =
        user.role === "admin"
          ? "http://localhost:5000/api/bookings"
          : `http://localhost:5000/api/bookings/user/${user.id}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If res.data is array, use directly; otherwise, fallback
      setBookings(Array.isArray(res.data) ? res.data : res.data.reservations || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, [navigate]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <h1>All Bookings</h1>
      <table style={{ borderCollapse: "collapse", width: "90%" }} border="5" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Branch</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{new Date(b.date).toLocaleDateString()}</td>
              <td>{b.time}</td>
              <td>{b.guests}</td>
              <td>{b.branch}</td>
              <td>{new Date(b.createdAt).toLocaleString()}</td>
              <td>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFA500", color: "white", "&:hover": { backgroundColor: "#E68900" }, marginRight: "5px" }}
                  onClick={() => handleEdit(b)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FF5722", color: "white", "&:hover": { backgroundColor: "#E64A19" } }}
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default TableBookingList;
