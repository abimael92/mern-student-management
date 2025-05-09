import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const SubjectList = ({ subjects, onEdit, onDelete }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Subject List
      </Typography>
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} key={subject._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{subject.name}</Typography>
                <Typography variant="body2">{subject.description}</Typography>
                <div style={{ marginTop: '10px' }}>
                  <IconButton color="primary" onClick={() => onEdit(subject)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => onDelete(subject._id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SubjectList;
