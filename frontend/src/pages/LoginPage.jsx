import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

const LoginSchema = Yup.object().shape({
	username: Yup.string().required('Username is required'),
	password: Yup.string().required('Password is required'),
});

const Login = () => {
	return (
		<div style={{ padding: '50px' }}>
			<h2>Login</h2>
			<Formik
				initialValues={{ username: '', password: '' }}
				validationSchema={LoginSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ handleChange, values }) => (
					<Form>
						<div>
							<Field
								name='username'
								as={TextField}
								label='Username'
								variant='outlined'
								fullWidth
								value={values.username}
								onChange={handleChange}
							/>
							<ErrorMessage name='username' component='div' />
						</div>
						<div>
							<Field
								name='password'
								as={TextField}
								label='Password'
								variant='outlined'
								type='password'
								fullWidth
								value={values.password}
								onChange={handleChange}
							/>
							<ErrorMessage name='password' component='div' />
						</div>
						<Button variant='contained' type='submit'>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Login;
