import React, { useState, useEffect } from 'react';
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
  Chip,
  Badge,
  Avatar,
  Fade,
  Slide,
  useScrollTrigger,
  Container,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme, alpha } from '@mui/material/styles';
import {
  School,
  Home,
  People,
  Dashboard,
  Menu as MenuIcon,
  AccountCircle,
  LibraryBooks,
  LocalShipping,
  SchoolOutlined,
  MenuBookOutlined,
  ClassOutlined,
  EventAvailableOutlined,
  Receipt,
  Assessment,
  Notifications,
  Search,
  ExpandMore,
  RocketLaunch,
  TrendingUp,
  Lightbulb,
} from '@mui/icons-material';

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    setScrolled(trigger);
  }, [trigger]);

  const handleMenuClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  // Menu data with enhanced features
  const insightsReportsItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Dashboard />,
      badge: '3',
      color: 'primary',
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: <TrendingUp />,
      badge: 'New',
      color: 'secondary',
    },
  ];

  const peopleManagementItems = [
    {
      name: 'Students',
      path: '/students',
      icon: <People />,
      count: '245',
    },
    {
      name: 'Teachers',
      path: '/teachers',
      icon: <People />,
      count: '32',
    },
    {
      name: 'Staff',
      path: '/staff',
      icon: <People />,
      comingSoon: true,
    },
  ];

  const academicsAttendanceItems = [
    {
      name: 'Academics',
      path: '/academics',
      icon: <MenuBookOutlined />,
      featured: true,
    },
    {
      name: 'School Manager',
      path: '/academics-plan',
      icon: <ClassOutlined />,
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: <EventAvailableOutlined />,
      badge: 'Live',
    },
  ];

  const financialLogisticsItems = [
    {
      name: 'Fees',
      path: '/fees',
      icon: <Receipt />,
      badge: 'Due',
      color: 'error',
    },
    {
      name: 'Transport',
      path: '/transport',
      icon: <LocalShipping />,
    },
    {
      name: 'Inventory',
      path: '/inventory',
      icon: <LocalShipping />,
      comingSoon: true,
    },
  ];

  const resourcesFacilitiesItems = [
    {
      name: 'Library',
      path: '/library',
      icon: <LibraryBooks />,
      count: '1.2k',
    },
    {
      name: 'Labs',
      path: '/labs',
      icon: <SchoolOutlined />,
      comingSoon: true,
    },
  ];

  const userMenuItems = [
    { name: 'Profile', path: '/profile', icon: <AccountCircle /> },
    { name: 'Settings', path: '/settings', icon: <Lightbulb /> },
    { name: 'Logout', path: '/logout', icon: <RocketLaunch /> },
  ];

  const categories = [
    {
      name: 'Insights & Reports',
      icon: <Assessment />,
      items: insightsReportsItems,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      name: 'People Management',
      icon: <People />,
      items: peopleManagementItems,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      name: 'Academics & Attendance',
      icon: <SchoolOutlined />,
      items: academicsAttendanceItems,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      name: 'Financial & Logistics',
      icon: <Receipt />,
      items: financialLogisticsItems,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      name: 'Resources & Facilities',
      icon: <LibraryBooks />,
      items: resourcesFacilitiesItems,
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Main Header */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled
            ? alpha(theme.palette.background.paper, 0.95)
            : theme.palette.primary.main,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          backgroundImage: scrolled
            ? 'none'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          borderBottom: scrolled
            ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
            : 'none',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 70, md: 80 } }}>
          <Container
            maxWidth="xl"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slide direction="right" in={true} timeout={800}>
                <Box
                  component={Link}
                  to="/"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Box
                    component="img"
                    src="/assets/academix.png"
                    alt="AcademiX"
                    sx={{
                      height: { xs: 80, md: 70 },
                      width: 'auto',
                      borderRadius: 100,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      // filter: scrolled ? 'none' : 'brightness(0) invert(1)',
                      // filter: scrolled ? 'brightness(0) invert(1)' : 'none',
                      background: scrolled
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </Box>
              </Slide>

              <Fade in={true} timeout={1000}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background: scrolled
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  AcademiX
                </Typography>
              </Fade>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  component={Link}
                  to="/"
                  startIcon={<Home />}
                  sx={{
                    color: scrolled ? 'text.primary' : 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 18,
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    background: isActiveRoute('/')
                      ? alpha(theme.palette.primary.main, 0.1)
                      : 'transparent',
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.15),
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Home
                </Button>

                {categories.map((category) => (
                  <Tooltip key={category.name} title={category.name} arrow>
                    <Button
                      onClick={(event) => handleMenuClick(event, category.name)}
                      startIcon={category.icon}
                      endIcon={<ExpandMore />}
                      sx={{
                        color: scrolled ? 'text.primary' : 'white',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 18,
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        background:
                          selectedCategory === category.name
                            ? alpha(theme.palette.primary.main, 0.1)
                            : 'transparent',
                        '&:hover': {
                          background: alpha(theme.palette.primary.main, 0.15),
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {category.name.split(' ')[0]}
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            )}

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Search Icon */}
              {!isMobile && (
                <Tooltip title="Search" arrow>
                  <IconButton
                    sx={{
                      color: scrolled ? 'text.primary' : 'white',
                      background: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.2),
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Search />
                  </IconButton>
                </Tooltip>
              )}

              {/* Notifications */}
              {!isMobile && (
                <Tooltip title="Notifications" arrow>
                  <IconButton
                    sx={{
                      color: scrolled ? 'text.primary' : 'white',
                      background: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.2),
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Badge badgeContent={4} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* User Profile */}
              <Tooltip title="Account" arrow>
                <IconButton
                  onClick={(event) => handleMenuClick(event, 'User')}
                  sx={{
                    color: scrolled ? 'text.primary' : 'white',
                    background: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.2),
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    <AccountCircle />
                  </Avatar>
                </IconButton>
              </Tooltip>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  onClick={handleMobileMenuOpen}
                  sx={{
                    color: scrolled ? 'text.primary' : 'white',
                    background: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Spacer for fixed header */}
      <Toolbar sx={{ minHeight: { xs: 70, md: 80 } }} />

      {/* Enhanced Desktop Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            minWidth: 320,
            overflow: 'visible',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {selectedCategory === 'User'
          ? userMenuItems.map((item) => (
              <MenuItem
                key={item.name}
                component={Link}
                to={item.path}
                onClick={handleMenuClose}
                sx={{
                  py: 2,
                  px: 3,
                  gap: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {item.icon}
                <Typography variant="body1" fontWeight={500}>
                  {item.name}
                </Typography>
              </MenuItem>
            ))
          : categories
              .filter((category) => category.name === selectedCategory)
              .map((category) => (
                <Box key={category.name} sx={{ p: 2 }}>
                  <Box
                    sx={{
                      background: category.color,
                      borderRadius: 3,
                      p: 3,
                      mb: 2,
                      color: 'white',
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Manage your {category.name.toLowerCase()} efficiently
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    {category.items.map((item) => (
                      <MenuItem
                        key={item.name}
                        component={item.comingSoon ? 'div' : Link}
                        to={item.path}
                        onClick={item.comingSoon ? null : handleMenuClose}
                        disabled={item.comingSoon}
                        sx={{
                          py: 2,
                          px: 2,
                          borderRadius: 2,
                          gap: 2,
                          '&:hover': {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.08
                            ),
                            transform: 'translateX(4px)',
                          },
                          transition: 'all 0.2s ease',
                          position: 'relative',
                        }}
                      >
                        <Box
                          sx={{
                            background: alpha(theme.palette.primary.main, 0.1),
                            borderRadius: 2,
                            p: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {React.cloneElement(item.icon, {
                            sx: {
                              fontSize: 22,
                              color: theme.palette.primary.main,
                            },
                          })}
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" fontWeight={500}>
                            {item.name}
                          </Typography>
                          {item.count && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {item.count} records
                            </Typography>
                          )}
                        </Box>

                        {/* Badges */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {item.badge && (
                            <Chip
                              label={item.badge}
                              size="small"
                              color={item.color || 'primary'}
                              variant="filled"
                            />
                          )}
                          {item.featured && (
                            <Chip
                              label="Featured"
                              size="small"
                              color="secondary"
                              variant="outlined"
                            />
                          )}
                          {item.comingSoon && (
                            <Chip
                              label="Coming Soon"
                              size="small"
                              color="default"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </MenuItem>
                    ))}
                  </Box>
                </Box>
              ))}
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            width: '100vw',
            maxWidth: '100%',
            height: '100vh',
            borderRadius: 0,
            mt: 0,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              component={Link}
              to="/"
              startIcon={<Home />}
              onClick={handleMobileMenuClose}
              fullWidth
              sx={{ justifyContent: 'flex-start', py: 2 }}
            >
              Home
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                startIcon={category.icon}
                onClick={(event) => {
                  handleMenuClick(event, category.name);
                  handleMobileMenuClose();
                }}
                fullWidth
                sx={{ justifyContent: 'flex-start', py: 2 }}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default Header;
