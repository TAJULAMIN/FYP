import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../assets/logo.jpg';
import { useAuth } from "../Context/AuthContext";
import { Avatar, Divider, Box } from '@mui/material';



const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,           // wider for profile info
    padding: theme.spacing(3),
    backgroundColor: '#222',
    color: 'white',
  },
}));



const StyledLink = styled(Link)(({ theme }) => ({
  color: '#FFA500',
  textDecoration: 'none',
  fontSize: '18px',
  padding: theme.spacing(1),
  marginLeft: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  '&:hover': { backgroundColor: '#FFEB3B', color: '#222', transform: 'scaleY(0.9)' },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#FFA500",
  textTransform: "none",
  fontSize: "18px",
  padding: theme.spacing(1),
  marginLeft: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  "&:hover": { backgroundColor: "#FFEB3B", color: "#222", transform: "scaleY(0.9)" },
}));

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
console.log("AuthContext user:", user); // ✅ logs user after login
  const handleDrawerToggle = () => setOpen(!open);



  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #0D0D0D, #333)', height: 64 }}>
        <Toolbar>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt='logo' style={{ height: "2.5rem", borderRadius: '50%', marginRight: '0.5rem' }} />
          </Link>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#f56d18', fontSize: '20px', fontWeight: 700, fontStyle: 'italic' }}>
            TASTY FOOD
          </Typography>

          {/* Always visible */}
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/tables">Tables</StyledLink>
          <StyledLink to="/book-table">Book Now</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>

          {/* Conditional auth links */}
          {!isAuthenticated ? (
            <>
              <StyledLink to="/SignIn">Sign In</StyledLink>
              <StyledLink to="/SignUp">Sign Up</StyledLink>
            </>
          ) : (
            <>
              {isAuthenticated && (
  <>
    <StyledLink to="/my-bookings">
  My Bookings
</StyledLink>

    <StyledButton onClick={logout}>Logout</StyledButton>
  </>
)}
          </>
          )}
          <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <StyledDrawer anchor="right" open={open} onClose={handleDrawerToggle}>
  <Box display="flex" flexDirection="column" alignItems="center">
    {isAuthenticated ? (
      <>
        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
          {user.username?.[0]?.toUpperCase() || 'U'}
        </Avatar>
        <Typography variant="h6">{user.username}</Typography>
        <Typography variant="body2" color="#ccc">{user.email}</Typography>
         
        <Divider sx={{ width: '100%', my: 2, backgroundColor: '#555' }} />

        <List sx={{ width: '100%' }}>
          <ListItem sx={{ color: '#FFA500' }} button component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem  sx={{ color: '#FFA500' }} button component={Link} to="/menu" onClick={handleDrawerToggle}>
            <ListItemText primary="Menu" />
          </ListItem>
          <ListItem  sx={{ color: '#FFA500' }} button component={Link} to="/book-table" onClick={handleDrawerToggle}>
            <ListItemText primary="Book a Table" />
          </ListItem>
          {isAuthenticated && (
    <ListItem sx={{ color: '#FFA500' }} button component={Link} to="/my-bookings" onClick={handleDrawerToggle}>
      <ListItemText primary="My Bookings" />
    </ListItem>
          )}
        </List>

        <StyledButton sx={{ color: '#ff0000ff' }} fullWidth onClick={logout}>
          Logout
        </StyledButton>
      </>
    ) : (
      <>
        <Typography variant="body1" sx={{ mb: 2 }}>Not signed in</Typography>
        <List sx={{ width: '100%' }}>
          <ListItem sx={{ color: '#FFA500' }} button component={Link} to="/signin" onClick={handleDrawerToggle}>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem sx={{ color: '#FFA500' }} button component={Link} to="/signup" onClick={handleDrawerToggle}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      </>
    )}
  </Box>
</StyledDrawer>

    </>
  );
};

export default Header;
