import React from 'react';
import {
  Dashboard,
  TrendingUp,
  People,
  MenuBookOutlined,
  ClassOutlined,
  EventAvailableOutlined,
  Receipt,
  LibraryBooks,
  LocalShipping,
  SchoolOutlined,
  Assessment,
  AccountCircle,
  Lightbulb,
  RocketLaunch,
  LocalHospital,
  EventNote,
} from '@mui/icons-material';

const base = (path, prefix) =>
  path.startsWith('/') ? `${prefix}${path}` : `${prefix}/${path}`;

const getNavConfig = (role) => {
  const p = role ? `/${role}` : '';

  if (role === 'admin') {
    return {
      homePath: `${p}/dashboard`,
      categories: [
        {
          name: 'Insights & Reports',
          icon: <Assessment />,
          items: [
            {
              name: 'Dashboard',
              path: base('/dashboard', p),
              icon: <Dashboard />,
              badge: '3',
              color: 'primary',
            },
            {
              name: 'Analytics',
              path: base('/analytics', p),
              icon: <TrendingUp />,
              badge: 'New',
              color: 'secondary',
            },
          ],
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'People Management',
          icon: <People />,
          items: [
            {
              name: 'Students',
              path: base('/students', p),
              icon: <People />,
              count: '245',
            },
            {
              name: 'Teachers',
              path: base('/teachers', p),
              icon: <People />,
              count: '32',
            },
            { name: 'Users', path: base('/users', p), icon: <People /> },
          ],
          color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        {
          name: 'Academics & Attendance',
          icon: <SchoolOutlined />,
          items: [
            {
              name: 'Academics',
              path: base('/academics', p),
              icon: <MenuBookOutlined />,
              featured: true,
            },
            {
              name: 'School Manager',
              path: base('/academics-plan', p),
              icon: <ClassOutlined />,
            },
            {
              name: 'Attendance',
              path: base('/attendance', p),
              icon: <EventAvailableOutlined />,
              badge: 'Live',
            },
          ],
          color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        },
        {
          name: 'Financial & Logistics',
          icon: <Receipt />,
          items: [
            {
              name: 'Fees',
              path: base('/fees', p),
              icon: <Receipt />,
              badge: 'Due',
              color: 'error',
            },
            {
              name: 'Transport',
              path: base('/transport', p),
              icon: <LocalShipping />,
            },
          ],
          color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        },
        {
          name: 'Resources & Facilities',
          icon: <LibraryBooks />,
          items: [
            {
              name: 'Library',
              path: base('/library', p),
              icon: <LibraryBooks />,
              count: '1.2k',
            },
          ],
          color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        },
      ],
      userMenuItems: [
        { name: 'Profile', path: base('/profile', p), icon: <AccountCircle /> },
        { name: 'Settings', path: base('/settings', p), icon: <Lightbulb /> },
        {
          name: 'Logout',
          path: '/login',
          icon: <RocketLaunch />,
          isLogout: true,
        },
      ],
    };
  }

  if (role === 'teacher') {
    return {
      homePath: p,
      categories: [
        {
          name: 'Insights & Reports',
          icon: <Assessment />,
          items: [
            { name: 'Dashboard', path: p, icon: <Dashboard /> },
            {
              name: 'Analytics',
              path: base('/analytics', p),
              icon: <TrendingUp />,
            },
          ],
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'Teaching',
          icon: <SchoolOutlined />,
          items: [
            {
              name: 'My Classes',
              path: base('/classes', p),
              icon: <ClassOutlined />,
            },
            {
              name: 'Attendance',
              path: base('/attendance', p),
              icon: <EventAvailableOutlined />,
              badge: 'Live',
            },
          ],
          color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        },
      ],
      userMenuItems: [
        { name: 'Profile', path: base('/profile', p), icon: <AccountCircle /> },
        { name: 'Settings', path: base('/settings', p), icon: <Lightbulb /> },
        {
          name: 'Logout',
          path: '/login',
          icon: <RocketLaunch />,
          isLogout: true,
        },
      ],
    };
  }

  if (role === 'student') {
    return {
      homePath: p,
      categories: [
        {
          name: 'My Portal',
          icon: <People />,
          items: [
            { name: 'Dashboard', path: p, icon: <Dashboard /> },
            {
              name: 'My Profile',
              path: base('/profile', p),
              icon: <AccountCircle />,
            },
            {
              name: 'My Attendance',
              path: base('/attendance', p),
              icon: <EventNote />,
            },
          ],
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
      userMenuItems: [
        { name: 'Profile', path: base('/profile', p), icon: <AccountCircle /> },
        {
          name: 'Logout',
          path: '/login',
          icon: <RocketLaunch />,
          isLogout: true,
        },
      ],
    };
  }

  if (role === 'nurse') {
    return {
      homePath: p,
      categories: [
        {
          name: 'Health',
          icon: <LocalHospital />,
          items: [
            { name: 'Dashboard', path: p, icon: <Dashboard /> },
            {
              name: 'Health Records',
              path: base('/health-records', p),
              icon: <LocalHospital />,
            },
          ],
          color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        },
      ],
      userMenuItems: [
        { name: 'Profile', path: base('/profile', p), icon: <AccountCircle /> },
        {
          name: 'Logout',
          path: '/login',
          icon: <RocketLaunch />,
          isLogout: true,
        },
      ],
    };
  }

  if (role === 'secretary') {
    return {
      homePath: p,
      categories: [
        {
          name: 'Office',
          icon: <People />,
          items: [
            { name: 'Dashboard', path: p, icon: <Dashboard /> },
            {
              name: 'Enrollment',
              path: base('/enrollment', p),
              icon: <People />,
            },
            { name: 'Students', path: base('/students', p), icon: <People /> },
          ],
          color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
      ],
      userMenuItems: [
        { name: 'Profile', path: base('/profile', p), icon: <AccountCircle /> },
        {
          name: 'Logout',
          path: '/login',
          icon: <RocketLaunch />,
          isLogout: true,
        },
      ],
    };
  }

  if (role === 'director') {
    return {
      homePath: p,
      categories: [
        {
          name: 'Insights & Reports',
          icon: <Assessment />,
          items: [
            { name: 'Dashboard', path: p, icon: <Dashboard /> },
            {
              name: 'Analytics',
              path: base('/analytics', p),
              icon: <TrendingUp />,
            },
            {
              name: 'Reports',
              path: base('/reports', p),
              icon: <TrendingUp />,
            },
          ],
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'Overview',
          icon: <People />,
          items: [
            { name: 'Students', path: base('/students', p), icon: <People /> },
            { name: 'Teachers', path: base('/teachers', p), icon: <People /> },
          ],
          color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
      ],
      userMenuItems: [
        { name: 'Profile', path: base('/profile', p), icon: <AccountCircle /> },
        {
          name: 'Logout',
          path: '/login',
          icon: <RocketLaunch />,
          isLogout: true,
        },
      ],
    };
  }

  return {
    homePath: p || '/',
    categories: [],
    userMenuItems: [
      {
        name: 'Logout',
        path: '/login',
        icon: <RocketLaunch />,
        isLogout: true,
      },
    ],
  };
};

export default getNavConfig;
