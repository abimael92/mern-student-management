import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #2563eb, #1e40af)',
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Login
        </Typography>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, values }) => (
            <Form>
              <Box mb={3}>
                <Field
                  name="username"
                  as={TextField}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={values.username}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </Box>

              <Box mb={3}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </Box>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  bgcolor: '#2563eb',
                  '&:hover': { bgcolor: '#1e40af' },
                  transition: 'transform 0.3s ease-in-out',
                  '&:active': { transform: 'scale(0.95)' },
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;
