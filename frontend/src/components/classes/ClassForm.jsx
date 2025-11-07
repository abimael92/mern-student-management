import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Chip,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Checkbox,
  CircularProgress,
  ListItemText,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSnackbar } from 'notistack';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ClassForm = ({ selectedClass, onSave, onCancel }) => {
  // Moved useSnackbar inside the component (fixes hooks error)
  const { enqueueSnackbar } = useSnackbar();

  // Redux state
  const courses = useSelector((st) => st.courses?.courses || []);
  const teachers = useSelector((st) => st.teachers?.teachers || []);
  const rooms = useSelector((st) => st.rooms?.rooms || []);
  const students = useSelector((st) => st.students?.students || []);
  const academicPeriods = useSelector(
    (st) => st.academicPeriods?.periods || []
  );

  // State management
  const [errors, setErrors] = useState({
    name: false, // Only keeping name validation for now
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Temporary user ID - replace with actual auth context/redux in production
  const currentUser = { _id: 'admin' };

  // Form state
  const [form, setForm] = useState({
    name: '',
    section: 'A',
    code: '',
    schedule: [],
    academicPeriod: '',
    course: '',
    teacher: '',
    room: '',
    enrolledStudents: [],
    students: [],
    maxCapacity: 30,
    waitlistCapacity: 5,
    isActive: true,
    isExtracurricular: false,
  });

  // Initialize form with selected class data
  useEffect(() => {
    if (selectedClass) {
      setForm({
        name: selectedClass.name || '',
        section: selectedClass.section || 'A',
        code: selectedClass.code || '',
        schedule: selectedClass.schedule || [],
        academicPeriod: selectedClass.academicPeriod?._id || undefined,
        course: selectedClass.course?._id || selectedClass.course || '',
        teacher: selectedClass.teacher?._id || selectedClass.teacher || '',
        room: selectedClass.room?._id || selectedClass.room || '',
        enrolledStudents:
          selectedClass.enrolledStudents?.map((es) => ({
            student:
              typeof es.student === 'object' ? es.student._id : es.student,
            status: es.status || 'active',
          })) || [],
        students:
          selectedClass.students?.map((s) => ({
            student: typeof s.student === 'object' ? s.student._id : s.student,
            status: s.status || 'active',
            enrollmentDate: s.enrollmentDate || new Date(),
          })) || [],
        maxCapacity: selectedClass.maxCapacity || 30,
        waitlistCapacity: selectedClass.waitlistCapacity || 5,
        isActive: selectedClass.isActive !== false,
        isExtracurricular: selectedClass.isExtracurricular || false,
      });
    }
  }, [selectedClass]);

  // Form reset function
  const resetForm = () => {
    setForm({
      name: '',
      section: 'A',
      code: '',
      schedule: [],
      academicPeriod: undefined,
      course: '',
      teacher: '',
      room: '',
      enrolledStudents: [],
      maxCapacity: 30,
      waitlistCapacity: 5,
      isActive: true,
      isExtracurricular: false,
    });
  };

  // Notification helpers
  const showError = (message) => enqueueSnackbar(message, { variant: 'error' });
  const showSuccess = (message) =>
    enqueueSnackbar(message, { variant: 'success' });

  // Form field handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...form.schedule];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setForm((prev) => ({ ...prev, schedule: updatedSchedule }));
  };

  const addScheduleSlot = () => {
    setForm((prev) => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        { day: 'Mon', startTime: '09:00', endTime: '10:00', active: true },
      ],
    }));
  };

  const removeScheduleSlot = (index) => {
    const updatedSchedule = [...form.schedule];
    updatedSchedule.splice(index, 1);
    setForm((prev) => ({ ...prev, schedule: updatedSchedule }));
  };

  const handleStudentChange = (studentId, status) => {
    setForm((prev) => {
      const existingIndex = prev.enrolledStudents.findIndex(
        (es) => es.student === studentId
      );

      if (existingIndex >= 0) {
        const updated = [...prev.enrolledStudents];
        updated[existingIndex].status = status;
        return { ...prev, enrolledStudents: updated };
      }
      return {
        ...prev,
        enrolledStudents: [
          ...prev.enrolledStudents,
          { student: studentId, status, enrollmentDate: new Date() },
        ],
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(form);
      enqueueSnackbar('Class saved');
      if (!selectedClass) resetForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Class Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              error={errors.name}
              helperText={errors.name ? 'Class name is required' : ''}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              label="Section"
              name="section"
              value={form.section}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Academic Period</InputLabel>
              <Select
                label="Academic Period"
                name="academicPeriod"
                value={form.academicPeriod}
                onChange={handleChange}
              >
                {academicPeriods.map((period) => (
                  <MenuItem key={period._id} value={period._id}>
                    {period.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* System References */}
          {[
            { name: 'course', label: 'Course', data: courses },
            { name: 'teacher', label: 'Teacher', data: teachers },
            { name: 'room', label: 'Room', data: rooms },
          ].map(({ name, label, data }) => (
            <Grid item xs={12} md={4} key={name}>
              <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                  label={label}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                >
                  {data.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {name === 'teacher'
                        ? `${item.firstName} ${item.lastName}`
                        : item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}

          {/* Capacity Settings */}
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Max Capacity"
              name="maxCapacity"
              type="number"
              value={form.maxCapacity}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Waitlist Capacity"
              name="waitlistCapacity"
              type="number"
              value={form.waitlistCapacity}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Schedule Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Class Schedule
            </Typography>
            {form.schedule.map((slot, index) => (
              <Box
                key={index}
                sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                      <InputLabel>Day</InputLabel>
                      <Select
                        value={slot.day || 'Mon'}
                        onChange={(e) =>
                          handleScheduleChange(index, 'day', e.target.value)
                        }
                        label="Day"
                      >
                        {daysOfWeek.map((day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5} md={2}>
                    <TextField
                      fullWidth
                      label="Start Time"
                      type="time"
                      value={slot.startTime || '09:00'}
                      onChange={(e) =>
                        handleScheduleChange(index, 'startTime', e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={5} md={2}>
                    <TextField
                      fullWidth
                      label="End Time"
                      type="time"
                      value={slot.endTime || '10:00'}
                      onChange={(e) =>
                        handleScheduleChange(index, 'endTime', e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={2} md={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={slot.active !== false}
                          onChange={(e) =>
                            handleScheduleChange(
                              index,
                              'active',
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Active"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeScheduleSlot(index)}
                    >
                      Remove Slot
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Button
              variant="contained"
              onClick={addScheduleSlot}
              sx={{ mt: 1 }}
            >
              Add Schedule Slot
            </Button>
          </Grid>

          {/* Student Enrollment */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Student Enrollment
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Enroll Students</InputLabel>
              <Select
                multiple
                value={(form.students || []).map((s) => s.student)}
                onChange={(e) => {
                  const selectedStudentIds = e.target.value;
                  setForm((prev) => {
                    const currentStudents = prev.students || [];
                    const updated = selectedIds.map((id) => {
                      const existing = currentStudents.find(
                        (s) => s.student === id
                      );
                      return existing
                        ? existing
                        : {
                            student: id,
                            status: 'active',
                            enrollmentDate: new Date(),
                          };
                    });
                    return { ...prev, students: updated };
                  });
                  // setForm((prev) => {
                  //   const activeStudents = prev.enrolledStudents
                  //     .filter((es) => es.status === 'active')
                  //     .map((es) => es.student);

                  //   const toAdd = selectedStudentIds.filter(
                  //     (id) => !activeStudents.includes(id)
                  //   );
                  //   const toRemove = activeStudents.filter(
                  //     (id) => !selectedStudentIds.includes(id)
                  //   );

                  //   let updated = prev.enrolledStudents.filter(
                  //     (es) =>
                  //       !toRemove.includes(es.student) || es.status !== 'active'
                  //   );

                  //   toAdd.forEach((studentId) => {
                  //     updated.push({
                  //       student: studentId,
                  //       status: 'active',
                  //       enrollmentDate: new Date(),
                  //     });
                  //   });

                  //   return { ...prev, enrolledStudents: updated };
                  // });
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((studentId) => {
                      const student = students.find((s) => s._id === studentId);
                      return student ? (
                        <Chip
                          key={studentId}
                          label={`${student.firstName} ${student.lastName}`}
                        />
                      ) : null;
                    })}
                  </Box>
                )}
              >
                {students.map((student) => (
                  <MenuItem key={student._id} value={student._id}>
                    <Checkbox
                      checked={form.enrolledStudents.some(
                        (es) =>
                          es.student === student._id && es.status === 'active'
                      )}
                    />
                    <ListItemText
                      primary={`${student.firstName} ${student.lastName}`}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* System Flags */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />
              }
              label="Active Class"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isExtracurricular"
                  checked={form.isExtracurricular}
                  onChange={handleChange}
                />
              }
              label="Extracurricular Activity"
            />
          </Grid>

          {/* Form Actions */}
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
          >
            <Button onClick={onCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  {selectedClass ? 'Updating...' : 'Creating...'}
                </>
              ) : selectedClass ? (
                'Update Class'
              ) : (
                'Create Class'
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default ClassForm;
