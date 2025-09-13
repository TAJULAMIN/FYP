import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Grid from '@mui/material/Grid';

// Define custom color shades
const backgroundColor = '#121212'; // Very Dark Grey
const accentColor = '#FF5722'; // Orange
const secondaryColor = '#03A9F4'; // Light Blue
const textColor = '#E0E0E0'; // Light Grey
const borderColor = '#333'; // Darker Grey

// Global styles for the entire page
const GlobalStyle = styled('div')(({ theme }) => ({
    backgroundColor: backgroundColor,
    color: textColor,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
}));

const FlexContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}));

const SectionContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#1c1c1c', 
    padding: theme.spacing(4),
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
    color: textColor,
    marginTop: theme.spacing(4),
    flex: 1,
    minWidth: '300px',
    maxWidth: '100%',
}));

const ContactItem = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    margin: theme.spacing(2, 0),
    backgroundColor: '#2c2c2c', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    borderRadius: '8px',
    border: `1px solid ${borderColor}`,
    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
        backgroundColor: '#3c3c3c', 
    },
}));

const IconWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: accentColor,
    color: '#fff',
    marginRight: theme.spacing(2),
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: '#FF3D00',
    },
}));

const ContactText = styled(Typography)(({ theme }) => ({
    color: textColor,
    fontWeight: '500',
    fontSize: '1.1rem',
    lineHeight: 1.5,
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}));

const SocialMediaItem = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    margin: theme.spacing(1),
    backgroundColor: '#2c2c2c',
    color: textColor,
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
    '&:hover': {
        backgroundColor: '#db7807',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
    },
    '& svg': {
        marginRight: theme.spacing(1),
    },
}));

// 🔹 Multiple Branches Data
const branches = [
    {
        name: "Swabi Branch",
        email: "swabi@tf.com",
        phone: "+92 340 974661",
        address: "Government Post Graduate College, Swabi, Khyber Pakhtunkhwa, Pakistan",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1925.593631582167!2d72.41209347914982!3d34.16151039730057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38deef747aaa83bb%3A0x2b89195da1793f3b!2sSwabi!5e0!3m2!1sen!2s!4v1756354617472!5m2!1sen!2s"
    },
    {
        name: "Lahore Branch",
        email: "lahore@tf.com",
        phone: "+92 300 1234567",
        address: "123 Main Road, Lahore, Pakistan",
        map: "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d217891.51776200646!2d74.18435908554275!3d31.426385403972287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3919005d76ecd1eb%3A0xc91fffa2f0e2b193!2sLahori%20Restaurant%2C%2010%20H1%2C%20Commercial%20Valencia%2C%20Lahore%2C%2054800%2C%20Pakistan!3m2!1d31.3971704!2d74.2559371!5e0!3m2!1sen!2s!4v1756354768781!5m2!1sen!2s"
    },
    {
        name: "Karachi Branch",
        email: "karachi@tf.com",
        phone: "+92 321 7654321",
        address: "45 Clifton Block, Karachi, Pakistan",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710083.3524255888!2d62.21713121250001!3d24.7567907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d16c60976e3%3A0xc9989c97ba48c2da!2sKolachi%20Restaurant!5e0!3m2!1sen!2s!4v1756354997978!5m2!1sen!2s"
    }
];


const Contact = () => {
    return (
        <GlobalStyle>
            <FlexContainer>
                <SectionContainer>
                    <Typography
                        variant="h3"
                        gutterBottom
                        style={{
                            fontWeight: 'bold',
                            fontSize: '2rem',
                            borderBottom: `2px solid ${accentColor}`,
                            paddingBottom: '1rem'
                        }}
                    >
                        Our Branches
                    </Typography>

                    {branches.map((branch, idx) => (
                        <Box key={idx} sx={{ mb: 5 }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{ fontWeight: "bold", color: secondaryColor }}
                            >
                                {branch.name}
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <ContactItem>
                                        <IconWrapper>
                                            <MailOutlineIcon fontSize="inherit" />
                                        </IconWrapper>
                                        <ContactText>Email: {branch.email}</ContactText>
                                    </ContactItem>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ContactItem>
                                        <IconWrapper>
                                            <PhoneIcon fontSize="inherit" />
                                        </IconWrapper>
                                        <ContactText>Phone: {branch.phone}</ContactText>
                                    </ContactItem>
                                </Grid>
                                <Grid item xs={12}>
                                    <ContactItem>
                                        <IconWrapper>
                                            <LocationOnIcon fontSize="inherit" />
                                        </IconWrapper>
                                        <ContactText>{branch.address}</ContactText>
                                    </ContactItem>
                                </Grid>
                            </Grid>

                            {/* Map for each branch */}
                            <Box sx={{ height: "300px", width: "100%", mt: 2 }}>
                                <iframe
                                    src={branch.map}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={branch.name}
                                ></iframe>
                            </Box>
                        </Box>
                    ))}

                    <Typography
                        variant="h4"
                        gutterBottom
                        style={{
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            marginTop: '2rem',
                            borderBottom: `2px solid ${secondaryColor}`,
                            paddingBottom: '1rem'
                        }}
                    >
                        Follow Us
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item>
                            <SocialMediaItem startIcon={<FacebookIcon />}>Facebook</SocialMediaItem>
                        </Grid>
                        <Grid item>
                            <SocialMediaItem startIcon={<InstagramIcon />}>Instagram</SocialMediaItem>
                        </Grid>
                        <Grid item>
                            <SocialMediaItem startIcon={<TwitterIcon />}>Twitter</SocialMediaItem>
                        </Grid>
                    </Grid>
                </SectionContainer>
            </FlexContainer>
        </GlobalStyle>
    );
};

export default Contact;
