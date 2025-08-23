import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import defaultProfile from '../../assets/profile-default.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from '../../redux/actions/classesActions';

const TeacherCard = ({ teacher, onEdit, onDelete }) => {
  if (!teacher) return null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const { classes = [], loading } = useSelector((state) => state.classes || {});

  const statusMap = {
    available: 'success',
    busy: 'warning',
    'on leave': 'secondary', // purple
    inactive: 'default',
  };

  if (!teacher) return null;
  if (loading) return <Typography>Loading classes...</Typography>;

  const fullName =
    teacher.fullName || `${teacher.firstName} ${teacher.lastName}`;
  const status = statusMap[teacher.status] || 'default';
  const statusColor = statusMap[teacher.status] || 'default';
  const statusText = teacher.status || 'Unknown';
  const isActive = teacher.isActive;
  const profileImage = teacher.profilePicture || defaultProfile;
  const studentCount = teacher.tutoredStudents?.length || 0;
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  // console.log(' Teacher teacher:', teacher);
  // console.log(' Teacher classes:', classes);

  console.log(' status:', status);
  console.log('Redux classes:', classes);
  console.log('Teacher classes:', teacher.classes);

  return (
    <Card
      sx={{
        maxWidth: 345,
        Height: 450,
        m: 2,
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        opacity: !isActive ? 0.5 : 1,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={profileImage}
        alt={fullName}
      />
      <CardContent>
        {/* Name + Status */}
        <Typography gutterBottom variant="h5" component="div">
          {fullName}
          <Chip
            label={capitalize(statusText)}
            color={statusColor}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>
        <Divider sx={{ my: 1 }} />

        {/* Teacher Number & Email */}
        <Typography variant="body2" color="text.secondary">
          {teacher.teacherNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {teacher.email}
        </Typography>

        {/* Classes */}
        {teacher.classes?.length > 0 ? (
          teacher.classes.map((clsId) => {
            console.log(`Processing class ID: ${clsId}`);

            const classObj = classes.find((c) => {
              console.log('Checking class:', c);
              let foundClass = c._id === clsId;
              console.log(`Class ${c._id} matches ${clsId}:`, foundClass);
              return foundClass;
            });

            console.log('Found class object:', classObj);
            console.log(`Class ID: ${clsId}, Class Object:`, classObj);
            return (
              <Chip
                key={clsId}
                label={classObj ? classObj.name : 'Unknown Class'}
                size="small"
              />
            );
          })
        ) : (
          <Typography variant="body2" color="text.secondary">
            No classes assigned
          </Typography>
        )}

        {/* Meta Info */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <PersonIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <WorkIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {teacher.yearsOfExperience} yrs experience
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <PublicIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {teacher.address?.country}
            </Typography>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Edit Teacher">
              <IconButton onClick={() => onEdit(teacher)}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Teacher">
              <IconButton onClick={() => onDelete(teacher._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(TeacherCard);
