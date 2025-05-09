import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from '../../redux/actions/subjectsActions';
import SubjectList from './SubjectList';
import SubjectForm from './SubjectForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import { Grid, Paper, Typography, Button } from '@mui/material';

const SubjectManagement = () => {
  const dispatch = useDispatch();
  const subjectsState = useSelector((state) => state.subjects || {});
  const { subjects = [], loading = false, error = null } = subjectsState;

  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleAddClick = () => setSelectedSubject(null);
  const handleEditClick = (subject) => setSelectedSubject(subject);
  const handleDeleteClick = (id) => {
    dispatch(deleteSubject(id));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Subject Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: '20px' }}
      >
        Add New Subject
      </Button>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <SubjectForm
              selectedSubject={selectedSubject}
              onSave={(data) => {
                if (selectedSubject) {
                  dispatch(updateSubject(data));
                } else {
                  dispatch(addSubject(data));
                }
                setSelectedSubject(null);
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <SubjectList
              subjects={subjects}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SubjectManagement;
