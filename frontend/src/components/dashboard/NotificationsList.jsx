import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const NotificationsList = ({ notifications }) => (
  <List>
    {notifications.map((notif, i) => (
      <ListItem key={i}>
        <ListItemIcon>
          <Badge color="error" variant="dot">
            <NotificationsActiveIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary={notif.message} secondary={notif.time} />
      </ListItem>
    ))}
  </List>
);

export default NotificationsList;
