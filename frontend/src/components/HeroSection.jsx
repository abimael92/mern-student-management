import React from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const HeroSection = () => {
	const history = useHistory();

	const handleLoginClick = () => {
		history.push('/login');
	};

	return (
		<section style={{ padding: '50px', textAlign: 'center' }}>
			<h1>Welcome to School Management System</h1>
			<p>Manage students, grades, and more with ease</p>
			<Button variant='contained' onClick={handleLoginClick}>
				Login
			</Button>
		</section>
	);
};

export default HeroSection;
