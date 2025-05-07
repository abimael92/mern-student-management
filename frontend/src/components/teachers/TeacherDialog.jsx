import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Autocomplete,
  Chip,
  Typography,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher, updateTeacher } from '../../redux/actions/teacherActions';
import { fetchStudents } from '../../redux/actions/studentActions';
import { api } from '../../utils/api';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  profilePicture: '',
  subjects: [],
  isActive: true,
  tutoredStudents: [],
  qualifications: [],
  yearsOfExperience: 0,
};

const TeacherDialog = ({ open, onClose, teacher = null }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      dispatch(fetchStudents());
      if (teacher) {
        setFormData({
          ...initialFormData,
          ...teacher,
          tutoredStudents: teacher.tutoredStudents || [],
        });
      } else {
        setFormData(initialFormData);
      }
    }
  }, [open, teacher, dispatch]);

  const handleImageUpload = async (file) => {
    try {
      const uploadedUrl = await api.uploadImage(file);
      setFormData((prev) => ({ ...prev, profilePicture: uploadedUrl }));
    } catch (err) {
      setError('Image upload failed');
      console.error('Upload error:', err);
    }
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const teacherData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        profilePicture: formData.profilePicture,
        subjects: formData.subjects,
        isActive: formData.isActive,
        qualifications: formData.qualifications,
        yearsOfExperience: Number(formData.yearsOfExperience),
        tutoredStudents: formData.tutoredStudents.map((id) =>
          typeof id === 'object' ? id._id : id
        ),
      };

      if (teacher?._id) {
        await dispatch(
          updateTeacher({
            id: teacher._id,
            teacherData,
          })
        );
      } else {
        await dispatch(addTeacher(teacherData));
      }
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to save teacher'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableStudents =
    students?.filter(
      (student) => !formData.tutoredStudents.includes(student._id)
    ) || [];

  const renderTabPanel = () => {
    switch (tab) {
      case 0: // Basic Info
        return (
          <Box>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Box sx={{ mt: 2 }}>
              <input
                type="file"
                accept="image/*"
                id="teacher-upload"
                hidden
                onChange={(e) => {
                  if (e.target.files[0]) handleImageUpload(e.target.files[0]);
                }}
              />
              <label htmlFor="teacher-upload">
                <Button variant="contained" component="span">
                  Upload Profile Picture
                </Button>
              </label>
              {formData.profilePicture && (
                <Box sx={{ mt: 1 }}>
                  <img
                    src={formData.profilePicture}
                    alt="Teacher"
                    style={{ maxWidth: 100, maxHeight: 100 }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        );

      case 1: // Subjects & Qualifications
        return (
          <Box>
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
                <TextField {...params} label="Subjects" margin="normal" />
              )}
            />
            <Autocomplete
              multiple
              options={[
                'Bachelors',
                'Masters',
                'PhD',
                'Teaching Certificate',
                'Diploma',
              ]}
              value={formData.qualifications}
              onChange={(e, newValue) =>
                setFormData({ ...formData, qualifications: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Qualifications" margin="normal" />
              )}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Years of Experience"
              type="number"
              fullWidth
              margin="normal"
              value={formData.yearsOfExperience}
              onChange={(e) =>
                setFormData({ ...formData, yearsOfExperience: e.target.value })
              }
            />
          </Box>
        );

      case 2: // Assigned Students
        return (
          <Box>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Current Students
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
              {formData.tutoredStudents.map((studentId) => {
                const student = students?.find((s) => s._id === studentId);
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
                <TextField {...params} label="Assign Student" margin="normal" />
              )}
              fullWidth
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{teacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>

      <DialogContent>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label="Basic Info" />
          <Tab label="Subjects & Qualifications" />
          <Tab label="Assigned Students" />
        </Tabs>

        {renderTabPanel()}

        <FormControlLabel
          control={
            <Switch
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
            />
          }
          label="Active Teacher"
          sx={{ mt: 2 }}
        />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherDialog;
