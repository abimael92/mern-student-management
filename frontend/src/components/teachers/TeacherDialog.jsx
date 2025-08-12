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
  IconButton,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher, updateTeacher } from '../../redux/actions/teacherActions';
import { fetchStudents } from '../../redux/actions/studentActions';
import { fetchClasses } from '../../redux/actions/classesActions'; // Updated import path
import { api } from '../../utils/api';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  profilePicture: '',
  classes: [],
  isActive: true,
  status: 'available',
  tutoredStudents: [],
  qualifications: [],
  certificates: [],
  yearsOfExperience: 0,
  emergencyContact: {
    name: '',
    relation: '',
    phone: '',
  },
  salary: {
    base: '',
    paymentSchedule: '',
  },
};

const TeacherDialog = ({ open, onClose, teacher = null }) => {
  const dispatch = useDispatch();

  const studentsState = useSelector((state) => state.students);
  const classes = useSelector((state) => state.classes?.classes || []);
  const students = studentsState?.students || [];

  const [inputValue, setInputValue] = useState('');

  const [tab, setTab] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [hasCertificates, setHasCertificates] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [studentInput, setStudentInput] = useState('');

  useEffect(() => {
    if (open) {
      dispatch(fetchStudents());
      dispatch(fetchClasses());
      if (teacher) {
        setFormData({
          ...initialFormData,
          ...teacher,
          emergencyContact: teacher.emergencyContact || {
            name: '',
            relation: '',
            phone: '',
          },
          salary: teacher.salary || {
            base: '',
            paymentSchedule: '',
          },
          tutoredStudents: teacher.tutoredStudents || [],
        });
      } else {
        setFormData(initialFormData);
      }
    }
  }, [open, teacher, dispatch]);

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

  const handleAddStudent = (studentId) => {
    if (studentId && !formData.tutoredStudents.includes(studentId)) {
      setFormData((prev) => ({
        ...prev,
        tutoredStudents: [...prev.tutoredStudents, studentId],
      }));
      setStudentInput('');
    }
  };

  const handleRemoveStudent = (studentId) => {
    setFormData((prev) => ({
      ...prev,
      tutoredStudents: prev.tutoredStudents.filter((id) => id !== studentId),
    }));
  };

  const handleCertificateChange = (index, value) => {
    const updated = [...certificates];
    updated[index] = value;
    setCertificates(updated);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const teacherData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        yearsOfExperience: Number(formData.yearsOfExperience),
        profilePicture: formData.profilePicture,
        tutoredStudents: formData.tutoredStudents.map((id) =>
          typeof id === 'object' ? id._id : id
        ),
      };

      if (teacher?._id) {
        await dispatch(updateTeacher({ id: teacher._id, teacherData }));
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
                onChange={handleImageUpload}
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

            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={formData.phone || ''}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

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

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status || 'available'}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="busy">Busy</MenuItem>
                <MenuItem value="on leave">On Leave</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Qualifications
            </Typography>

            {formData.qualifications.map((qual, idx) => (
              <Box
                key={idx}
                sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}
              >
                <TextField
                  label="Degree"
                  value={qual.degree}
                  onChange={(e) => {
                    const newQuals = [...formData.qualifications];
                    newQuals[idx].degree = e.target.value;
                    setFormData({ ...formData, qualifications: newQuals });
                  }}
                  size="small"
                />
                <TextField
                  label="Institution"
                  value={qual.institution}
                  onChange={(e) => {
                    const newQuals = [...formData.qualifications];
                    newQuals[idx].institution = e.target.value;
                    setFormData({ ...formData, qualifications: newQuals });
                  }}
                  size="small"
                />
                <TextField
                  label="Year"
                  type="number"
                  value={qual.year}
                  onChange={(e) => {
                    const newQuals = [...formData.qualifications];
                    newQuals[idx].year = e.target.value;
                    setFormData({ ...formData, qualifications: newQuals });
                  }}
                  size="small"
                />
                <IconButton
                  color="error"
                  onClick={() => {
                    const newQuals = formData.qualifications.filter(
                      (_, i) => i !== idx
                    );
                    setFormData({ ...formData, qualifications: newQuals });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Box sx={{ borderRadius: 2, p: 1 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                  setFormData({
                    ...formData,
                    qualifications: [
                      ...formData.qualifications,
                      { degree: '', institution: '', year: '' },
                    ],
                  })
                }
              >
                Add Qualification
              </Button>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={hasCertificates}
                  onChange={(e) => setHasCertificates(e.target.checked)}
                />
              }
              label="Do you have certificates?"
              sx={{ mt: 2 }}
            />

            {hasCertificates && (
              <Box sx={{ borderRadius: 2, p: 1 }}>
                <Button
                  onClick={() => setCertificates([...certificates, ''])}
                  startIcon={<AddIcon />}
                  variant="contained"
                  disabled={certificates.length >= 6}
                >
                  Add certificate
                </Button>
                {certificates.map((name, index) => (
                  <Box
                    key={`certificate-${index}`}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <TextField
                      label={`Certificate ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={name}
                      onChange={(e) =>
                        handleCertificateChange(index, e.target.value)
                      }
                    />

                    <IconButton
                      onClick={() => {
                        const newCertificates = certificates.filter(
                          (_, i) => i !== index
                        );
                        setCertificates(newCertificates);
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            <TextField
              label="Years of Experience"
              type="number"
              fullWidth
              margin="normal"
              value={formData.yearsOfExperience || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  yearsOfExperience: Number(e.target.value),
                })
              }
            />
          </Box>
        );

      case 2:
        console.log('--- DEBUGGING STUDENT AUTOCOMPLETE ---');
        console.log('All students from Redux:', students);
        console.log(
          'Currently assigned student IDs:',
          formData.tutoredStudents
        );

        // Add this near the top of your component
        console.log('Classes from Redux:', classes);
        console.log('FormData classes:', formData.classes);

        return (
          <Box>
            <Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Assigned Classes
              </Typography>

              {/* Class selection */}
              <Autocomplete
                options={classes}
                getOptionLabel={(cls) => cls.name}
                value={null}
                onChange={(e, newValue) => {
                  if (
                    newValue &&
                    !formData.classes.some((c) => c._id === newValue._id)
                  ) {
                    setFormData({
                      ...formData,
                      classes: [...formData.classes, newValue],
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Class"
                    margin="normal"
                    helperText="Select a class to assign to this teacher"
                  />
                )}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Class</InputLabel>
                <Select
                  value={selectedClassId || ''}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  label="Select Class"
                >
                  {formData.classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Students in selected class */}
              {selectedClassId && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Students in{' '}
                    {
                      formData.classes.find((c) => c._id === selectedClassId)
                        ?.name
                    }
                  </Typography>

                  <Autocomplete
                    multiple
                    options={students.filter(
                      (s) =>
                        s.classes?.includes(selectedClassId) &&
                        !formData.tutoredStudents.includes(s._id)
                    )}
                    getOptionLabel={(student) =>
                      `${student.firstName} ${student.lastName}`
                    }
                    value={formData.tutoredStudents
                      .map((id) => students.find((s) => s._id === id))
                      .filter(Boolean)
                      .filter((s) => s.classes?.includes(selectedClassId))}
                    onChange={(e, newValue) => {
                      setFormData({
                        ...formData,
                        tutoredStudents: [
                          ...formData.tutoredStudents.filter((id) => {
                            const student = students.find((s) => s._id === id);
                            return !student?.classes?.includes(selectedClassId);
                          }),
                          ...newValue.map((s) => s._id),
                        ],
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Assign Students"
                        placeholder="Select students"
                      />
                    )}
                  />
                </>
              )}
            </Box>

            <Autocomplete
              options={students} // Now this is the actual array of students
              getOptionLabel={(student) =>
                `${student.firstName} ${student.lastName}`
              }
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              onChange={(event, newValue) => {
                if (newValue) {
                  handleAddStudent(newValue._id);
                  setInputValue(''); // Clear the input after selection
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select students"
                  placeholder="Type to search..."
                  fullWidth
                  margin="normal"
                />
              )}
              noOptionsText="No students available"
              loading={students.length === 0}
              loadingText="Loading students..."
              sx={{ mt: 2 }}
            />

            <Typography variant="h6" sx={{ mt: 2 }}>
              Hire Date
            </Typography>

            <TextField
              label="Hire Date"
              type="date"
              fullWidth
              margin="normal"
              value={formData.hireDate ? formData.hireDate.split('T')[0] : ''}
              onChange={(e) =>
                setFormData({ ...formData, hireDate: e.target.value })
              }
            />
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Emergency Contact Information
            </Typography>

            <TextField
              label="Emergency Contact Name"
              fullWidth
              margin="normal"
              value={formData.emergencyContact?.name || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyContact: {
                    ...formData.emergencyContact,
                    name: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Emergency Contact Relation"
              fullWidth
              margin="normal"
              value={formData.emergencyContact?.relation || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyContact: {
                    ...formData.emergencyContact,
                    relation: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Emergency Contact Phone"
              fullWidth
              margin="normal"
              value={formData.emergencyContact?.phone || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyContact: {
                    ...formData.emergencyContact,
                    phone: e.target.value,
                  },
                })
              }
            />

            <Typography variant="h6" sx={{ mt: 2 }}>
              Salary Information
            </Typography>

            <TextField
              label="Base Salary"
              fullWidth
              margin="normal"
              type="number"
              value={formData.salary?.base || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: { ...formData.salary, base: e.target.value },
                })
              }
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Payment Schedule</InputLabel>
              <Select
                value={formData.salary?.paymentSchedule || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: {
                      ...formData.salary,
                      paymentSchedule: e.target.value,
                    },
                  })
                }
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="bi-weekly">Bi-weekly</MenuItem>
                <MenuItem value="hourly">Hourly</MenuItem>
              </Select>
            </FormControl>
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
          <Tab label="Emergency Contact & Salary" />
        </Tabs>

        {renderTabPanel()}

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
        >
          {teacher ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherDialog;
