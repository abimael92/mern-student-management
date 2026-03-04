import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  const map = {
    admin: [
      { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
      { label: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
      { label: 'Settings', icon: <AssignmentIcon />, path: '/admin/settings' }
    ],
    teacher: [
      { label: 'Dashboard', icon: <DashboardIcon />, path: '/teacher' },
      { label: 'My Classes', icon: <SchoolIcon />, path: '/teacher/classes' },
      { label: 'Mark Attendance', icon: <AssignmentIcon />, path: '/teacher/attendance' }
    ],
    student: [
      { label: 'Dashboard', icon: <DashboardIcon />, path: '/student' },
      { label: 'My Profile', icon: <PeopleIcon />, path: '/student/profile' },
      { label: 'My Attendance', icon: <EventNoteIcon />, path: '/student/attendance' }
    ],
    nurse: [
      { label: 'Dashboard', icon: <DashboardIcon />, path: '/nurse' },
      { label: 'Health Records', icon: <LocalHospitalIcon />, path: '/nurse/health-records' }
    ],
    secretary: [
      { label: 'Dashboard', icon: <DashboardIcon />, path: '/secretary' },
      { label: 'Enrollment', icon: <PeopleIcon />, path: '/secretary/enrollment' }
    ]
  };

  const items = map[role] || [];

  return (
    <List>
      {items.map((item) => (
        <ListItemButton key={item.path} onClick={() => navigate(item.path)}>
          <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default Sidebar;

