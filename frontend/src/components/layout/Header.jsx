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
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null); // Track Selected Category
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    },
  ];

  const academicsAttendanceItems = [
    {
      name: 'Academics',
      path: '/academics',
      icon: <SchoolOutlinedIcon />,
      // comingSoon: true,
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
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.primary.main,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
                  transform: 'scale(1.1)',
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
            onClick={(event) => handleMenuClick(event, 'User')}
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
            <Box sx={{ display: 'flex', gap: '16px' }}>
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
        {selectedCategory === 'User'
          ? userMenuItems.map((item) => (
              <MenuItem
                key={item.name}
                component={Link}
                to={item.path}
                onClick={handleMenuClose}
              >
                {item.icon} {item.name}
              </MenuItem>
            ))
          : selectedCategory &&
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
                      <MenuItem
                        key={item.name}
                        component={Link}
                        to={item.path}
                        onClick={handleMenuClose}
                      >
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
