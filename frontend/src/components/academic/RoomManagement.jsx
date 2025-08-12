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
import InteractiveBlueprintBuilder from './InteractiveBlueprintBuilder';

import {
  Typography,
  Grid,
  Box,
  Button,
  Modal,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { Close as CloseIcon, Map as MapIcon } from '@mui/icons-material';

// Sample building data - you might want to fetch this from your backend
const buildingBlueprints = {
  main: {
    name: 'Main Building',
    imageUrl: '/images/main-building-blueprint.png',
    floors: [
      {
        level: 'Ground Floor',
        rooms: ['Classroom 101', 'Classroom 102', 'Office'],
      },
      { level: 'First Floor', rooms: ['Lab 201', 'Library', 'Staff Room'] },
    ],
  },
  science: {
    name: 'Science Block',
    imageUrl: '/images/science-building-blueprint.png',
    floors: [
      { level: 'Ground Floor', rooms: ['Chemistry Lab', 'Physics Lab'] },
      { level: 'First Floor', rooms: ['Biology Lab', 'Prep Room'] },
    ],
  },
  sports: {
    name: 'Sports Complex',
    imageUrl: '/images/sports-complex-blueprint.png',
    areas: ['Gymnasium', 'Swimming Pool', 'Basketball Court'],
  },
  green: {
    name: 'Green Areas',
    imageUrl: '/images/green-areas-map.png',
    areas: ['Main Quad', 'Garden', 'Playground', 'Sports Field'],
  },
};

const RoomManagement = () => {
  const dispatch = useDispatch();
  const {
    rooms = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.rooms || {});

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [blueprintModalOpen, setBlueprintModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState('main');
  const [activeTab, setActiveTab] = useState(0);

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
          View School Blueprints
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

      {/* Blueprint Modal */}
      <Modal
        open={blueprintModalOpen}
        onClose={() => setBlueprintModalOpen(false)}
        aria-labelledby="blueprint-modal-title"
        aria-describedby="blueprint-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            maxWidth: '1200px',
            height: '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography id="blueprint-modal-title" variant="h5">
              School Blueprints and Maps
            </Typography>
            <IconButton onClick={() => setBlueprintModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="building tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {Object.keys(buildingBlueprints).map((key) => (
              <Tab key={key} label={buildingBlueprints[key].name} />
            ))}
          </Tabs>

          <Box flexGrow={1} mt={2} display="flex" flexDirection="column">
            {Object.keys(buildingBlueprints).map((key, index) => (
              <Box
                key={key}
                sx={{
                  display: activeTab === index ? 'flex' : 'none',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box flexGrow={1} overflow="auto" mb={2}>
                  <img
                    src={buildingBlueprints[key].imageUrl}
                    alt={`${buildingBlueprints[key].name} blueprint`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>
                    {buildingBlueprints[key].name} Details
                  </Typography>
                  {buildingBlueprints[key].floors ? (
                    <Box>
                      <Typography variant="subtitle1">Floors:</Typography>
                      <ul>
                        {buildingBlueprints[key].floors.map((floor) => (
                          <li key={floor.level}>
                            <strong>{floor.level}:</strong>{' '}
                            {floor.rooms.join(', ')}
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="subtitle1">Areas:</Typography>
                      <ul>
                        {buildingBlueprints[key].areas.map((area) => (
                          <li key={area}>{area}</li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RoomManagement;
