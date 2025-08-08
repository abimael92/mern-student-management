import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { api } from '../../utils/api';

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

const RelationBuilder = () => {
  const [leftEntity, setLeftEntity] = useState('students');
  const [rightEntity, setRightEntity] = useState('classes');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  const leftItems = useSelector(entityMap[leftEntity].selector);
  const rightItems = useSelector(entityMap[rightEntity].selector);

  const [assignedMap, setAssignedMap] = useState({});
  const [openAccordions, setOpenAccordions] = useState({});

  // Load initial relationships
  useEffect(() => {
    const loadInitialRelationships = async () => {
      try {
        setIsLoadingInitial(true);
        const newAssignedMap = {};

        // Students ↔ Classes
        if (leftEntity === 'students' && rightEntity === 'classes') {
          const classes = await api.fetchClasses();
          const students = await api.fetchStudents();

          for (const cls of classes) {
            for (const studentId of cls.students || []) {
              const student = students.find((s) => s._id === studentId);
              if (student) {
                newAssignedMap[cls._id] = [
                  ...(newAssignedMap[cls._id] || []),
                  {
                    ...student,
                    _entityType: 'students',
                    fullName: `${student.firstName} ${student.lastName}`,
                  },
                ];
              }
            }
          }
        }
        // Classes ↔ Rooms
        if (leftEntity === 'classes' && rightEntity === 'rooms') {
          const classes = await api.fetchClasses();
          classes.forEach((cls) => {
            if (cls.room) {
              newAssignedMap[cls.room] = [
                ...(newAssignedMap[cls.room] || []),
                { ...cls, _entityType: 'classes' },
              ];
            }
          });
        }
        // Classes ↔ Courses
        else if (leftEntity === 'classes' && rightEntity === 'courses') {
          const classes = await api.fetchClasses();
          classes.forEach((cls) => {
            if (cls.course) {
              newAssignedMap[cls.course] = [
                ...(newAssignedMap[cls.course] || []),
                { ...cls, _entityType: 'classes' },
              ];
            }
          });
        }
        // Courses ↔ Subjects
        else if (leftEntity === 'courses' && rightEntity === 'subjects') {
          const courses = await api.fetchCourses();
          courses.forEach((course) => {
            if (course.subject) {
              newAssignedMap[course.subject] = [
                ...(newAssignedMap[course.subject] || []),
                { ...course, _entityType: 'courses' },
              ];
            }
          });
        }
        // Subjects ↔ Semesters
        else if (leftEntity === 'subjects' && rightEntity === 'semesters') {
          const subjects = await api.fetchSubjects();
          subjects.forEach((subject) => {
            if (subject.semester) {
              newAssignedMap[subject.semester] = [
                ...(newAssignedMap[subject.semester] || []),
                { ...subject, _entityType: 'subjects' },
              ];
            }
          });
        }

        setAssignedMap(newAssignedMap);
      } catch (err) {
        setError('Failed to load initial relationships');
        console.error('Initial load error:', err);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    loadInitialRelationships();
  }, [leftEntity, rightEntity]);

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const leftItemId = active.id;
    const rightItemId = over.id;
    const droppedItem = leftItems.find((item) => item._id === leftItemId);

    if (!droppedItem) {
      setError({
        title: 'Item Not Found',
        message: 'The item you tried to move could not be found',
        details: `ID: ${leftItemId}`,
      });
      return;
    }

    // Clear previous messages
    setError(null);
    setSuccess(null);

    // Optimistic update
    const previousState = assignedMap;
    try {
      setLoading(true);

      // Update UI immediately
      setAssignedMap((prev) => {
        const existing = prev[rightItemId] || [];
        if (existing.some((i) => i._id === droppedItem._id)) {
          setError('This item is already assigned to the target');
          return prev;
        }
        return {
          ...prev,
          [rightItemId]: [
            ...existing,
            { ...droppedItem, _entityType: leftEntity },
          ],
        };
      });

      setOpenAccordions((prev) => ({ ...prev, [rightItemId]: true }));

      // Perform the actual API call
      let response;
      let actionName = '';

      if (leftEntity === 'students' && rightEntity === 'classes') {
        actionName = 'assign student to class';
        response = await api.assignStudentToClass(leftItemId, rightItemId);
      } else if (leftEntity === 'classes' && rightEntity === 'rooms') {
        actionName = 'assign class to room';
        response = await api.assignRoomToClass(leftItemId, rightItemId);
      } else if (leftEntity === 'classes' && rightEntity === 'courses') {
        actionName = 'assign class to course';
        response = await api.assignCourseToClass(leftItemId, rightItemId);
      } else if (leftEntity === 'courses' && rightEntity === 'subjects') {
        actionName = 'assign course to subject';
        response = await api.assignSubjectToCourse(leftItemId, rightItemId);
      } else if (leftEntity === 'subjects' && rightEntity === 'semesters') {
        actionName = 'assign subject to semester';
        response = await api.assignSemesterToSubject(leftItemId, rightItemId);
      } else {
        actionName = 'assign entity relationship';
        response = await api.assignRelationship(
          leftEntity,
          leftItemId,
          rightEntity,
          rightItemId
        );
      }

      setSuccess(`${leftEntity} successfully assigned to ${rightEntity}`);

      // Update the assigned map with the new relationship
    } catch (err) {
      // Revert on error
      setAssignedMap(previousState);

      let errorMessage = 'Failed to update relationship';
      try {
        const errorResponse = JSON.parse(err.message);
        if (errorResponse.error) {
          errorMessage = errorResponse.error;
        }
      } catch (e) {
        errorMessage = err.message;
      }

      console.error('Update failed:', err);

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle empty states
  const renderEmptyState = (entity) => (
    <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
      No {entity.toLowerCase()} found. Please add some {entity.toLowerCase()}{' '}
      first.
    </Typography>
  );

  return (
    <Box p={2}>
      {/* Success/Error notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          <div>
            <strong>{error?.title || 'Error'}</strong>
            <div>{error?.message}</div>
            {error?.details && (
              <div style={{ fontSize: '0.8rem' }}>{error.details}</div>
            )}
          </div>
        </Alert>
      </Snackbar>

      {/* Success Alert */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          <div>
            <strong>{success?.title || 'Success'}</strong>
            <div>{success?.message}</div>
            {success?.details && (
              <div style={{ fontSize: '0.8rem' }}>{success.details}</div>
            )}
          </div>
        </Alert>
      </Snackbar>

      <Box
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
      >
        <TopNav
          onSelectLeft={(key) => {
            setLeftEntity(key);
            const validRights = validAssignments[key] || [];
            if (!validRights.includes(rightEntity)) {
              setRightEntity(validRights[0] || '');
            }
          }}
        />

        <Typography variant="h5" gutterBottom textAlign="center">
          Assign {entityMap[leftEntity].label} → {entityMap[rightEntity]?.label}
        </Typography>
      </Box>

      {isLoadingInitial ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <Grid container spacing={3}>
            {/* Left list */}
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 2,
                  minHeight: 400,
                  backgroundColor: '#e0e0e0',
                  position: 'relative',
                }}
              >
                {loading && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      zIndex: 1,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                <Typography variant="subtitle1" mb={1}>
                  {entityMap[leftEntity].label}
                </Typography>

                {leftItems.length === 0
                  ? renderEmptyState(entityMap[leftEntity].label)
                  : leftItems.map((item) => (
                      <DraggableItem
                        key={item._id}
                        id={item._id}
                        disabled={loading}
                      >
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
              <Paper
                sx={{
                  p: 2,
                  minHeight: 400,
                  backgroundColor: '#e0e0e0',
                  position: 'relative',
                }}
              >
                {loading && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      zIndex: 1,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                <Typography variant="subtitle1" mb={1}>
                  {entityMap[rightEntity]?.label}
                </Typography>

                {rightItems.length === 0
                  ? renderEmptyState(entityMap[rightEntity]?.label)
                  : rightItems.map((item) => (
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
      )}
    </Box>
  );
};

// Enhanced DraggableItem with disabled state
const DraggableItem = ({ id, children, disabled }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '8px',
    backgroundColor: disabled ? '#f0f0f0' : '#f5f9ff',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'grab',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
    opacity: disabled ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
};

// Enhanced DroppableTarget
const DroppableTarget = ({ id, children, assignedItems, open, onToggle }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <Accordion
      expanded={open}
      onChange={onToggle}
      ref={setNodeRef}
      sx={{
        mb: 1,
        border: '1px solid #ccc',
        backgroundColor: isOver ? '#e8f5e9' : '#f5f9ff',
        borderRadius: 2,
        boxShadow: isOver
          ? '0px 0px 10px rgba(76, 175, 80, 0.4)'
          : '0px 2px 6px rgba(0,0,0,0.15)',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ color: isOver ? 'primary.main' : 'inherit' }}>
          {children}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {assignedItems.length > 0 ? (
          Object.entries(
            assignedItems.reduce((groups, item) => {
              (groups[item._entityType] = groups[item._entityType] || []).push(
                item
              );
              return groups;
            }, {})
          ).map(([entityType, items]) => (
            <Box key={entityType} sx={{ mb: 2 }}>
              <Typography
                sx={{
                  mb: 1,
                  px: 1,
                  py: 0.5,
                  backgroundColor: '#eef2f7',
                  borderRadius: 1,
                  fontWeight: 500,
                }}
              >
                {entityMap[entityType]?.label || entityType}
              </Typography>
              <List dense>
                {items.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <ListItem>
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
                    {index < items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No assigned items yet.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

// TopNav component remains the same
const TopNav = ({ onSelectLeft }) => (
  <AppBar
    position="static"
    color="default"
    sx={{ mb: 2, boxShadow: 1, borderRadius: 1 }}
  >
    <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
      {Object.keys(entityMap)
        .filter((key) => validAssignments[key]?.length > 0)
        .map((key) => (
          <Button
            key={key}
            variant="outlined"
            color="tertiary"
            onClick={() => onSelectLeft(key)}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 3,
              fontWeight: 500,
              textTransform: 'none',
            }}
          >
            {entityMap[key].label}
          </Button>
        ))}
    </Toolbar>
  </AppBar>
);

export default RelationBuilder;
