import React from 'react';
import { Alert } from '@mui/material';

const ErrorAlert = ({ message }) => (
  <div style={{ marginBottom: '20px' }}>
    <Alert severity="error">{message}</Alert>
  </div>
);

export default ErrorAlert;
