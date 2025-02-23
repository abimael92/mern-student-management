import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import StudentList from '../components/StudentList';

const DashboardPage = () => {
	return (
		<Container>
			<h2>Dashboard</h2>
			<Button component={Link} to='/add-student' variant='contained'>
				Add Student
			</Button>
			<StudentList />
		</Container>
	);
};

export default DashboardPage;
