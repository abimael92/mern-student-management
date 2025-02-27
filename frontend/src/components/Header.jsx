// Header.jsx
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Button color='inherit' component={Link} to='/'>
					Home
				</Button>
				<Button color='inherit' component={Link} to='/students'>
					Students
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
