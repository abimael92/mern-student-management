import React, { useState } from 'react';
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
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import defaultProfile from '../assets/profile-default.png';
import { getPublicUrl } from '../utils/helpers';

const StudentCard = ({ student, onEdit, onDelete, onToggleStatus }) => {
  const [expanded, setExpanded] = useState(false);

  if (!student) return null;

  // Memoize calculated values
  const fullName = `${student.firstName} ${student.lastName}`;
  const enrollmentStatus = student.isEnrolled ? 'Enrolled' : 'Not Enrolled';
  const enrollmentColor = student.isEnrolled ? 'green' : 'red';
  const cardBg = student.isEnrolled ? '#e8f5e9' : '#ffebee';
  const detailsBg = student.isEnrolled ? '#c8e6c9' : '#ffcdd2';
  const profileImage = student.profilePicture
    ? getPublicUrl(student.profilePicture)
    : defaultProfile;

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 360,
        m: 2,
        bgcolor: cardBg,
        boxShadow: 3,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
      aria-label={`Student card for ${fullName}`}
    >
      <CardMedia
        component="img"
        image={profileImage}
        alt={`Profile of ${fullName}`}
        sx={{
          height: 300,
          objectFit: 'cover',
        }}
      />

      <CardContent>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 'bold' }}
          component="h3"
        >
          {fullName}
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color={enrollmentColor}
          sx={{ mb: 2 }}
        >
          {enrollmentStatus}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          px={1}
          sx={{ mb: 2 }}
        >
          <Typography variant="body2">
            <strong>Grade:</strong> {student.grade || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Age:</strong> {student.age || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tutor:</strong> {student.tutor || 'N/A'}
          </Typography>
        </Box>

        <Accordion
          expanded={expanded}
          onChange={handleAccordionChange}
          sx={{ bgcolor: detailsBg }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="student-details-content"
            id="student-details-header"
          >
            <Typography variant="subtitle2">
              {expanded ? 'Hide Details' : 'Show Details'}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box component="dl" sx={{ m: 0 }}>
              <DetailItem label="DOB" value={student.dateOfBirth || 'N/A'} />
              <DetailItem
                label="Emergency"
                value={
                  student.emergencyContact?.name
                    ? `${student.emergencyContact.name} (${student.emergencyContact.relation || 'N/A'})`
                    : 'N/A'
                }
              />
              <DetailItem
                label="Phone"
                value={student.emergencyContact?.phone || 'N/A'}
              />
              <DetailItem
                label="Email"
                value={student.contactInfo?.email || 'N/A'}
              />
              <DetailItem
                label="Address"
                value={
                  student.address?.street
                    ? `${student.address.street}, ${student.address.city || ''}`
                    : 'N/A'
                }
              />
              <DetailItem
                label="Nationality"
                value={student.nationality || 'N/A'}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box
          display="flex"
          justifyContent="space-around"
          mt={2}
          aria-label="Student actions"
        >
          <Tooltip title="Edit Student" arrow>
            <IconButton
              onClick={() => onEdit(student)}
              aria-label={`Edit ${fullName}`}
            >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Student" arrow>
            <IconButton
              onClick={() => onDelete(student.studentNumber)}
              aria-label={`Delete ${fullName}`}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>

          <Tooltip title={student.isEnrolled ? 'Deactivate' : 'Activate'} arrow>
            <IconButton
              onClick={() => onToggleStatus(student)}
              aria-label={`${student.isEnrolled ? 'Deactivate' : 'Activate'} ${fullName}`}
            >
              {student.isEnrolled ? (
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

// Helper component for consistent detail item rendering
const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 1 }}>
    <Typography
      component="dt"
      variant="body2"
      sx={{
        display: 'inline',
        fontWeight: 'bold',
        mr: 1,
      }}
    >
      {label}:
    </Typography>
    <Typography component="dd" variant="body2" sx={{ display: 'inline' }}>
      {value}
    </Typography>
  </Box>
);

export default React.memo(StudentCard);
