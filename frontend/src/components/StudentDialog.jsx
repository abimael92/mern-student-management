import React, { useState } from 'react';
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
} from '@mui/material';

const StudentDialog = ({ open, onClose, onSave, student = {} }) => {
  const [firstName, setFirstName] = useState(student?.firstName || '');
  const [lastName, setLastName] = useState(student?.lastName || '');
  const [isEnrolled, setIsEnrolled] = useState(student?.isEnrolled || false);

  const handleSave = () => {
    onSave({ firstName, lastName, isEnrolled });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ '& .MuiPaper-root': { backgroundColor: '#f5f5f5', padding: 2 } }}
    >
      <DialogTitle
        sx={{ bgcolor: '#1976d2', color: 'white', textAlign: 'center' }}
      >
        {student?._id ? 'Edit Student' : 'Add Student'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Checkbox
            checked={isEnrolled}
            onChange={(e) => setIsEnrolled(e.target.checked)}
            color="primary"
          />
          <Typography>Enrolled</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', padding: 2 }}>
        <Button onClick={onClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDialog;
