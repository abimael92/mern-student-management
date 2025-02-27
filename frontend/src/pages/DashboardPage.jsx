import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import StudentList from '../components/StudentList';

const DashboardPage = () => {
  return (
    <Container className="min-h-screen flex flex-col items-center justify-center py-8">
      <Typography
        variant="h3"
        className="text-center text-gray-800 mb-6 font-bold"
      >
        Dashboard
      </Typography>
      <Button
        component={Link}
        to="/add-student"
        variant="contained"
        color="primary"
        className="mb-6"
        size="large"
      >
        Add Student
      </Button>
      <StudentList />
    </Container>
  );
};

export default DashboardPage;
