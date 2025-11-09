import React, { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Divider,
  Chip,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Home as BuildingIcon,
  Bathroom as BathroomIcon,
  MeetingRoom as RoomIcon,
  Straighten as MeasureIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

import { ELEMENT_TYPES } from './BlueprintElements';
import { drawGrid, drawElement, drawDimensions } from './BlueprintRenderer';
import { TOOLS } from './BlueprintTools';
import ZoomControls from './ZoomControls';
import DimensionEditor from '../academic/DimensionEditor';
import { useDimensionEditing } from '../../hooks/useDimensionEditing';
import {
  DEFAULT_STYLES,
  SCHOOL_DESIGN_NOTES,
} from '../../constants/blueprintConfig';
import {
  drawBathroomIcon,
  validatePlacement,
  createNewElement,
} from '../../utils/blueprintHelpers';

const InteractiveBlueprintBuilder = ({ open, onClose, onSave }) => {
  const [blueprint, setBlueprint] = useState({
    buildings: [],
    selectedBuildingId: null,
    selectedElementId: null,
  });

  const [mode, setMode] = useState(ELEMENT_TYPES.SELECT);
  const [currentElement, setCurrentElement] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showElementForm, setShowElementForm] = useState(false);
  const [elementName, setElementName] = useState('');
  const [dimensionInfo, setDimensionInfo] = useState(null);
  const [placementErrors, setPlacementErrors] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const canvasRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Dimension editing hook
  const {
    editingDimension,
    dimensionValue,
    handleDimensionClick,
    handleDimensionChange,
    handleDimensionSave,
    cancelDimensionEditing,
  } = useDimensionEditing();

  // Enhanced drawing with dimensions
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and pan transformations
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    drawGrid(ctx, canvas.width / zoom, canvas.height / zoom);

    // Draw all buildings and their elements
    blueprint.buildings.forEach((building) => {
      drawElement(ctx, building, building.id === blueprint.selectedBuildingId);

      // Draw building info
      if (building.id === blueprint.selectedBuildingId) {
        drawDimensions(ctx, building, 'building');
      }

      (building.elements || []).forEach((element) => {
        const isSelected = element.id === blueprint.selectedElementId;
        drawElement(ctx, element, isSelected);

        // Draw dimensions for selected element
        if (isSelected) {
          drawDimensions(
            ctx,
            element,
            element.type,
            editingDimension?.elementId === element.id
          );
        }

        // Draw bathroom icon
        if (element.type === ELEMENT_TYPES.BATHROOM) {
          drawBathroomIcon(ctx, element);
        }
      });
    });

    // Draw current element in progress with real-time dimensions
    if (isDrawing && currentElement) {
      drawElement(ctx, currentElement, true);
      drawDimensions(ctx, currentElement, currentElement.type);

      // Update dimension info for display
      setDimensionInfo({
        width: Math.abs(currentElement.width),
        height: Math.abs(currentElement.height),
        type: currentElement.type,
      });
    }

    ctx.restore(); // Restore transformation
  }, [blueprint, isDrawing, currentElement, zoom, pan, editingDimension]);

  // Canvas initialization
  useEffect(() => {
    if (!open || !canvasRef.current) return;

    const canvas = canvasRef.current;
    // Set larger canvas for better zooming
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    drawCanvas();
  }, [open, drawCanvas, zoom, pan]);

  // Helper functions
  const getSelectedBuilding = () =>
    blueprint.buildings.find((b) => b.id === blueprint.selectedBuildingId);

  const getSelectedElement = () => {
    const building = getSelectedBuilding();
    if (!building || !building.elements) return null;
    return building.elements.find((e) => e.id === blueprint.selectedElementId);
  };

  // Event handlers
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Handle panning with right click or spacebar
    if (e.button === 2 || e.ctrlKey) {
      e.preventDefault();
      setIsPanning(true);
      startPos.current = { x, y };
      return;
    }

    startPos.current = { x, y };

    if (mode === ELEMENT_TYPES.SELECT) {
      // Selection logic - find clicked element
      let clickedElement = null;
      let clickedBuilding = null;

      // Adjust coordinates for zoom and pan
      const adjustedX = (x - pan.x) / zoom;
      const adjustedY = (y - pan.y) / zoom;

      // Check for dimension clicks on ALL buildings and elements
      let dimensionElement = null;
      let dimensionType = null;

      // Check all buildings and their elements for dimension clicks
      blueprint.buildings.forEach((building) => {
        // Check building dimensions
        const buildingWidthTextX = building.x + building.width / 2;
        const buildingWidthTextY = building.y - 25;
        const buildingHeightTextX = building.x + building.width + 25;
        const buildingHeightTextY = building.y + building.height / 2;

        if (
          Math.abs(adjustedX - buildingWidthTextX) < 25 &&
          Math.abs(adjustedY - buildingWidthTextY) < 8
        ) {
          dimensionElement = building;
          dimensionType = 'width';
          return;
        }

        if (
          Math.abs(adjustedX - buildingHeightTextX) < 8 &&
          Math.abs(adjustedY - buildingHeightTextY) < 25
        ) {
          dimensionElement = building;
          dimensionType = 'height';
          return;
        }

        // Check element dimensions
        (building.elements || []).forEach((element) => {
          const elementWidthTextX = element.x + element.width / 2;
          const elementWidthTextY = element.y - 25;
          const elementHeightTextX = element.x + element.width + 25;
          const elementHeightTextY = element.y + element.height / 2;

          if (
            Math.abs(adjustedX - elementWidthTextX) < 25 &&
            Math.abs(adjustedY - elementWidthTextY) < 8
          ) {
            dimensionElement = element;
            dimensionType = 'width';
            return;
          }

          if (
            Math.abs(adjustedX - elementHeightTextX) < 8 &&
            Math.abs(adjustedY - elementHeightTextY) < 25
          ) {
            dimensionElement = element;
            dimensionType = 'height';
            return;
          }
        });
      });

      // If dimension was clicked, handle it
      if (dimensionElement && dimensionType) {
        handleDimensionClick(e, dimensionElement, dimensionType);

        // Also select the element that was clicked
        setBlueprint((prev) => ({
          ...prev,
          selectedBuildingId:
            dimensionElement.type === ELEMENT_TYPES.BUILDING
              ? dimensionElement.id
              : getSelectedBuilding()?.id,
          selectedElementId:
            dimensionElement.type !== ELEMENT_TYPES.BUILDING
              ? dimensionElement.id
              : null,
        }));
        return;
      }

      // Check buildings first
      blueprint.buildings.forEach((building) => {
        if (
          adjustedX >= building.x &&
          adjustedX <= building.x + building.width &&
          adjustedY >= building.y &&
          adjustedY <= building.y + building.height
        ) {
          clickedBuilding = building;
        }

        // Check elements inside building
        (building.elements || []).forEach((element) => {
          if (
            adjustedX >= element.x &&
            adjustedX <= element.x + element.width &&
            adjustedY >= element.y &&
            adjustedY <= element.y + element.height
          ) {
            clickedElement = element;
          }
        });
      });

      setBlueprint((prev) => ({
        ...prev,
        selectedBuildingId: clickedBuilding?.id || null,
        selectedElementId: clickedElement?.id || null,
      }));
      return;
    }

    setIsDrawing(true);
    const newElement = createNewElement(
      mode,
      {
        x: (x - pan.x) / zoom,
        y: (y - pan.y) / zoom,
        width: 0,
        height: 0,
        buildingId:
          mode !== ELEMENT_TYPES.BUILDING ? blueprint.selectedBuildingId : null,
      },
      DEFAULT_STYLES
    );

    setCurrentElement(newElement);
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Handle panning
    if (isPanning) {
      setPan((prev) => ({
        x: prev.x + (x - startPos.current.x),
        y: prev.y + (y - startPos.current.y),
      }));
      startPos.current = { x, y };
      return;
    }

    if (!isDrawing || !currentElement) return;

    // Adjust coordinates for zoom and pan
    const adjustedX = (x - pan.x) / zoom;
    const adjustedY = (y - pan.y) / zoom;

    setCurrentElement((prev) => {
      const width = adjustedX - prev.x;
      const height = adjustedY - prev.y;

      return {
        ...prev,
        width: width,
        height: height,
      };
    });

    drawCanvas();
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (!isDrawing || !currentElement) return;

    const building = getSelectedBuilding();
    const errors = validatePlacement(currentElement, building, blueprint);

    if (errors.length > 0) {
      setPlacementErrors(errors);
      setIsDrawing(false);
      setCurrentElement(null);
      return;
    }

    setIsDrawing(false);
    setPlacementErrors([]);
    setShowElementForm(true);
  };

  const handleSaveElement = () => {
    if (!currentElement || !elementName.trim()) return;

    const elementToSave = {
      ...currentElement,
      name: elementName,
    };

    setBlueprint((prev) => {
      let updatedBuildings = [...prev.buildings];

      if (elementToSave.type === ELEMENT_TYPES.BUILDING) {
        updatedBuildings = [
          ...updatedBuildings,
          { ...elementToSave, elements: [] },
        ];
        return {
          ...prev,
          buildings: updatedBuildings,
          selectedBuildingId: elementToSave.id,
          selectedElementId: null,
        };
      } else {
        // Add element to selected building
        const buildingIndex = updatedBuildings.findIndex(
          (b) => b.id === blueprint.selectedBuildingId
        );

        if (buildingIndex >= 0) {
          const updatedBuilding = {
            ...updatedBuildings[buildingIndex],
            elements: [
              ...(updatedBuildings[buildingIndex].elements || []),
              elementToSave,
            ],
          };

          updatedBuildings[buildingIndex] = updatedBuilding;

          return {
            ...prev,
            buildings: updatedBuildings,
            selectedElementId: elementToSave.id,
          };
        }
      }

      return prev;
    });

    // Reset form
    setElementName('');
    setCurrentElement(null);
    setDimensionInfo(null);
    setShowElementForm(false);
  };

  const handleBuildingSelect = (buildingId) => {
    setBlueprint((prev) => ({
      ...prev,
      selectedBuildingId: buildingId,
      selectedElementId: null,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">Interactive Blueprint Builder</Typography>
            <Typography variant="body2" color="textSecondary">
              School Design Tool - Drag to create elements
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Left Panel - Tools & Info */}
          <Grid item xs={3}>
            <Box sx={{ height: '600px', overflow: 'auto' }}>
              {/* Tools Section */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  <MeasureIcon sx={{ mr: 1 }} />
                  Tools
                </Typography>

                {/* Zoom Controls */}
                <ZoomControls zoom={zoom} setZoom={setZoom} setPan={setPan} />

                <Button
                  variant={
                    mode === ELEMENT_TYPES.BUILDING ? 'contained' : 'outlined'
                  }
                  startIcon={<BuildingIcon />}
                  onClick={() => setMode(ELEMENT_TYPES.BUILDING)}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Building
                </Button>

                <ToggleButtonGroup
                  orientation="vertical"
                  value={mode}
                  exclusive
                  onChange={(e, newMode) => newMode && setMode(newMode)}
                  fullWidth
                >
                  {TOOLS.map((tool) => (
                    <ToggleButton
                      key={tool.value}
                      value={tool.value}
                      disabled={
                        tool.disabled ||
                        (tool.value !== ELEMENT_TYPES.SELECT &&
                          !blueprint.selectedBuildingId)
                      }
                    >
                      <Tooltip title={tool.label}>{tool.icon}</Tooltip>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Paper>

              {/* Real-time Dimension Display */}
              {dimensionInfo && (
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'info.light' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Current Dimensions:
                  </Typography>
                  <Typography variant="body2">
                    Width: {Math.abs(dimensionInfo.width)}px
                  </Typography>
                  <Typography variant="body2">
                    Height: {Math.abs(dimensionInfo.height)}px
                  </Typography>
                  <Typography variant="body2">
                    Type: {dimensionInfo.type}
                  </Typography>
                </Paper>
              )}

              {/* Selected Element Info */}
              {(blueprint.selectedBuildingId ||
                blueprint.selectedElementId) && (
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected:
                  </Typography>
                  {blueprint.selectedElementId && (
                    <Typography variant="body2">
                      Element: {getSelectedElement()?.name}
                    </Typography>
                  )}
                  {blueprint.selectedBuildingId && (
                    <Typography variant="body2">
                      Building: {getSelectedBuilding()?.name}
                    </Typography>
                  )}
                </Paper>
              )}

              {/* Dimension Editing */}
              <DimensionEditor
                editingDimension={editingDimension}
                dimensionValue={dimensionValue}
                onDimensionChange={handleDimensionChange}
                onDimensionSave={() =>
                  handleDimensionSave(blueprint, setBlueprint, drawCanvas)
                }
                onCancel={cancelDimensionEditing}
              />

              {/* Buildings List */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Buildings
                </Typography>
                {blueprint.buildings.length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    No buildings created. Start by drawing a building.
                  </Typography>
                ) : (
                  blueprint.buildings.map((building) => {
                    const elements = building.elements || [];
                    const roomCount = elements.filter(
                      (e) => e.type === ELEMENT_TYPES.ROOM
                    ).length;
                    const bathroomCount = elements.filter(
                      (e) => e.type === ELEMENT_TYPES.BATHROOM
                    ).length;

                    return (
                      <Box
                        key={building.id}
                        sx={{
                          p: 1,
                          mb: 1,
                          border: '1px solid #ddd',
                          backgroundColor:
                            blueprint.selectedBuildingId === building.id
                              ? '#e3f2fd'
                              : 'white',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleBuildingSelect(building.id)}
                      >
                        <Typography fontWeight="bold">
                          {building.name}
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                          <Chip label={`${roomCount} rooms`} size="small" />
                          <Chip
                            icon={<BathroomIcon />}
                            label={`${bathroomCount} baths`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Paper>

              {/* School Design Notes */}
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  <InfoIcon sx={{ mr: 1 }} />
                  School Design Considerations
                </Typography>
                <List dense>
                  {SCHOOL_DESIGN_NOTES.map((note, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <WarningIcon color="action" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={note} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          </Grid>

          {/* Canvas Area */}
          <Grid item xs={6}>
            <Box position="relative">
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '600px',
                  border: '2px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  cursor:
                    mode === ELEMENT_TYPES.SELECT ? 'default' : 'crosshair',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              />

              {/* Building Name Overlay */}
              {blueprint.selectedBuildingId && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '4px 8px',
                    borderRadius: 1,
                    border: '1px solid #3a7bd5',
                  }}
                >
                  <Typography variant="caption" fontWeight="bold">
                    {getSelectedBuilding()?.name}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right Panel - Validation & Instructions */}
          <Grid item xs={3}>
            <Box sx={{ height: '600px', overflow: 'auto' }}>
              {/* Placement Rules */}
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Placement Rules
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>🏢</ListItemIcon>
                    <ListItemText primary="Buildings can be placed anywhere" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>🚪</ListItemIcon>
                    <ListItemText primary="Rooms must be inside buildings" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BathroomIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Bathrooms must be inside buildings" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>📏</ListItemIcon>
                    <ListItemText primary="Dimensions show while dragging" />
                  </ListItem>
                </List>
              </Paper>

              {/* Error Display */}
              {placementErrors.length > 0 && (
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
                  <Typography variant="subtitle2" gutterBottom color="error">
                    Placement Errors:
                  </Typography>
                  {placementErrors.map((error, index) => (
                    <Alert key={index} severity="error" sx={{ mb: 1 }}>
                      {error}
                    </Alert>
                  ))}
                </Paper>
              )}

              {/* Instructions */}
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Instructions
                </Typography>
                <Typography variant="body2" paragraph>
                  1. Start by creating a building
                </Typography>
                <Typography variant="body2" paragraph>
                  2. Select the building to add rooms and bathrooms inside
                </Typography>
                <Typography variant="body2" paragraph>
                  3. Click and drag to create elements
                </Typography>
                <Typography variant="body2" paragraph>
                  4. Dimensions display in real-time while dragging
                </Typography>
                <Typography variant="body2">
                  5. Selected building name shows in top-right corner
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Element Form Dialog */}
      <Dialog open={showElementForm} onClose={() => setShowElementForm(false)}>
        <DialogTitle>
          Name Your {currentElement?.type}
          {currentElement && (
            <Typography variant="body2" color="textSecondary">
              Final Size: {Math.abs(currentElement.width)}px ×{' '}
              {Math.abs(currentElement.height)}px
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Element Name"
            fullWidth
            value={elementName}
            onChange={(e) => setElementName(e.target.value)}
            helperText={`Enter a name for this ${currentElement?.type}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowElementForm(false)}>Cancel</Button>
          <Button
            onClick={handleSaveElement}
            disabled={!elementName.trim()}
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save {currentElement?.type}
          </Button>
        </DialogActions>
      </Dialog>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => onSave(blueprint)}
          disabled={blueprint.buildings.length === 0}
        >
          Save Blueprint
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InteractiveBlueprintBuilder;
