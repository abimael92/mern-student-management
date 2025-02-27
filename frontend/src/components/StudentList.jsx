import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStudents,
  addStudent,
  getLastStudentNumber,
} from '../redux/actions/studentActions';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Container,
  Box,
  Paper,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { createSelector } from 'reselect';
import TextInput from './common/TextInput';
import NumberInput from './common/NumberInput';
import CheckboxInput from './common/CheckboxInput';

const getStudents = (state) => state.students.students || [];
const getIsLoading = (state) => state.students.isLoading;
const getError = (state) => state.students.error;

const selectStudentData = createSelector(
  [getStudents, getIsLoading, getError],
  (students, isLoading, error) => ({ students, isLoading, error })
);

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, isLoading, error } = useSelector(selectStudentData);
  const [open, setOpen] = useState(false);
  const [addStudentLoading, setAddStudentLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [tutor, setTutor] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressZipCode, setAddressZipCode] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const generateStudentNumber = async () => {
    const currentYear = new Date().getFullYear();
    const yearPrefix = `ST${currentYear}`;

    try {
      const response = await dispatch(getLastStudentNumber(currentYear));

      if (!response || !response.lastStudentNumber) {
        throw new Error('Invalid response: lastStudentNumber not found');
      }

      const lastStudentNumber = response.lastStudentNumber;
      let uniqueNumber = 1;

      if (lastStudentNumber.startsWith(yearPrefix)) {
        const numericPart = lastStudentNumber.substring(yearPrefix.length);
        uniqueNumber = parseInt(numericPart, 10) + 1;
      }

      return `${yearPrefix}${String(uniqueNumber).padStart(5, '0')}`;
    } catch (error) {
      console.error('Error generating student number:', error);
      setErrorMessage('Failed to generate student number. Please try again.');
      return null;
    }
  };

  const validateInputs = () => {
    const errors = [];
    if (firstName.trim() === '' || lastName.trim() === '')
      errors.push('Name is required.');
    if (isNaN(age) || age <= 0) errors.push('Age must be a positive number.');
    if (!dob) errors.push('Date of birth is required.');
    if (isNaN(addressZipCode) || addressZipCode.trim() === '')
      errors.push('Valid zip code is required.');

    setErrorMessage(errors.length > 0 ? errors.join(' ') : '');
    return errors.length === 0;
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setAge('');
    setGrade('');
    setTutor('');
    setDob('');
    setNationality('');
    setContactPhoneNumber('');
    setContactEmail('');
    setAddressStreet('');
    setAddressCity('');
    setAddressState('');
    setAddressZipCode('');
    setEmergencyContactName('');
    setEmergencyContactRelation('');
    setEmergencyContactPhone('');
    setIsEnrolled(false);
    setOpen(false);
  };

  const handleAddStudent = async () => {
    setAddStudentLoading(true);

    const studentNumber = await generateStudentNumber();

    if (!studentNumber) {
      setErrorMessage('Failed to generate student number.');
      setAddStudentLoading(false);
      return;
    }

    const studentData = {
      firstName: firstName.trim() || 'N/A',
      lastName: lastName.trim() || 'N/A',
      age: age.trim() ? Number(age) : null,
      grade: grade.trim() ? grade : 'N/A',
      tutor: tutor.trim() ? tutor : 'N/A',
      emergencyContact: {
        name: emergencyContactName.trim() || 'N/A',
        relation: emergencyContactRelation.trim() || 'N/A',
        phone: emergencyContactPhone.trim() || 'N/A',
      },
      dob: dob.trim() || 'N/A',
      nationality: nationality.trim() || 'N/A',
      contactInfo: {
        phoneNumber: contactPhoneNumber.trim() || 'N/A',
        email: contactEmail.trim() || 'N/A',
      },
      address: {
        street: addressStreet.trim() || 'N/A',
        city: addressCity.trim() || 'N/A',
        state: addressState.trim() || 'N/A',
        zipCode: addressZipCode.trim() || 'N/A',
      },
      studentNumber,
      enrollmentDate: new Date().toISOString(),
      isEnrolled,
    };

    console.log('Student Data before submitting: ', studentData); // Check the generated data

    try {
      dispatch(addStudent(studentData)).unwrap();
      dispatch(fetchStudents());
    } catch (error) {
      setErrorMessage('There was an error adding the student.');
    } finally {
      setAddStudentLoading(false);
      setOpen(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="text.primary"
        textAlign="center"
        mb={4}
      >
        Students
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'An error occurred while fetching students.'}
        </Alert>
      ) : students.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No students available.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {students.map((student, index) => (
              <ListItem
                key={`${student.studentNumber}-${student._id}` || index}
                divider
              >
                <ListItemText
                  primary={`${student.firstName} ${student.lastName}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Student
        </Button>
      </Box>

      {/* Add Student Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextInput
            label="First Name"
            value={firstName}
            onChange={setFirstName}
            validation={(val) => val.trim() !== ''}
            errorMessage="Student name is required"
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={setLastName}
            validation={(val) => val.trim() !== ''}
            errorMessage="Last name is required"
          />
          <NumberInput
            label="Age"
            value={age}
            onChange={setAge}
            validation={(val) => !isNaN(val) && val > 0}
            errorMessage="Age must be a positive number"
          />
          {/* <TextInput
            label="Grade"
            value={grade}
            onChange={setGrade}
            validation={(val) => val.trim() !== ''}
            errorMessage="Grade is required"
          />
          <TextInput
            label="Tutor"
            value={tutor}
            onChange={setTutor}
            validation={(val) => val.trim() !== ''}
            errorMessage="Tutor name is required"
          />
          <TextInput
            label="Date of Birth"
            value={dob}
            onChange={setDob}
            validation={(val) => val.trim() !== ''}
            errorMessage="Date of Birth is required"
          />
          <TextInput
            label="Nationality"
            value={nationality}
            onChange={setNationality}
            validation={(val) => val.trim() !== ''}
            errorMessage="Nationality is required"
          />
          <TextInput
            label="Emergency Contact Name"
            value={emergencyContactName}
            onChange={setEmergencyContactName}
            validation={(val) => val.trim() !== ''}
            errorMessage="Emergency contact name is required"
          />
          <TextInput
            label="Emergency Contact Relation"
            value={emergencyContactRelation}
            onChange={setEmergencyContactRelation}
            validation={(val) => val.trim() !== ''}
            errorMessage="Emergency contact relation is required"
          />
          <TextInput
            label="Emergency Contact Phone"
            value={emergencyContactPhone}
            onChange={setEmergencyContactPhone}
            validation={(val) => val.trim() !== ''}
            errorMessage="Emergency contact phone is required"
          />
          <TextInput
            label="Phone Number"
            value={contactPhoneNumber}
            onChange={setContactPhoneNumber}
            validation={(val) => val.trim() !== ''}
            errorMessage="Phone number is required"
          />
          <TextInput
            label="Email"
            value={contactEmail}
            onChange={setContactEmail}
            validation={(val) => val.trim() !== ''}
            errorMessage="Email is required"
          />
          <TextInput
            label="Street Address"
            value={addressStreet}
            onChange={setAddressStreet}
            validation={(val) => val.trim() !== ''}
            errorMessage="Street address is required"
          />
          <TextInput
            label="City"
            value={addressCity}
            onChange={setAddressCity}
            validation={(val) => val.trim() !== ''}
            errorMessage="City is required"
          />
          <TextInput
            label="State"
            value={addressState}
            onChange={setAddressState}
            validation={(val) => val.trim() !== ''}
            errorMessage="State is required"
          />
          <TextInput
            label="Zip Code"
            value={addressZipCode}
            onChange={setAddressZipCode}
            validation={(val) => !isNaN(val) && val.trim() !== ''}
            errorMessage="Zip code is required"
          /> */}
          <CheckboxInput
            label="Enrolled"
            checked={isEnrolled}
            onChange={setIsEnrolled}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddStudent} disabled={addStudentLoading}>
            {addStudentLoading ? 'Adding...' : 'Add Student'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentList;
