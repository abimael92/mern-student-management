import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School'; // School icon
import HomeIcon from '@mui/icons-material/Home'; // Home icon
import PeopleIcon from '@mui/icons-material/People'; // Students icon
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard icon
import MenuIcon from '@mui/icons-material/Menu'; // Menu icon for mobile
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // User Profile icon
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; // Library icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Transport icon
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'; // Academics icon
import ReceiptIcon from '@mui/icons-material/Receipt'; // Fees icon
import AssessmentIcon from '@mui/icons-material/Assessment'; // Reports icon
import Tooltip from '@mui/material/Tooltip';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile view

  const [anchorEl, setAnchorEl] = useState(null); // State for the menu
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const insightsReportsItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    {
      name: 'Reports',
      path: '/reports',
      icon: <AssessmentIcon />,
      comingSoon: true,
    },
  ];

  const peopleManagementItems = [
    { name: 'Students', path: '/students', icon: <PeopleIcon /> },
    {
      name: 'Teachers',
      path: '/teachers',
      icon: <PeopleIcon />,
      comingSoon: true,
    },
  ];

  const academicsAttendanceItems = [
    {
      name: 'Academics',
      path: '/academics',
      icon: <SchoolOutlinedIcon />,
      comingSoon: true,
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: <PeopleIcon />,
      comingSoon: true,
    },
  ];

  const financialLogisticsItems = [
    { name: 'Fees', path: '/fees', icon: <ReceiptIcon />, comingSoon: true },
    {
      name: 'Transport',
      path: '/transport',
      icon: <LocalShippingIcon />,
      comingSoon: true,
    },
  ];

  const resourcesFacilitiesItems = [
    {
      name: 'Library',
      path: '/library',
      icon: <LibraryBooksIcon />,
      comingSoon: true,
    },
  ];

  const userMenuItems = [
    { name: 'Profile', path: '/profile', icon: <AccountCircleIcon /> },
    { name: 'Logout', path: '/logout', icon: <AccountCircleIcon /> },
  ];

  const categories = [
    { name: 'Insights & Reports', items: insightsReportsItems },
    { name: 'People Management', items: peopleManagementItems },
    { name: 'Academics & Attendance', items: academicsAttendanceItems },
    { name: 'Financial & Logistics', items: financialLogisticsItems },
    { name: 'Resources & Facilities', items: resourcesFacilitiesItems },
    { name: 'User', items: userMenuItems },
  ];

  return (
    <>
      {/* Header Section */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.primary.main,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="logo"
              component={Link}
              to="/"
              sx={{
                '&:hover': {
                  transform: 'scale(1.1)', // Add hover animation
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <SchoolIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                marginLeft: '8px',
              }}
            >
              AcademiX
            </Typography>
          </Box>

          {/* User Profile */}
          <IconButton
            color="inherit"
            onClick={(e) => handleMenuClick(e, 'User')}
            sx={{
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease',
              },
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Navbar Section Below Header */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
              }}
            >
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                sx={{
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                Home
              </Button>

              {/* Loop through categories and render buttons */}
              {categories.map((category) => (
                <Button
                  key={category.name}
                  color="inherit"
                  onClick={(event) => handleMenuClick(event, category.name)}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile View Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="menu"
              sx={{
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Menu for Grouped Items */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {selectedCategory &&
          categories
            .filter((category) => category.name === selectedCategory)
            .map((category) => (
              <Box key={category.name}>
                <Typography sx={{ padding: '8px 16px', fontWeight: 'bold' }}>
                  {category.name}
                </Typography>
                {category.items.map((item) =>
                  item.comingSoon ? (
                    <Tooltip key={item.name} title="Coming Soon">
                      <span>
                        <MenuItem disabled sx={{ opacity: 0.5 }}>
                          {item.icon} {item.name}
                        </MenuItem>
                      </span>
                    </Tooltip>
                  ) : (
                    <MenuItem key={item.name} component={Link} to={item.path}>
                      {item.icon} {item.name}
                    </MenuItem>
                  )
                )}
                <Divider />
              </Box>
            ))}
      </Menu>
    </>
  );
};

export default Header;
