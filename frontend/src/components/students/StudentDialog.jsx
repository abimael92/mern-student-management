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
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../../redux/actions/studentActions';

const StudentDialog = ({ open, onClose, student = {} }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    studentName: '',
    lastName: '',
    age: '',
    grade: '',
    tutor: '',
    dob: '',
    nationality: '',
    isEnrolled: false,
    emergencyContact: {
      name: '',
      relation: '',
      phone: '',
    },
    contactInfo: {
      phoneNumber: '',
      email: '',
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  useEffect(() => {
    if (student && Object.keys(student).length) {
      setFormData({
        studentName: student.studentName ?? '',
        lastName: student.lastName ?? '',
        age: student.age ?? '',
        grade: student.grade ?? '',
        tutor: student.tutor ?? '',
        dob: student.dob ?? '',
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
      });
    }
  }, [student]);

  const handleChange = (section, key, value) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleSave = () => {
    if (student?._id) {
      dispatch(updateStudent(student._id, formData));
    } else {
      dispatch(addStudent(formData));
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
              value={formData.studentName}
              onChange={(e) =>
                handleChange(null, 'studentName', e.target.value)
              }
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={(e) => handleChange(null, 'lastName', e.target.value)}
            />
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
            <TextField
              label="DOB"
              fullWidth
              margin="normal"
              value={formData.dob}
              onChange={(e) => handleChange(null, 'dob', e.target.value)}
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
          </Box>
        );
      case 4:
        return (
          <Box>
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
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ bgcolor: '#1976d2', color: 'white', textAlign: 'center' }}
      >
        {student?._id ? 'Edit Student' : 'Add Student'}
      </DialogTitle>

      <Tabs
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Basic Info" />
        <Tab label="DOB & Nationality" />
        <Tab label="Emergency Contact" />
        <Tab label="Contact Info" />
        <Tab label="Address" />
      </Tabs>

      <DialogContent dividers>{renderTabPanel()}</DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {student?._id ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDialog;
