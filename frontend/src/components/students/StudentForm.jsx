import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, CircularProgress, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudent, updateStudent } from '../../redux/actions/studentActions';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // For editing an existing student
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Student name is required'),
    age: Yup.number()
      .required('Age is required')
      .min(1, 'Age must be greater than 0'),
  });

  useEffect(() => {
    if (id) {
      fetch(`/students/${id}`)
        .then((res) => res.json())
        .then((data) => setStudent(data))
        .catch((err) => console.error('Error fetching student data:', err));
    }
  }, [id]);

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateStudent(id, values)).then(() => {
        dispatch(fetchStudentList()); // Assuming you have a fetchStudentList action
      });
    } else {
      dispatch(addStudent(values)).then(() => {
        dispatch(fetchStudentList()); // Assuming you have a fetchStudentList action
      });
    }
    navigate('/students');
  };

  if (id && !student) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">
        {id ? 'Edit Student' : 'Add Student'}
      </h2>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: student?.firstName || '',
          age: student?.age || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, touched, errors }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  label="Student Name"
                  variant="outlined"
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="age"
                  label="Age"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={values.age}
                  onChange={handleChange}
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />
              </Grid>

              <Grid item xs={12} className="text-center">
                <Button variant="contained" color="primary" type="submit">
                  {id ? 'Update Student' : 'Add Student'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentForm;
