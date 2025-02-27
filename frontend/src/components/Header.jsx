import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School'; // School icon
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme(); // Access the theme

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        {/* Left Column - Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            component={Link}
            to="/"
          >
            <SchoolIcon />
          </IconButton>
        </Box>

        {/* Center Column - Title */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
          >
            School Management
          </Typography>
        </Box>

        {/* Right Column - Navigation Menu */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/students"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Students
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
