import React, { useState } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { uploadProfile } from '../../services/studentService';

const FileUpload = ({ studentId, onUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }
    setUploading(true);
    setError('');
    const file = acceptedFiles[0];
    try {
      const url = await uploadProfile(studentId, file);
      if (onUploaded) {
        onUploaded(url);
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #9ca3af',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? '#e5f3ff' : 'transparent'
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body2">
          Drag and drop a file here, or click to select
        </Typography>
      </Box>
      {uploading && <LinearProgress sx={{ mt: 1 }} />}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      {!uploading && (
        <Button variant="outlined" sx={{ mt: 1 }} onClick={() => {}}>
          Choose File
        </Button>
      )}
    </Box>
  );
};

export default FileUpload;

