import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green for main buttons and highlights
    },
    secondary: {
      main: '#FF9800', // Orange for accents and secondary actions
    },
    background: {
      default: '#f4f4f4', // Light background for the app
      paper: '#ffffff', // White for paper/card components
    },
    text: {
      primary: '#212121', // Dark text for readability
      secondary: '#757575', // Lighter secondary text
    },
    action: {
      hover: '#f0f0f0', // Hover state color
    },
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      letterSpacing: '0.2rem',
      color: '#212121',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#212121',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none', // Avoids uppercase transformation for buttons
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners for all elements
  },
});

export default theme;
