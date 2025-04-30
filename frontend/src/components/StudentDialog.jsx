import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Button,
  Box,
  Checkbox,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { api } from '../utils/api';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../redux/actions/studentActions';

const initialFormData = {
  firstName: '',
  lastName: '',
  profilePicture: '',
  age: '',
  grade: '',
  tutor: '',
  tutorId: '',
  dob: null,
  nationality: '',
  isEnrolled: false,
  emergencyContact: { name: '', relation: '', phone: '' },
  contactInfo: { phone: '', email: '' },
  address: { street: '', city: '', state: '', zipCode: '' },
  classroomId: '',
  medicalInfo: {
    allergies: '',
    nurseComments: '',
  },
  alerts: {
    behavior: '',
    academic: '',
    flag: 'none',
  },
};

const StudentDialog = ({ open, onClose, student = {} }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [showNoteFields, setShowNoteFields] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const hasNursePermissions = false;

  useEffect(() => {
    if (student && open) {
      setFormData({
        ...initialFormData,
        ...student,
        dob: student.dob ? new Date(student.dob) : null,
        medicalInfo: {
          allergies: student.medicalInfo?.allergies?.join(', ') ?? '',
          nurseComments: student.medicalInfo?.nurseComments ?? '',
        },
      });
      setHasAllergies(!!student.medicalInfo?.allergies?.length);
    } else if (!open) {
      setFormData(initialFormData);
      setShowNoteFields(false);
      setHasAllergies(false);
      setError(null);
    }
  }, [student, open]);

  const handleChange = (section, key, value) => {
    if (!section) {
      setFormData((prev) => ({ ...prev, [key]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const uploadedUrl = await api.uploadImage(file);
      if (uploadedUrl) {
        handleChange(null, 'profilePicture', uploadedUrl);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setError('Image upload failed. Please try again.');
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Student ID:', student._id);

      const studentData = {
        ...formData,
        medicalInfo: {
          ...formData.medicalInfo,
          allergies: hasAllergies
            ? formData.medicalInfo.allergies.split(',').map((a) => a.trim())
            : [],
        },
      };

      if (student?._id) {
        await dispatch(
          updateStudent({
            id: student._id,
            studentData,
          })
        );
      } else {
        await dispatch(addStudent(studentData));
      }

      onClose();
    } catch (error) {
      console.error('Error saving student:', error);
      setError(error.message || 'Failed to save student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabPanel = () => {
    switch (tab) {
      case 0:
        return (
          <Box>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={(e) => handleChange(null, 'firstName', e.target.value)}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={(e) => handleChange(null, 'lastName', e.target.value)}
            />
            <Box mt={2}>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    await handleImageUpload(file);
                  }
                }}
                style={{ display: 'none' }}
                id="upload-image"
              />
              <label htmlFor="upload-image">
                <Button variant="contained" component="span">
                  Upload Headshot
                </Button>
              </label>
              {formData.profilePicture && (
                <img
                  src={formData.profilePicture}
                  alt={formData.firstName}
                  style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />
              )}
            </Box>
            <TextField
              label="Age"
              fullWidth
              margin="normal"
              type="number"
              value={formData.age}
              onChange={(e) => handleChange(null, 'age', e.target.value)}
            />
            <TextField
              label="Grade"
              fullWidth
              margin="normal"
              value={formData.grade}
              onChange={(e) => handleChange(null, 'grade', e.target.value)}
            />
            <TextField
              label="Tutor"
              fullWidth
              margin="normal"
              value={formData.tutor}
              onChange={(e) => handleChange(null, 'tutor', e.target.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Checkbox
                checked={formData.isEnrolled}
                onChange={(e) =>
                  handleChange(null, 'isEnrolled', e.target.checked)
                }
              />
              <Typography>Enrolled</Typography>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <DatePicker
              label="Date of Birth"
              value={formData.dob}
              onChange={(date) => handleChange(null, 'dob', date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
            <TextField
              label="Nationality"
              fullWidth
              margin="normal"
              value={formData.nationality}
              onChange={(e) =>
                handleChange(null, 'nationality', e.target.value)
              }
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <TextField
              label="Emergency Contact Name"
              fullWidth
              margin="normal"
              value={formData.emergencyContact.name}
              onChange={(e) =>
                handleChange('emergencyContact', 'name', e.target.value)
              }
            />
            <TextField
              label="Relation"
              fullWidth
              margin="normal"
              value={formData.emergencyContact.relation}
              onChange={(e) =>
                handleChange('emergencyContact', 'relation', e.target.value)
              }
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={formData.emergencyContact.phone}
              onChange={(e) =>
                handleChange('emergencyContact', 'phone', e.target.value)
              }
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={formData.contactInfo.phone}
              onChange={(e) =>
                handleChange('contactInfo', 'phone', e.target.value)
              }
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={formData.contactInfo.email}
              onChange={(e) =>
                handleChange('contactInfo', 'email', e.target.value)
              }
            />
            <TextField
              label="Street"
              fullWidth
              margin="normal"
              value={formData.address.street}
              onChange={(e) =>
                handleChange('address', 'street', e.target.value)
              }
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              value={formData.address.city}
              onChange={(e) => handleChange('address', 'city', e.target.value)}
            />
            <TextField
              label="State"
              fullWidth
              margin="normal"
              value={formData.address.state}
              onChange={(e) => handleChange('address', 'state', e.target.value)}
            />
            <TextField
              label="Zip Code"
              fullWidth
              margin="normal"
              value={formData.address.zipCode}
              onChange={(e) =>
                handleChange('address', 'zipCode', e.target.value)
              }
            />
          </Box>
        );
      case 4:
        return (
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={hasAllergies}
                  onChange={(e) => setHasAllergies(e.target.checked)}
                />
              }
              label="Has Allergies?"
            />

            {hasAllergies && (
              <TextField
                label="Allergies (comma-separated)"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={formData.medicalInfo.allergies}
                onChange={(e) =>
                  handleChange('medicalInfo', 'allergies', e.target.value)
                }
              />
            )}

            {hasNursePermissions && (
              <TextField
                label="Nurse Comments"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={formData.medicalInfo.nurseComments}
                onChange={(e) =>
                  handleChange('medicalInfo', 'nurseComments', e.target.value)
                }
              />
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{student?._id ? 'Edit Student' : 'Add Student'}</DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)}>
          <Tab label="Basic Info" />
          <Tab label="Personal Info" />
          <Tab label="Emergency Contact" />
          <Tab label="Address" />
          <Tab label="Medical Info" />
        </Tabs>
        {renderTabPanel()}
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDialog;
