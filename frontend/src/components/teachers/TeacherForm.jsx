import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Chip,
  Box,
  Typography,
} from '@mui/material';

const TeacherForm = ({ open, onClose, teacher, students }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subjects: [],
    tutoredStudents: [],
    isActive: true,
  });

  const [availableStudents, setAvailableStudents] = useState([]);

  useEffect(() => {
    if (teacher) {
      setFormData({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        subjects: teacher.subjects || [],
        tutoredStudents: teacher.tutoredStudents || [],
        isActive: teacher.isActive,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subjects: [],
        tutoredStudents: [],
        isActive: true,
      });
    }
  }, [teacher]);

  useEffect(() => {
    if (students) {
      const filtered = students.filter(
        (student) => !formData.tutoredStudents.includes(student._id)
      );
      setAvailableStudents(filtered);
    }
  }, [students, formData.tutoredStudents]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(formData);
  };

  const handleAddStudent = (studentId) => {
    if (!formData.tutoredStudents.includes(studentId)) {
      setFormData((prev) => ({
        ...prev,
        tutoredStudents: [...prev.tutoredStudents, studentId],
      }));
    }
  };

  const handleRemoveStudent = (studentId) => {
    setFormData((prev) => ({
      ...prev,
      tutoredStudents: prev.tutoredStudents.filter((id) => id !== studentId),
    }));
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)} maxWidth="md" fullWidth>
      <DialogTitle>{teacher ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="First Name"
              fullWidth
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
            <TextField
              label="Last Name"
              fullWidth
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </Box>
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            sx={{ mb: 2 }}
          />
          <Autocomplete
            multiple
            options={[
              'Math',
              'Science',
              'English',
              'History',
              'Art',
              'Music',
              'PE',
              'Computers',
              'Languages',
            ]}
            value={formData.subjects}
            onChange={(e, newValue) =>
              setFormData({ ...formData, subjects: newValue })
            }
            renderInput={(params) => (
              <TextField {...params} label="Subjects" fullWidth />
            )}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Assigned Students
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {formData.tutoredStudents.map((studentId) => {
              const student = students.find((s) => s._id === studentId);
              return student ? (
                <Chip
                  key={studentId}
                  label={`${student.firstName} ${student.lastName}`}
                  onDelete={() => handleRemoveStudent(studentId)}
                />
              ) : null;
            })}
          </Box>
          <Autocomplete
            options={availableStudents}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            onChange={(e, newValue) =>
              newValue && handleAddStudent(newValue._id)
            }
            renderInput={(params) => (
              <TextField {...params} label="Add Student" fullWidth />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(null)}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TeacherForm;
