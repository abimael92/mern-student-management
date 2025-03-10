import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@mui/material';

const StudentCard = ({ student, onEdit, onDelete, onToggleStatus }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        m: 2,
        // bgcolor: student.isEnrolled ? '#e8f5e9' : '#ffebee',
        boxShadow: 3,
        borderRadius: 2,
        transition: '0.3s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={student.picture || '/default-avatar.png'}
        alt="Student Picture"
        sx={{ objectFit: 'cover' }}
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
        <Box display="flex" justifyContent="space-around" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEdit(student)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => onDelete(student.studentNumber)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color={student.isEnrolled ? 'warning' : 'success'}
            onClick={() => onToggleStatus(student.studentNumber)}
          >
            {student.isEnrolled ? 'Deactivate' : 'Activate'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
