import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid2 as Grid,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Email,
  Phone,
  LocationOn,
  School,
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Services', path: '/services' },
    { name: 'Students', path: '/students' },
    { name: 'Teachers', path: '/teachers' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Register', path: '/register' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Support', path: '/support' },
  ];

  const socialLinks = [
    { icon: <GitHub />, name: 'GitHub', link: '#' },
    { icon: <LinkedIn />, name: 'LinkedIn', link: '#' },
    { icon: <Twitter />, name: 'Twitter', link: '#' },
    { icon: <Facebook />, name: 'Facebook', link: '#' },
    { icon: <Instagram />, name: 'Instagram', link: '#' },
  ];

  const contactInfo = [
    { icon: <Email sx={{ fontSize: 18 }} />, text: 'info@schooldemo.edu' },
    { icon: <Phone sx={{ fontSize: 18 }} />, text: '+1 (555) 123-4567' },
    {
      icon: <LocationOn sx={{ fontSize: 18 }} />,
      text: '123 Education St, City, State 12345',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000000',
        color: '#ffffff',
        mt: 'auto',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand/Logo Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <School sx={{ fontSize: 32, color: '#ffffff', mr: 1 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#ffffff',
                }}
              >
                EduManage
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ mb: 2, color: '#ffffff', fontSize: '1rem' }}
            >
              Empowering educational institutions with comprehensive management
              solutions.
            </Typography>

            {/* Contact Info */}
            <Box sx={{ mt: 2 }}>
              {contactInfo.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <Box sx={{ color: '#ffffff', mr: 1 }}>{item.icon}</Box>
                  <Typography
                    variant="body2"
                    sx={{ color: '#ffffff', fontSize: '0.9rem' }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                mb: 3,
                fontSize: '1.2rem',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {quickLinks.map((link, index) => (
                <motion.div key={index} whileHover={{ x: 4 }}>
                  <Link
                    to={link.path}
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      fontSize: '1rem',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ff6b35')}
                    onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Legal */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                mb: 3,
                fontSize: '1.2rem',
              }}
            >
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {legalLinks.map((link, index) => (
                <motion.div key={index} whileHover={{ x: 4 }}>
                  <Link
                    to={link.path}
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      fontSize: '1rem',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ff6b35')}
                    onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Social Media & Newsletter */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                mb: 3,
                fontSize: '1.2rem',
              }}
            >
              Stay Connected
            </Typography>

            {/* Social Media */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body1"
                sx={{ color: '#ffffff', mb: 2, fontSize: '1rem' }}
              >
                Follow us on social media for updates
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }}>
                    <IconButton
                      sx={{
                        color: '#ffffff',
                        backgroundColor: '#333333',
                        '&:hover': {
                          backgroundColor: '#ff6b35',
                          color: '#ffffff',
                        },
                        transition: 'all 0.3s',
                      }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Newsletter Signup */}
            <Box>
              <Typography
                variant="body1"
                sx={{ color: '#ffffff', mb: 2, fontSize: '1rem' }}
              >
                Subscribe to our newsletter
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '2px solid #333333',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '1rem',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#ff6b35',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Subscribe
                </motion.button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#333333' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#ffffff',
              textAlign: { xs: 'center', sm: 'left' },
              fontSize: '1rem',
            }}
          >
            &copy; {currentYear} School Management System. All rights reserved.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#ffffff',
              textAlign: { xs: 'center', sm: 'right' },
              fontSize: '1rem',
            }}
          >
            Built with passion for better education
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
