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
  FormControlLabel, //
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { api } from '../utils/api';
import { getPublicUrl } from '../utils/helpers';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../redux/actions/studentActions';

const StudentDialog = ({ open, onClose, student = {} }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
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
  });

  const [showNoteFields, setShowNoteFields] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);

  // const { role } = useSelector((state) => state.auth.user); // Assuming you have user info in your redux store
  // const hasNursePermissions = role === 'nurse';
  const hasNursePermissions = false;

  useEffect(() => {
    if (student && Object.keys(student).length) {
      setFormData({
        firstName: student.firstName ?? '',
        lastName: student.lastName ?? '',
        profilePicture: student.profilePicture ?? '',
        age: student.age ?? '',
        grade: student.grade ?? '',
        tutor: student.tutor ?? '',
        tutorId: student.tutorId ?? '',

        dob: student.dob ? new Date(student.dob) : null,
        nationality: student.nationality ?? '',
        isEnrolled: student.isEnrolled ?? false,
        emergencyContact: {
          name: student.emergencyContact?.name ?? '',
          relation: student.emergencyContact?.relation ?? '',
          phone: student.emergencyContact?.phone ?? '',
        },
        contactInfo: {
          phoneNumber: student.contactInfo?.phoneNumber ?? '',
          email: student.contactInfo?.email ?? '',
        },

        address: {
          street: student.address?.street ?? '',
          city: student.address?.city ?? '',
          state: student.address?.state ?? '',
          zipCode: student.address?.zipCode ?? '',
        },

        classroomId: student.classroomId ?? '',
        medicalInfo: {
          allergies: student.medicalInfo?.allergies?.join(', ') ?? '',
          nurseComments: student.medicalInfo?.nurseComments ?? '',
        },
        alerts: {
          behavior: student.alerts?.behavior ?? '',
          academic: student.alerts?.academic ?? '',
          flag: student.alerts?.flag ?? 'none',
        },
      });
    }
  }, [student]);

  const handleChange = (section, key, value) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleImageUpload = async (file) => {
    console.log('i got image: ', file);
    try {
      const uploadedUrl = await api.uploadImage(file);
      console.log('Image uploaded: ', uploadedUrl);
      if (uploadedUrl) {
        console.log('Image uploaded successfully: ', uploadedUrl);
        handleChange(null, 'profilePicture', uploadedUrl); // Update picture field
      } else {
        console.error('Uploaded URL is undefined or invalid.');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleSave = () => {
    console.log('profilePicture: ', formData.profilePicture);
    const studentData = { ...formData }; // no need to manually assign picture
    // if (!studentData.picture) {
    //   delete studentData.picture; // if no picture, remove it
    // }

    if (student?._id) {
      dispatch(updateStudent(student._id, studentData));
    } else {
      dispatch(addStudent(studentData));
    }
    onClose();
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
              value={formData.contactInfo.phoneNumber}
              onChange={(e) =>
                handleChange('contactInfo', 'phoneNumber', e.target.value)
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{student?._id ? 'Edit Student' : 'Add Student'}</DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)}>
          <Tab label="Basic Info" />
          <Tab label="Birth Info" />
          <Tab label="Emergency Contact" />
          <Tab label="Contact & Address" />
          <Tab label="Medical & Alerts" />
        </Tabs>
        <Box mt={2}>{renderTabPanel()}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDialog;
