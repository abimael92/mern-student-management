import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import githubIcon from '../assets/socialmedia/github-icon.svg';
import linkedinIcon from '../assets/socialmedia/linkedin-icon.svg';
import twitterIcon from '../assets/socialmedia/twitter-icon.svg';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '24px 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
            >
              Quick Links
            </Typography>
            <ul style={{ paddingLeft: 0 }}>
              {['Home', 'About Us', 'Contact', 'Services'].map(
                (text, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.1 }}>
                    <Link
                      to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                    >
                      {text}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
            >
              Legal
            </Typography>
            <ul style={{ paddingLeft: 0 }}>
              {['Privacy Policy', 'Terms of Service', 'Register'].map(
                (text, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.1 }}>
                    <Link
                      to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                    >
                      {text}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
            >
              Follow Us
            </Typography>
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}
            >
              {[
                { icon: githubIcon, link: '#', alt: 'GitHub' },
                { icon: linkedinIcon, link: '#', alt: 'LinkedIn' },
                { icon: twitterIcon, link: '#', alt: 'Twitter' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ scale: 1.2 }}
                  style={{ display: 'inline-block' }}
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    style={{ width: '32px', height: '32px' }}
                  />
                </motion.a>
              ))}
            </div>
          </Grid>
        </Grid>

        <div
          style={{
            marginTop: '32px',
            textAlign: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
            paddingTop: '16px',
          }}
        >
          <Typography variant="body2" sx={{ color: 'white' }}>
            &copy; {currentYear} School Management System. All Rights Reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
