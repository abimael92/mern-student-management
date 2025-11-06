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

import { Typography, Grid, Box, Paper } from '@mui/material';

const SubjectManagement = () => {
  const dispatch = useDispatch();
  const {
    subjects = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.subjects || {});

  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    dispatch(fetchSubjects());
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
    dispatch(deleteSubject(id)).then(() => dispatch(fetchSubjects()));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Subject Management
      </Typography>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      {/* Subjects List */}
      <Paper
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <SubjectList
          subjects={subjects}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </Paper>

      {/* Subject Form */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <SubjectForm
          initialData={selectedSubject || {}}
          onSubmit={handleSave}
          onCancel={() => setSelectedSubject(null)}
        />
      </Paper>
    </Box>
  );
};

export default SubjectManagement;
