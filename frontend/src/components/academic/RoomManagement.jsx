import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from '../../redux/actions/roomsActions';

import RoomList from './RoomList';
import RoomForm from './RoomForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';

import { Typography, Grid, Box } from '@mui/material';

const RoomManagement = () => {
  const dispatch = useDispatch();
  const {
    rooms = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.rooms || {});

  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleEditClick = (room) => setSelectedRoom(room);

  const handleSave = async (data) => {
    if (selectedRoom) {
      await dispatch(updateRoom({ ...data, _id: selectedRoom._id }));
    } else {
      await dispatch(addRoom(data));
    }
    setSelectedRoom(null);
    dispatch(fetchRooms());
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteRoom(id)).then(() => {
      dispatch(fetchRooms());
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Room Management
      </Typography>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box style={{ padding: '20px' }}>
            <RoomList
              rooms={rooms}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box style={{ padding: '2px' }}>
            <RoomForm
              initialData={selectedRoom || {}}
              onSubmit={handleSave}
              onCancel={() => setSelectedRoom(null)}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomManagement;
