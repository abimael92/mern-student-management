import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import defaultProfile from '../../assets/profile-default.png';

const TeacherCard = ({ teacher, onEdit, onDelete }) => {
  if (!teacher) return null;

  const fullName =
    teacher.fullName || `${teacher.firstName} ${teacher.lastName}`;
  const statusColor = teacher.status === 'active' ? 'success' : 'error';
  const statusText = teacher.status === 'active' ? 'Active' : 'Inactive';
  const profileImage = teacher.profilePicture || defaultProfile;
  const studentCount = teacher.tutoredStudents?.length || 0;

  console.log(' Teacher profileImage:', profileImage);

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={profileImage}
        alt={fullName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {fullName}
          <Chip
            label={statusText}
            color={statusColor}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {teacher.email}
        </Typography>

        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {teacher.subjects?.map((subject, index) => (
            <Chip key={index} label={subject} size="small" />
          ))}
        </Box>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
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
      </CardContent>
    </Card>
  );
};

export default React.memo(TeacherCard);
