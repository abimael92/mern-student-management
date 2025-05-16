import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const TransportRouteList = ({ routes }) => {
  return (
    <List>
      {routes.map((route) => (
        <ListItem key={route.id}>
          <ListItemText
            primary={route.name}
            secondary={`Stops: ${route.stops.join(', ')}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TransportRouteList;
