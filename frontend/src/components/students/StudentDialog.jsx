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
import { api } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../../redux/actions/studentActions';
import { GradeEnum } from '../../constants/enums'; // Adjust path as needed

const initialFormData = {
  firstName: '',
  lastName: '',
  profilePicture: '',
  age: '',
  gradeLevel: '',
  tutor: '',
  tutorId: '',
  dob: null,
  gender: '',
  nationality: '',
  isEnrolled: true,
  emergencyContact: { name: '', relation: '', phone: '' },
  contact: {
    // Changed from contactInfo to contact
    phone: '',
    email: '',
  },
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the file from the event
    if (file) {
      try {
        const uploadedUrl = await api.uploadImage(file); // Upload the image
        setFormData((prev) => ({
          ...prev,
          profilePicture: uploadedUrl, // Store the image URL in form data
        }));
      } catch (err) {
        setError('Image upload failed');
        console.error('Upload error:', err);
      }
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Transform form data to match backend schema
      const studentData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        profilePicture: formData.profilePicture || '',
        gradeLevel: formData.gradeLevel || null,
        dateOfBirth: formData.dob,
        nationality: formData.nationality,
        homeroom: formData.homeroom,
        contact: {
          email: formData.contact.email, // Must be provided
          phone: formData.contact.phone, // Must be provided
          address: {
            street: formData.address?.street || '',
            city: formData.address?.city || '',
            state: formData.address?.state || '',
            postalCode: formData.address?.zipCode || '',
            country: 'USA', // Default or get from form
          },
        },
        emergencyContacts: formData.emergencyContact?.name
          ? [
              {
                name: formData.emergencyContact.name,
                relationship: formData.emergencyContact.relation,
                phone: formData.emergencyContact.phone,
                priority: 1,
              },
            ]
          : [],
        gender: formData.gender || 'prefer-not-to-say',
        isEnrolled: formData.isEnrolled,
        enrollmentDate: formData.enrollmentDate || new Date(),
        medicalInfo: formData.medicalInfo.allergies
          ? {
              allergies: formData.medicalInfo.allergies
                .split(',')
                .map((a) => a.trim()),
              nurseComments: formData.medicalInfo.nurseComments || null,
            }
          : null,
        alerts: formData.alerts,
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
                id="teacher-upload"
                hidden
                onChange={handleImageUpload} // Trigger the handleImageUpload on file select
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

            <FormControl fullWidth margin="normal">
              <InputLabel>Grade Level</InputLabel>
              <Select
                value={formData.gradeLevel || ''}
                label="Grade Level"
                onChange={(e) =>
                  handleChange(null, 'gradeLevel', e.target.value)
                }
                required
              >
                {GradeEnum.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
            <TextField
              label="Age"
              fullWidth
              margin="normal"
              type="number"
              value={formData.age}
              onChange={(e) => handleChange(null, 'age', e.target.value)}
            />

            <DatePicker
              label="Date of Birth"
              value={formData.dob}
              onChange={(date) => handleChange(null, 'dob', date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                value={formData.gender || 'prefer-not-to-say'}
                label="Gender"
                onChange={(e) => handleChange(null, 'gender', e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Nationality"
              fullWidth
              margin="normal"
              value={formData.nationality}
              onChange={(e) =>
                handleChange(null, 'nationality', e.target.value)
              }
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="homeroom-label">Room</InputLabel>
              <Select
                labelId="homeroom-label"
                value={formData.homeroom || ''}
                label="Homeroom"
                onChange={(e) => handleChange(null, 'homeroom', e.target.value)}
              >
                {/* Replace with your actual homeroom options */}
                <MenuItem value="classroom_id_1">Classroom 1</MenuItem>
                <MenuItem value="classroom_id_2">Classroom 2</MenuItem>
              </Select>
            </FormControl>
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
              value={formData.contact.phone}
              onChange={(e) => handleChange('contact', 'phone', e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={formData.contact.email}
              onChange={(e) => handleChange('contact', 'email', e.target.value)}
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

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setShowNoteFields(true)}
                disabled={showNoteFields}
              >
                Add Note
              </Button>
            </Box>

            {showNoteFields && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Alert Flag</InputLabel>
                  <Select
                    value={formData.alerts.flag}
                    onChange={(e) =>
                      handleChange('alerts', 'flag', e.target.value)
                    }
                    label="Alert Flag"
                  >
                    <MenuItem value="warning">Warning</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                  </Select>
                </FormControl>

                {formData.alerts.flag === 'warning' && (
                  <TextField
                    label="Behavior Alert"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={formData.alerts.behavior}
                    onChange={(e) =>
                      handleChange('alerts', 'behavior', e.target.value)
                    }
                  />
                )}

                {formData.alerts.flag === 'success' && (
                  <TextField
                    label="Academic Alert"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={formData.alerts.academic}
                    onChange={(e) =>
                      handleChange('alerts', 'academic', e.target.value)
                    }
                  />
                )}
              </>
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
