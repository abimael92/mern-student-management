import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, MenuItem, Select, Grid, Paper } from '@mui/material';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

const entityMap = {
  students: {
    label: 'Students',
    selector: (state) => state.students?.students || [],
  },
  teachers: {
    label: 'Teachers',
    selector: (state) => state.teachers?.teachers || [],
  },
  classes: {
    label: 'Classes',
    selector: (state) => state.classes?.classes || [],
  },
  courses: {
    label: 'Courses',
    selector: (state) => state.courses?.courses || [],
  },
  subjects: {
    label: 'Subjects',
    selector: (state) => state.subjects?.subjects || [],
  },
  rooms: { label: 'Rooms', selector: (state) => state.rooms?.rooms || [] },
  semesters: {
    label: 'Semesters',
    selector: (state) => state.semesters?.semesters || [],
  },
};

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '5px',
    backgroundColor: '#f9f9f9',
    cursor: 'grab',
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
};

const DroppableColumn = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <Paper
      ref={setNodeRef}
      sx={{
        minHeight: '400px',
        p: 2,
        bgcolor: isOver ? '#e3f2fd' : '#f5f5f5',
        transition: 'background-color 0.2s',
      }}
    >
      {children}
    </Paper>
  );
};

const RelationBuilder = () => {
  const [leftEntity, setLeftEntity] = useState('students');
  const [rightEntity, setRightEntity] = useState('classes');

  const leftItems = useSelector(entityMap[leftEntity].selector) || [];
  const rightItems = useSelector(entityMap[rightEntity].selector) || [];

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      console.log(`Assigned ${active.id} to ${over.id}`);
      // Implement your dispatch/save logic here
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Relation Builder
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <Select
            fullWidth
            value={leftEntity}
            onChange={(e) => setLeftEntity(e.target.value)}
          >
            {Object.keys(entityMap).map((key) => (
              <MenuItem key={key} value={key}>
                {entityMap[key].label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            fullWidth
            value={rightEntity}
            onChange={(e) => setRightEntity(e.target.value)}
          >
            {Object.keys(entityMap).map((key) => (
              <MenuItem key={key} value={key}>
                {entityMap[key].label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <DndContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DroppableColumn id="left-column">
              <Typography variant="subtitle1" mb={1}>
                {entityMap[leftEntity].label}
              </Typography>
              {leftItems.map((item) => (
                <DraggableItem key={item._id} id={item._id}>
                  {item.name ||
                    item.firstName ||
                    item.roomNumber ||
                    item.schedule ||
                    item.code ||
                    'Unnamed'}
                </DraggableItem>
              ))}
            </DroppableColumn>
          </Grid>
          <Grid item xs={6}>
            <DroppableColumn id="right-column">
              <Typography variant="subtitle1" mb={1}>
                {entityMap[rightEntity].label}
              </Typography>
              {rightItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    marginBottom: '5px',
                    backgroundColor: '#fff',
                  }}
                >
                  {item.name ||
                    item.firstName ||
                    item.roomNumber ||
                    item.schedule ||
                    item.code ||
                    'Unnamed'}
                </div>
              ))}
            </DroppableColumn>
          </Grid>
        </Grid>
      </DndContext>
    </Box>
  );
};

export default RelationBuilder;
