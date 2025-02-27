import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudent, updateStudent } from '../redux/actions/studentActions';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const StudentForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams(); // For editing an existing student
	const [student, setStudent] = useState(null);

	const validationSchema = Yup.object({
		studentName: Yup.string().required('Student name is required'),
		age: Yup.number()
			.required('Age is required')
			.min(1, 'Age must be greater than 0'),
	});

	useEffect(() => {
		if (id) {
			// Fetch student data if editing
			// Replace with actual API request to fetch student
			fetch(`/students/${id}`)
				.then((res) => res.json())
				.then((data) => setStudent(data));
		}
	}, [id]);

	const handleSubmit = (values) => {
		if (id) {
			dispatch(updateStudent(id, values)); // Update student
		} else {
			dispatch(addStudent(values)); // Add new student
		}
		navigate.push('/students');
	};

	if (id && !student) {
		return <div>Loading...</div>;
	}

	return (
		<div style={{ padding: '20px' }}>
			<h2>{id ? 'Edit Student' : 'Add Student'}</h2>
			<Formik
				initialValues={{
					studentName: student?.studentName || '',
					age: student?.age || '',
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, handleChange }) => (
					<Form>
						<Field
							name='studentName'
							as={TextField}
							label='Student Name'
							variant='outlined'
							fullWidth
							value={values.studentName}
							onChange={handleChange}
						/>
						<ErrorMessage name='studentName' component='div' />

						<Field
							name='age'
							as={TextField}
							label='Age'
							variant='outlined'
							fullWidth
							value={values.age}
							onChange={handleChange}
						/>
						<ErrorMessage name='age' component='div' />

						<Button variant='contained' type='submit'>
							{id ? 'Update Student' : 'Add Student'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default StudentForm;
