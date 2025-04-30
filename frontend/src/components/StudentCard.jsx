import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import defaultProfile from '../assets/profile-default.png';
import { getPublicUrl } from '../utils/helpers';

const StudentCard = ({ student, onEdit, onDelete, onToggleStatus }) => {
  console.log(student);
  console.log(student?.profilePicture);
  if (!student) {
    return null; // Don't render anything if student data is missing
  }

  return (
    <Card
      sx={{
        maxWidth: 360,
        m: 2,
        bgcolor: student?.isEnrolled ? '#e8f5e9' : '#ffebee',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        image={
          student?.profilePicture
            ? getPublicUrl(student.profilePicture)
            : defaultProfile
        }
        alt="Student"
        sx={{ height: 200, objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          {`${student.firstName} ${student.lastName}`}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color={student.isEnrolled ? 'green' : 'red'}
        >
          {student.isEnrolled ? 'Enrolled' : 'Not Enrolled'}
        </Typography>

        <Box mt={2}>
          <Typography variant="body2">
            <strong>Grade:</strong> {student.grade}
          </Typography>
          <Typography variant="body2">
            <strong>Age:</strong> {student.age ?? 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>DOB:</strong> {student.dateOfBirth}
          </Typography>
          <Typography variant="body2">
            <strong>Tutor:</strong> {student.tutor}
          </Typography>
        </Box>

        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">More Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>Emergency:</strong> {student.emergencyContact?.name} (
              {student.emergencyContact?.relation})
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> {student.emergencyContact?.phone}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {student.contactInfo?.email}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {student.address?.street},{' '}
              {student.address?.city}
            </Typography>
            <Typography variant="body2">
              <strong>Nationality:</strong> {student.nationality}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Box display="flex" justifyContent="space-around" mt={2}>
          <Tooltip title="Edit Student">
            <IconButton onClick={() => onEdit(student)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Student">
            <IconButton onClick={() => onDelete(student.studentNumber)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={student.isEnrolled ? 'Deactivate' : 'Activate'}>
            <IconButton onClick={() => onToggleStatus(student.studentNumber)}>
              {student.isEnrolled ? <CancelIcon /> : <CheckCircleIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
