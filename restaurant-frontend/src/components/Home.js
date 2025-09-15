import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import ScrollTrigger from 'react-scroll-trigger';
import { TableRestaurant, Star, RestaurantMenu, Fastfood } from '@mui/icons-material';
import FeedbackSection from "./FeedbackSection";
import { useAuth } from "../Context/AuthContext";
// Keyframes for animations
const slideInLeft = keyframes`
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const slideUp = keyframes`
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
`;

const moveFromBottomToTop = keyframes`
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
`;

const DishPaper = styled(Paper)(({ theme }) => ({
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': { transform: 'scale(1.05)', boxShadow: theme.shadows[10] },
    textAlign: 'center',
}));

const AnimatedBox = styled(Box)({ animation: `${fadeIn} 1s ease-out` });

const AnimatedPaper = styled(Paper)(({ theme }) => ({
    animation: `${slideUp} 1s ease-out`,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': { transform: 'scale(1.05)', boxShadow: theme.shadows[10] },
}));

const Home = () => {
    const [scrolling, setScrolling] = useState(false);
    const [inView, setInView] = useState(false);
    const [trigger1, setTrigger1] = useState(false);
    const [trigger2, setTrigger2] = useState(false);
    const { user, isNewUser } = useAuth();   

    return (
        <>

                   {/* 🎉 New User Discount Banner */}
{isNewUser && (
  <Box sx={{ backgroundColor: "#94e173ff", color: "#000", py: 2, textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
    🎉 Welcome {user?.username}! Enjoy 10% OFF on menu items for first booking!
  </Box>
)} 

            {/* Hero Section */}
            <Box sx={{ position: 'relative', height: '100vh', backgroundImage: `url(${require('../assets/bg2.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.4)' }} />
                <Container sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Box sx={{ textAlign: 'center', position: 'relative', top: '-20px', mb: 4 }}>
                        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', letterSpacing: 1, color: '#FF5722', mb: 1 }}>
                            TASTY FOOD
                        </Typography>
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eff224', mb: 2, fontFamily: 'Roboto, sans-serif', maxWidth: '600px', mx: 'auto' }}>
                            <RestaurantMenu sx={{ fontSize: 24, color: '#eff224', mr: 1 }} />
                            Eat. Smile. Repeat
                            <Fastfood sx={{ fontSize: 24, color: '#eff224', ml: 1 }} />
                        </Typography>
                        <Divider sx={{ borderColor: '#FF5722', mb: 2, width: '80%', mx: 'auto', borderWidth: '2px' }} />
                    </Box>

                    <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
                        <Grid item xs={12} md={6}>
                            <ScrollTrigger onEnter={() => setScrolling(true)} onExit={() => setScrolling(false)}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: scrolling ? `${slideInLeft} 1s ease-out` : 'none', height: '150%', justifyContent: 'center' }}>
                                    <Paper elevation={10} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '400px', mx: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
                                        <Typography variant="h4" sx={{ color: '#FF5722', mb: 1, fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                                            Discover the Magic
                                        </Typography>
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: '300', mb: 3, maxWidth: '500px', fontFamily: 'Lora, serif' }}>
                                        Your table is waiting — come taste the flavors that bring people together.
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Star sx={{ color: '#edc345', mr: 1, fontSize: 30 }} />
                                            <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif' }}>Amazing Flavors</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <RestaurantMenu sx={{ color: '#edc345', mr: 1, fontSize: 30 }} />
                                            <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif' }}>Sweat Food</Typography>
                                        </Box>
                                    </Paper>
                                </Box>
                            </ScrollTrigger>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <ScrollTrigger onEnter={() => setScrolling(true)} onExit={() => setScrolling(false)}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: scrolling ? `${slideInRight} 1s ease-out` : 'none', height: '100%', justifyContent: 'center' }}>
                                    <Paper elevation={10} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '400px', mx: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '100%' }}>
                                        <Typography variant="h4" sx={{ color: '#FF5722', mb: 1, fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                                            Book Your Table
                                        </Typography>
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: '300', maxWidth: '500px', fontFamily: 'Lora, serif' }}>
                                            Reserve your spot and enjoy a memorable dining experience with us.
                                        </Typography>
                                        <TableRestaurant sx={{ fontSize: 50, color: '#edc345' }} />
                                        <Divider sx={{ width: '100%', my: 1, borderColor: '#edc345' }} />
                                        <Link to="/tables" style={{ textDecoration: 'none' }}>
                                            <Button type="submit" variant="contained" sx={{ width: '100%', backgroundColor: '#FF5722', color: 'white', padding: '8px 16px', mt: 1, '&:hover': { backgroundColor: '#9c300e', transform: 'scale(1.05)' }, borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'none' }}>
                                                View Tables
                                            </Button>
                                        </Link>
                                    </Paper>
                                </Box>
                            </ScrollTrigger>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

          
  
            {/* Featured Dishes Section */}
            <Box sx={{ py: 8, backgroundColor: '#212121', color: 'white' }}>
                <Container>
                    <Typography variant="h4" sx={{ fontFamily: 'Cinzel, serif', fontWeight: 'bold', color: '#FFEB3B', textAlign: 'center', position: 'relative', mb: 4, '&:before': { content: '""', position: 'absolute', width: '60%', height: '4px', backgroundColor: '#FF5722', bottom: '-10px', left: '20%' } }}>
                        Featured Dishes
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {[1, 2, 3].map((index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <ScrollTrigger onEnter={() => setInView(true)} onExit={() => setInView(false)}>
                                    <DishPaper elevation={5} sx={{ p: 2, animation: inView ? `${slideInRight} 0.8s ease-out` : 'none', opacity: inView ? 1 : 0 }}>
                                        <img src={require(`../assets/dish${index}.jpg`)} alt={`Dish ${index}`} style={{ width: '100%', borderRadius: '8px' }} />
                                        <Typography variant="h6" sx={{ mt: 2 }}>Dish Name {index}</Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>Description of Dish {index}</Typography>
                                        <Typography variant="subtitle1" sx={{ mt: 1 }}>RS:{index * 200+50}.00</Typography>
                                    </DishPaper>
                                </ScrollTrigger>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>



             {/* Events & Offers Section */}
            <Box sx={{ py: 8, backgroundColor: '#222', color: 'white' }}>
                <Container>
                    <Typography variant="h4" sx={{ fontFamily: 'Cinzel, serif', fontWeight: 'bold', color: '#FFEB3B', textAlign: 'center', position: 'relative', mb: 4, '&:before': { content: '""', position: 'absolute', width: '60%', height: '4px', backgroundColor: '#FF5722', bottom: '-10px', left: '20%' } }}>
                        Upcoming Events & Special Offers
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <ScrollTrigger onEnter={() => setTrigger1(true)} onExit={() => setTrigger1(false)}>
                                <Paper elevation={6} sx={{ p: 4, textAlign: 'center', backgroundImage: 'linear-gradient(145deg, #555, #333)', borderRadius: '12px', animation: trigger1 ? `${moveFromBottomToTop} 1s ease-out` : 'none', color: '#FFEB3B' }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Cinzel, serif', fontWeight: 'bold' }}>
                                        Drinks Tasting Night - September 25th
                                    </Typography>
                                    <Typography variant="body1">Join us for an exclusive wine tasting event featuring selections from around the world.</Typography>
                                </Paper>
                            </ScrollTrigger>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ScrollTrigger onEnter={() => setTrigger2(true)} onExit={() => setTrigger2(false)}>
                                <Paper elevation={6} sx={{ p: 4, textAlign: 'center', backgroundImage: 'linear-gradient(145deg, #555, #333)', borderRadius: '12px', animation: trigger2 ? `${moveFromBottomToTop} 1s ease-out` : 'none', color: '#FFEB3B' }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Cinzel, serif', fontWeight: 'bold' }}>
                                        Winter Special - 20% Off All Tables
                                    </Typography>
                                    <h1>Welcome {user?.username}</h1>
                                </Paper>
                            </ScrollTrigger>
                        </Grid>
                    </Grid>
                </Container>
            </Box>



             {/* Feedback Section  */}
            <FeedbackSection />







              {/* About Us Section */}
            <Box sx={{ py: 8, backgroundColor: '#212121', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <Container>
                    <AnimatedBox sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h4" sx={{ fontFamily: 'Cinzel, serif', fontWeight: 'bold', color: '#FFEB3B', position: 'relative', '&:before': { content: '""', position: 'absolute', width: '60%', height: '4px', backgroundColor: '#FF5722', bottom: '-10px', left: '20%' } }}>
                            About Us
                        </Typography>
                        <Typography variant="body1" sx={{ maxWidth: '800px', margin: '16px auto', fontFamily: 'Georgia, serif', color: '#FFEB3B' }}>
                            TASTY FOOD was founded in 2025 with the goal of bringing authentic flavors to our community of swabi. Our staf use only the fresh ingredients to create dishes that celebrate tradition and innovation.
                        </Typography>
                    </AnimatedBox>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <AnimatedPaper elevation={6} sx={{ p: 4, backgroundColor: '#FF5722', color: 'white', borderRadius: '12px', '&:hover': { transform: 'scale(1.05)' } }}>
                                <Typography variant="h6" gutterBottom>Our Mission</Typography>
                                <Typography variant="body2">To provide a unique and memorable dining experience through exceptional food and service.</Typography>
                            </AnimatedPaper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <AnimatedPaper elevation={6} sx={{ p: 4, backgroundColor: '#FF5722', color: 'white', borderRadius: '12px', '&:hover': { transform: 'scale(1.05)' } }}>
                                <Typography variant="h6" gutterBottom>Our Story</Typography>
                                <Typography variant="body2">From humble beginnings to a beloved dining destination, our journey has been one of passion and commitment.</Typography>
                            </AnimatedPaper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
          

            {/* Footer */}
            <Box sx={{ py: 4, backgroundColor: '#111', color: 'white', textAlign: 'center' }}>
                <Container>
                    <Typography variant="body2">© 2025 Tasty Food. All Rights Reserved.</Typography>
                </Container>
            </Box>
        </>
    );
};

export default Home;
