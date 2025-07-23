import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

// --- VALID ASSIGNMENT RULES ---
const validAssignments = {
  students: ['classes'],
  teachers: ['classes'],
  classes: ['courses', 'rooms'],
  courses: ['subjects'],
  subjects: ['semesters'],
};

// --- ENTITY MAP ---
const entityMap = {
  students: { label: 'Students', selector: (s) => s.students?.students || [] },
  teachers: { label: 'Teachers', selector: (s) => s.teachers?.teachers || [] },
  classes: { label: 'Classes', selector: (s) => s.classes?.classes || [] },
  courses: { label: 'Courses', selector: (s) => s.courses?.courses || [] },
  subjects: { label: 'Subjects', selector: (s) => s.subjects?.subjects || [] },
  rooms: { label: 'Rooms', selector: (s) => s.rooms?.rooms || [] },
  semesters: {
    label: 'Semesters',
    selector: (s) => s.semesters?.semesters || [],
  },
};

// --- DRAGGABLE ITEM ---
const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '8px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    cursor: 'grab',
    boxShadow: '1px 1px 5px rgba(0,0,0,0.1)',
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
};

// --- DROPPABLE RIGHT-SIDE ITEM ---
const DroppableTarget = ({
  id,
  children,
  onDrop,
  assignedItems,
  open,
  onToggle,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <Accordion
      expanded={open}
      onChange={onToggle}
      ref={setNodeRef}
      sx={{ mb: 1 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ color: isOver ? 'primary.main' : 'inherit' }}>
          {children}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {assignedItems.length > 0 ? (
          <List dense>
            {assignedItems.map((item) => (
              <ListItem key={item._id}>
                <ListItemText
                  primary={
                    item.name ||
                    item.firstName ||
                    item.roomNumber ||
                    item.schedule ||
                    item.code ||
                    'Unnamed'
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No assigned items yet.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

// --- TOP NAV ---
const TopNav = ({ onSelectLeft }) => (
  <AppBar position="static" color="default" sx={{ mb: 2 }}>
    <Toolbar>
      {Object.keys(entityMap).map((key) => (
        <Button key={key} onClick={() => onSelectLeft(key)}>
          {entityMap[key].label}
        </Button>
      ))}
    </Toolbar>
  </AppBar>
);

// --- MAIN COMPONENT ---
const RelationBuilder = () => {
  const [leftEntity, setLeftEntity] = useState('students');
  const [rightEntity, setRightEntity] = useState('classes');

  const leftItems = useSelector(entityMap[leftEntity].selector);
  const rightItems = useSelector(entityMap[rightEntity].selector);

  const [assignedMap, setAssignedMap] = useState({}); // rightItemId → [leftItems]
  const [openAccordions, setOpenAccordions] = useState({}); // rightItemId → bool

  const validRightOptions = validAssignments[leftEntity] || [];

  const handleRightEntityChange = (e) => {
    setRightEntity(e.target.value);
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const leftItemId = active.id;
    const rightItemId = over.id;

    // Simulate fetch to backend
    try {
      await fetch(`/api/assign/${rightEntity}/${rightItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leftEntity,
          leftItemId,
        }),
      });
    } catch (err) {
      console.error('PUT failed:', err);
    }

    // Find dropped item
    const droppedItem = leftItems.find((item) => item._id === leftItemId);
    if (!droppedItem) return;

    setAssignedMap((prev) => {
      const existing = prev[rightItemId] || [];
      if (existing.some((i) => i._id === droppedItem._id)) return prev; // avoid duplicates
      return { ...prev, [rightItemId]: [...existing, droppedItem] };
    });

    setOpenAccordions((prev) => ({ ...prev, [rightItemId]: true }));
  };

  return (
    <Box p={2}>
      <TopNav
        onSelectLeft={(key) => {
          setLeftEntity(key);
          const validRights = validAssignments[key] || [];
          if (!validRights.includes(rightEntity)) {
            setRightEntity(validRights[0] || '');
          }
        }}
      />

      <Typography variant="h5" gutterBottom>
        Assign {entityMap[leftEntity].label} → {entityMap[rightEntity]?.label}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Select fullWidth value={leftEntity} disabled>
            <MenuItem value={leftEntity}>
              {entityMap[leftEntity].label}
            </MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            fullWidth
            value={rightEntity}
            onChange={handleRightEntityChange}
          >
            {validRightOptions.map((key) => (
              <MenuItem key={key} value={key}>
                {entityMap[key].label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <DndContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {/* Left list */}
          <Grid item xs={6}>
            <Paper sx={{ p: 2, minHeight: 400 }}>
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
            </Paper>
          </Grid>

          {/* Right droppables */}
          <Grid item xs={6}>
            <Paper sx={{ p: 2, minHeight: 400 }}>
              <Typography variant="subtitle1" mb={1}>
                {entityMap[rightEntity]?.label}
              </Typography>
              {rightItems.map((item) => (
                <DroppableTarget
                  key={item._id}
                  id={item._id}
                  assignedItems={assignedMap[item._id] || []}
                  open={!!openAccordions[item._id]}
                  onToggle={() =>
                    setOpenAccordions((prev) => ({
                      ...prev,
                      [item._id]: !prev[item._id],
                    }))
                  }
                >
                  {item.name ||
                    item.firstName ||
                    item.roomNumber ||
                    item.schedule ||
                    item.code ||
                    'Unnamed'}
                </DroppableTarget>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </DndContext>
    </Box>
  );
};

export default RelationBuilder;
