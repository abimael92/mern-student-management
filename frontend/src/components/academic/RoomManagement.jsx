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
import InteractiveBlueprintBuilder from '../blueprint/InteractiveBlueprintBuilder';

import { Typography, Grid, Box, Button } from '@mui/material';
import { Map as MapIcon } from '@mui/icons-material';

const RoomManagement = () => {
  const dispatch = useDispatch();
  const {
    rooms = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.rooms || {});

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [blueprintModalOpen, setBlueprintModalOpen] = useState(false);
  const [savedBlueprints, setSavedBlueprints] = useState([]);

  useEffect(() => {
    dispatch(fetchRooms());
    // Load saved blueprints
    const saved = JSON.parse(localStorage.getItem('schoolBlueprints')) || [];
    setSavedBlueprints(saved);
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

  const handleSaveBlueprint = (blueprint) => {
    const updatedBlueprints = [...savedBlueprints, blueprint];
    setSavedBlueprints(updatedBlueprints);
    localStorage.setItem('schoolBlueprints', JSON.stringify(updatedBlueprints));
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Room Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MapIcon />}
          onClick={() => setBlueprintModalOpen(true)}
        >
          Interactive Blueprint Builder
        </Button>
      </Box>

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

      <InteractiveBlueprintBuilder
        open={blueprintModalOpen}
        onClose={() => setBlueprintModalOpen(false)}
        onSave={handleSaveBlueprint}
      />
    </Box>
  );
};

export default RoomManagement;
