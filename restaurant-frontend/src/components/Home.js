import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import ScrollTrigger from 'react-scroll-trigger';
import { TableRestaurant, Star, RestaurantMenu, Fastfood } from '@mui/icons-material';
import FeedbackSection from "./FeedbackSection";
import { useAuth } from "../Context/AuthContext";
import {IconButton} from "@mui/material";
import {Facebook,Twitter,Instagram,YouTube,LocationOn,Phone,Email} from "@mui/icons-material";



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


{/* Featured Dishes Section - Improved Version */}
<Box sx={{ py: 8, backgroundColor: '#212121', color: 'white' }}>
  <Container>
    <Typography variant="h4" sx={{ 
      fontFamily: 'Cinzel, serif', 
      fontWeight: 'bold', 
      color: '#FFEB3B', 
      textAlign: 'center', 
      position: 'relative', 
      mb: 6, 
      '&:before': { 
        content: '""', 
        position: 'absolute', 
        width: '60%', 
        height: '4px', 
        backgroundColor: '#FF5722', 
        bottom: '-10px', 
        left: '20%' 
      } 
    }}>
      Featured Dishes
    </Typography>
    
    <Grid container spacing={4} justifyContent="center">
      {[
        { 
          id: 1, 
          name: "Chicken Biryani", 
          description: "Fragrant basmati rice cooked with tender chicken pieces, aromatic spices, and fresh herbs.", 
          price: 450,
          rating: 4.8,
          popular: true
        },
        { 
          id: 2, 
          name: "Beef Karahi", 
          description: "Succulent beef cooked in a traditional wok with tomatoes, ginger, and a blend of spices.", 
          price: 650,
          rating: 4.6,
          spicy: true
        },
        { 
          id: 3, 
          name: "Chicken Tikka", 
          description: "Marinated chicken chunks grilled to perfection, served with mint chutney.", 
          price: 550,
          rating: 4.9,
          bestseller: true
        }
      ].map((dish) => (
        <Grid item xs={12} sm={6} md={4} key={dish.id}>
          <ScrollTrigger onEnter={() => setInView(true)} onExit={() => setInView(false)}>
            <DishPaper elevation={5} sx={{ 
              p: 2, 
              animation: inView ? `${slideInRight} 0.8s ease-out` : 'none', 
              opacity: inView ? 1 : 0,
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#2c2c2c'
            }}>
              {/* Badges for special items */}
              {dish.popular && (
                <Box sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#FF5722',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  zIndex: 2
                }}>
                  POPULAR
                </Box>
              )}
              {dish.spicy && (
                <Box sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  zIndex: 2
                }}>
                  SPICY
                </Box>
              )}
              {dish.bestseller && (
                <Box sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#FFC107',
                  color: 'black',
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  zIndex: 2
                }}>
                  BESTSELLER
                </Box>
              )}
              
              {/* Dish Image */}
              <Box sx={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderRadius: '8px',
                height: '200px',
                mb: 2
              }}>
                <img 
                  src={require(`../assets/dish${dish.id}.jpg`)} 
                  alt={dish.name} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }} 
                  className="dish-image"
                />
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  padding: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ color: '#FFC107', fontSize: '18px', mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: 'white' }}>
                      {dish.rating}
                    </Typography>
                  </Box>
                  
                  {/* Price */}
                  <Typography variant="h6" sx={{ color: '#FFEB3B', fontWeight: 'bold' }}>
                    RS: {dish.price}.00
                  </Typography>
                </Box>
              </Box>
              
              {/* Dish Info */}
              <Typography variant="h6" sx={{ 
                mt: 1, 
                mb: 1, 
                color: '#FFEB3B',
                fontFamily: 'Roboto, sans-serif'
              }}>
                {dish.name}
              </Typography>
              
              <Typography variant="body2" sx={{ 
                mt: 1, 
                color: '#ccc',
                minHeight: '60px'
              }}>
                {dish.description}
              </Typography>
              
                
            </DishPaper>
          </ScrollTrigger>
        </Grid>
      ))}
    </Grid>
    
  </Container>
</Box>

             
              

                            {/* About Us Section */}
<Box sx={{ py: 8, backgroundColor: '#212121', color: 'white', position: 'relative', overflow: 'hidden' }}>
  <Container>
    <AnimatedBox sx={{ textAlign: 'center', mb: 6 }}>
      <Typography variant="h3" sx={{ 
        fontFamily: 'Cinzel, serif', 
        fontWeight: 'bold', 
        color: '#FFEB3B', 
        position: 'relative',
        mb: 3,
        '&:after': { 
          content: '""', 
          position: 'absolute', 
          width: '100px', 
          height: '4px', 
          backgroundColor: '#FF5722', 
          bottom: '-15px', 
          left: '50%',
          transform: 'translateX(-50%)'
        } 
      }}>
        Our Story
      </Typography>
      <Typography variant="h6" sx={{ 
        maxWidth: '800px', 
        margin: '20px auto', 
        fontFamily: 'Georgia, serif', 
        color: '#FFEB3B',
        lineHeight: 1.6
      }}>
        Where Passion for Food Meets Culinary Excellence
      </Typography>
    </AnimatedBox>
    
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
          <img 
            src={require('../assets/restaurant-interior.jpg')} 
            alt="Tasty Food Restaurant Interior" 
            style={{ 
              width: '100%', 
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
            }} 
          />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            padding: 2,
            color: 'white'
          }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Our cozy dining space where memories are made
            </Typography>
          </Box>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <AnimatedPaper elevation={6} sx={{ 
          p: 4, 
          backgroundColor: 'rgba(255, 87, 34, 0.1)', 
          color: 'white', 
          borderRadius: '12px',
          border: '1px solid #FF5722'
        }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#FFEB3B', mb: 3 }}>
            From Humble Beginnings
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            Tasty Food began as a small family dream in 2025, founded by Chef Muhammad Ali in the heart of Swabi. 
            What started as a modest kitchen serving traditional Pakistani dishes has blossomed into a beloved 
            culinary destination known for its innovative fusion of traditional flavors with modern techniques.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
            Our philosophy is simple: use only the freshest local ingredients, honor traditional recipes, 
            and infuse every dish with the passion that comes from truly loving what we do. Each plate tells 
            a story of our heritage, our community, and our commitment to excellence.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Today, we're proud to be part of the Swabi community, serving not just meals but experiences 
            that bring people together around the shared joy of good food.
          </Typography>
        </AnimatedPaper>
      </Grid>
    </Grid>

    {/* Our Values */}
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" sx={{ 
        textAlign: 'center', 
        mb: 4, 
        color: '#FFEB3B',
        fontFamily: 'Cinzel, serif'
      }}>
        Our Values
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <AnimatedPaper elevation={6} sx={{ 
            p: 3, 
            textAlign: 'center',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid #FFC107',
            height: '100%'
          }}>
            <RestaurantMenu sx={{ fontSize: 40, color: '#FFC107', mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ color: '#FFC107' }}>
              Quality Ingredients
            </Typography>
            <Typography variant="body2">
              We source locally whenever possible, supporting Swabi farmers and ensuring the freshest ingredients in every dish.
            </Typography>
          </AnimatedPaper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <AnimatedPaper elevation={6} sx={{ 
            p: 3, 
            textAlign: 'center',
            backgroundColor: 'rgba(255, 87, 34, 0.1)',
            border: '1px solid #FF5722',
            height: '100%'
          }}>
            <Star sx={{ fontSize: 40, color: '#FF5722', mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ color: '#FF5722' }}>
              Authentic Flavors
            </Typography>
            <Typography variant="body2">
              Our recipes honor the rich culinary traditions of Pakistan while embracing innovative cooking techniques.
            </Typography>
          </AnimatedPaper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <AnimatedPaper elevation={6} sx={{ 
            p: 3, 
            textAlign: 'center',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            border: '1px solid #4CAF50',
            height: '100%'
          }}>
            <TableRestaurant sx={{ fontSize: 40, color: '#4CAF50', mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50' }}>
              Community Focus
            </Typography>
            <Typography variant="body2">
              We believe in giving back to the Swabi community that has supported us from the beginning.
            </Typography>
          </AnimatedPaper>
        </Grid>
      </Grid>
    </Box>

    {/* Meet Our Chef */}
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ 
        mb: 4, 
        color: '#FFEB3B',
        fontFamily: 'Cinzel, serif'
      }}>
        Meet Our Head Chef
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '50%',
            width: 200,
            height: 200,
            margin: '0 auto',
            border: '4px solid #FF5722'
          }}>
            <img 
              src={require('../assets/chef.jpg')} 
              alt="Head Chef Muhammad Ali" 
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'cover'
              }} 
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ color: '#FF5722', mb: 2 }}>
            Chef TAJ-UL-AMIN
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontStyle: 'italic' }}>
            "Food is more than nourishment—it's a language of love, a connection to our heritage, 
            and a way to bring people together. At Tasty Food, we don't just serve meals; we create 
            memories around the dining table."
          </Typography>
          <Typography variant="body2">
            With over 15 years of culinary experience and training from top institutions in Pakistan, 
            Chef Ali brings both expertise and heart to every dish he creates.
          </Typography>
        </Grid>
      </Grid>
    </Box>
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
                        <Typography variant="body1">Join us for an exclusive wine tasting event featuring selections.</Typography>
                    </Paper>
                </ScrollTrigger>
            </Grid>
            <Grid item xs={12} md={6}>
                <ScrollTrigger onEnter={() => setTrigger2(true)} onExit={() => setTrigger2(false)}>
                    <Paper elevation={6} sx={{ p: 4, textAlign: 'center', backgroundImage: 'linear-gradient(145deg, #555, #333)', borderRadius: '12px', animation: trigger2 ? `${moveFromBottomToTop} 1s ease-out` : 'none', color: '#FFEB3B' }}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Cinzel, serif', fontWeight: 'bold' }}>
                            Winter Special - 20% Off All Tables
                        </Typography>
                        <Typography variant="body1">
                            Stay tuned for special offers throughout the winter season!
                        </Typography>
                    </Paper>
                </ScrollTrigger>
            </Grid>
        </Grid>
    </Container>
</Box>

             {/* Feedback Section  */}
            <FeedbackSection />








         {/* Footer */}
<Box sx={{ 
  py: 6, 
  backgroundColor: '#1a1a1a', 
  color: 'white',
  borderTop: '2px solid #FF5722'
}}>
  <Container maxWidth="lg">
    <Grid container spacing={4}>
      {/* Restaurant Info */}
      <Grid item xs={12} md={4}>
        <Typography variant="h5" sx={{ 
          mb: 2, 
          color: '#FF5722',
          fontWeight: 'bold'
        }}>
          Tasty Food
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Serving delicious meals since 2010. Our passion is creating memorable dining experiences with the freshest ingredients.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <LocationOn sx={{ color: '#FF5722', mr: 1 }} />
          <Typography variant="body2">
            Tasty food Main (Swabi) City
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Phone sx={{ color: '#FF5722', mr: 1 }} />
          <Typography variant="body2">
            (+92) 340 094661
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Email sx={{ color: '#FF5722', mr: 1 }} />
          <Typography variant="body2">
            info@tastyfood.com
          </Typography>
        </Box>
      </Grid>

      {/* Hours */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 2, color: '#FFEB3B' }}>
          Opening Hours
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Monday - Thursday
          </Typography>
          <Typography variant="body2">
            11:00 AM - 10:00 PM
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Friday - Saturday
          </Typography>
          <Typography variant="body2">
            11:00 AM - 11:00 PM
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Sunday
          </Typography>
          <Typography variant="body2">
            11:00 AM - 9:00 PM
          </Typography>
        </Box>
      </Grid>

      {/* Social Media & Newsletter */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 2, color: '#FFEB3B' }}>
          Follow Us
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <IconButton 
            sx={{ 
              backgroundColor: '#3b5998', 
              '&:hover': { backgroundColor: '#334d84' } 
            }}
            href="https://facebook.com" 
            target="_blank"
          >
            <Facebook sx={{ color: 'white' }} />
          </IconButton>
          <IconButton 
            sx={{ 
              backgroundColor: '#1DA1F2', 
              '&:hover': { backgroundColor: '#1a8cd8' } 
            }}
            href="https://twitter.com" 
            target="_blank"
          >
            <Twitter sx={{ color: 'white' }} />
          </IconButton>
          <IconButton 
            sx={{ 
              backgroundColor: '#E1306C', 
              '&:hover': { backgroundColor: '#c92a5d' } 
            }}
            href="https://instagram.com" 
            target="_blank"
          >
            <Instagram sx={{ color: 'white' }} />
          </IconButton>
          <IconButton 
            sx={{ 
              backgroundColor: '#FF0000', 
              '&:hover': { backgroundColor: '#d90000' } 
            }}
            href="https://youtube.com" 
            target="_blank"
          >
            <YouTube sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        <Typography variant="h6" sx={{ mb: 2, color: '#FFEB3B' }}>
          Newsletter
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Subscribe to get special offers and weekly menu updates.
        </Typography>
        <Box sx={{ display: 'flex' }}>
          
        
        </Box>
      </Grid>
    </Grid>

    {/* Divider */}
    <Box sx={{ 
      borderTop: '1px solid #333', 
      my: 4 
    }} />

    {/* Copyright & Links */}
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Typography variant="body2">
        © 2025 Tasty Food. All Rights Reserved.
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        mt: { xs: 2, sm: 0 } 
      }}>
        <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: '#FF5722' } }}>
          Privacy Policy
        </Link>
        <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: '#FF5722' } }}>
          Terms of Service
        </Link>
        <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: '#FF5722' } }}>
          Contact Us
        </Link>
      </Box>
    </Box>
  </Container>
</Box>
        </>
    );
};

export default Home;
