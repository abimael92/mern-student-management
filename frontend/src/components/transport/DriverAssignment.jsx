import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const DriverAssignment = ({ assignments }) => {
  return (
    <List>
      {assignments.map((a, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={a.driverName}
            secondary={`Vehicle: ${a.vehicle}, Route: ${a.route}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default DriverAssignment;
