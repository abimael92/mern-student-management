import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Public as PublicIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import defaultProfile from '../../assets/profile-default.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from '../../redux/actions/classesActions';

const TeacherCard = ({ teacher, onEdit, onDelete, onStatusChange }) => {
  const dispatch = useDispatch();
  const { classes = [], loading } = useSelector((state) => state.classes || {});
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  if (!teacher) return null;
  if (loading) return <Typography>Loading classes...</Typography>;

  const fullName =
    teacher.fullName || `${teacher.firstName} ${teacher.lastName}`;
  const statusMap = {
    available: 'success',
    busy: 'warning',
    'on leave': 'secondary',
    inactive: 'default',
  };
  const status = teacher.status || 'Unknown';
  const statusColor = statusMap[teacher.status] || 'default';
  const cardBg = teacher.isActive ? '#e8f5e9' : '#ffebee';
  const profileImage = teacher.profilePicture || defaultProfile;
  const studentCount = teacher.tutoredStudents?.length || 0;
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  console.log(' TeacherCard :', teacher);

  return (
    <Card
      sx={{
        maxWidth: 360,
        m: 2,
        bgcolor: cardBg,
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        opacity: !teacher.isActive ? 0.5 : 1,
      }}
    >
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
            label={capitalize(status)}
            color={statusColor}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          px={1}
          sx={{ mb: 2, gap: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {teacher.yearsOfExperience} yrs exp
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PublicIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {teacher.address?.country || 'N/A'}
            </Typography>
          </Box>
        </Box>

        {/* Accordion for extra details */}
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          sx={{ mt: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              {expanded ? 'Hide Details' : 'Show More'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {teacher.teacherNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {teacher.email}
            </Typography>
            <Box>
              {teacher.classes?.length > 0 ? (
                teacher.classes.map((clsId) => {
                  const classObj = classes.find((c) => c._id === clsId);
                  return (
                    <Chip
                      key={clsId}
                      label={classObj?.name || 'Unknown Class'}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  );
                })
              ) : (
                <Typography variant="body2">No classes assigned</Typography>
              )}

              {/* Additional details */}
              <Box sx={{ mt: 1 }}>
                {/* Joining Date */}
                {teacher.joiningDate && (
                  <Typography variant="body2">
                    <strong>Joining Date:</strong>{' '}
                    {new Date(teacher.joiningDate).toLocaleDateString()}
                  </Typography>
                )}

                {/* Qualifications */}
                {teacher.qualifications?.length > 0 ? (
                  <Typography variant="body2">
                    <strong>Qualifications:</strong>{' '}
                    {teacher.qualifications.join(', ')}
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    <strong>Qualifications:</strong> N/A
                  </Typography>
                )}

                {/* Certificates */}
                {teacher.certificates?.length > 0 ? (
                  <Typography variant="body2">
                    <strong>Certificates:</strong>{' '}
                    {teacher.certificates.map((c) => c.name).join(', ')}
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    <strong>Certificates:</strong> N/A
                  </Typography>
                )}

                {/* Emergency Contact */}
                {teacher.emergencyContact ? (
                  <Typography variant="body2">
                    <strong>Emergency Contact:</strong>{' '}
                    {teacher.emergencyContact.name
                      ? `${teacher.emergencyContact.name} (${teacher.emergencyContact.relation}) - ${teacher.emergencyContact.phone}`
                      : 'N/A'}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Actions */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
          <Tooltip title="Edit Teacher" arrow>
            <IconButton onClick={() => onEdit(teacher)}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Teacher" arrow>
            <IconButton onClick={() => onDelete(teacher._id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title={teacher.isActive ? 'Deactivate' : 'Activate'} arrow>
            <IconButton
              onClick={() => onStatusChange(teacher._id, teacher.isActive)} // or teacher.isActive
              aria-label={`${teacher.isActive ? 'Deactivate' : 'Activate'} ${fullName}`}
            >
              {teacher.isActive ? (
                <CancelIcon color="error" />
              ) : (
                <CheckCircleIcon color="success" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(TeacherCard);
