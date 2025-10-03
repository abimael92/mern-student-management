// frontend/src/components/academic/DimensionEditor.jsx
import React from 'react';
import { Paper, Typography, TextField, Box, Button } from '@mui/material';

const DimensionEditor = ({
  editingDimension,
  dimensionValue,
  onDimensionChange,
  onDimensionSave,
  onCancel,
}) => {
  if (!editingDimension) return null;

  return (
    <Paper sx={{ p: 2, mb: 2, bgcolor: 'success.light' }}>
      <Typography variant="subtitle2" gutterBottom>
        Edit Dimension:
      </Typography>
      <TextField
        size="small"
        type="number"
        value={dimensionValue}
        onChange={onDimensionChange}
        onKeyPress={(e) => e.key === 'Enter' && onDimensionSave()}
        sx={{ mb: 1 }}
        fullWidth
      />
      <Box display="flex" gap={1}>
        <Button size="small" variant="contained" onClick={onDimensionSave}>
          Save
        </Button>
        <Button size="small" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default DimensionEditor;
