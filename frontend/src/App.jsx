import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentForm from './components/StudentForm';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/dashboard' element={<DashboardPage />} />
				<Route path='/add-student' element={<StudentForm />} />
				<Route path='/edit-student/:id' element={<StudentForm />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
