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
  Collapse,
  Button,
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
  const dispatch = useDispatch();
  const { classes = [], loading } = useSelector((state) => state.classes || {});
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  if (!teacher) return null;
  if (loading) return <Typography>Loading classes...</Typography>;

  const statusMap = {
    available: 'success',
    busy: 'warning',
    'on leave': 'secondary',
    inactive: 'default',
  };

  const fullName =
    teacher.fullName || `${teacher.firstName} ${teacher.lastName}`;
  const status = teacher.status || 'Unknown';
  const statusColor = statusMap[teacher.status] || 'default';
  const isActive = teacher.isActive;
  const cardBg = isActive ? '#e8f5e9' : '#ffebee';
  const profileImage = teacher.profilePicture || defaultProfile;
  const studentCount = teacher.tutoredStudents?.length || 0;
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        bgcolor: cardBg,
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
            label={capitalize(status)}
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

        {/* Show More Button */}
        <Button size="small" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : 'Show More'}
        </Button>

        <Collapse in={expanded}>
          <Box sx={{ mt: 1 }}>
            {/* Classes */}
            {teacher.classes?.length > 0 ? (
              teacher.classes.map((clsId) => {
                const classObj = classes.find((c) => c._id === clsId);
                return (
                  <Chip
                    key={clsId}
                    label={classObj ? classObj.name : 'Unknown Class'}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
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
                  {teacher.address?.country || 'Unknown'}
                </Typography>
              </Box>

              {/* Edit/Delete */}
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
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default React.memo(TeacherCard);
