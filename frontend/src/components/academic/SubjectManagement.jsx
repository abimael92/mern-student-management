import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from '../../redux/actions/subjectsActions';

import { fetchTeachers } from '../../redux/actions/teacherActions';
import { fetchStudents } from '../../redux/actions/studentActions';

import SubjectList from './SubjectList';
import SubjectForm from './SubjectForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';

import { Typography, Paper, Grid, Box } from '@mui/material';

const SubjectManagement = () => {
  const dispatch = useDispatch();
  const subjectsState = useSelector((state) => state.subjects || {});
  const teachersState = useSelector((state) => state.teachers || {});
  const studentsState = useSelector((state) => state.students || {});

  const { subjects = [], loading = false, error = null } = subjectsState;
  const { teachers = [] } = teachersState;
  const { students = [] } = studentsState;

  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchTeachers());
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleEditClick = (subject) => setSelectedSubject(subject);

  const handleSave = async (data) => {
    if (selectedSubject) {
      await dispatch(updateSubject({ ...data, _id: selectedSubject._id }));
    } else {
      await dispatch(addSubject(data));
    }
    setSelectedSubject(null);
    dispatch(fetchSubjects());
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteSubject(id)).then(() => {
      dispatch(fetchSubjects());
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Subject Management
      </Typography>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box style={{ padding: '20px' }}>
            <SubjectList
              subjects={subjects}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box style={{ padding: '20px' }}>
            <SubjectForm
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              onSave={handleSave}
              onCancel={() => setSelectedSubject(null)}
              teachers={teachers}
              students={students}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SubjectManagement;
