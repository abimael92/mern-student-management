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
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Home as BuildingIcon,
} from '@mui/icons-material';

import { ELEMENT_TYPES } from './BlueprintElements';
import { drawGrid, drawElement } from './BlueprintRenderer';
import { TOOLS } from './BlueprintTools';

// Default styles for different element types
const DEFAULT_STYLES = {
  [ELEMENT_TYPES.BUILDING]: {
    fillColor: '#d3e3fd',
    strokeColor: '#3a7bd5',
    strokeWidth: 2,
  },
  [ELEMENT_TYPES.ROOM]: {
    fillColor: '#f5f5f5',
    strokeColor: '#757575',
    strokeWidth: 1,
  },
  [ELEMENT_TYPES.BATHROOM]: {
    fillColor: '#e3f2fd',
    strokeColor: '#2196f3',
    strokeWidth: 1,
  },
  // Add styles for other element types...
};

const InteractiveBlueprintBuilder = ({ open, onClose, onSave }) => {
  // State management
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
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canvasRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Helper functions
  const createNewElement = (type, props) => ({
    id: uuidv4(),
    type,
    name: '',
    ...DEFAULT_STYLES[type],
    ...props,
  });

  const getSelectedBuilding = () =>
    blueprint.buildings.find((b) => b.id === blueprint.selectedBuildingId);

  const getSelectedElement = () => {
    const building = getSelectedBuilding();
    if (!building || !building.elements) return null;
    return building.elements.find((e) => e.id === blueprint.selectedElementId);
  };

  // Drawing logic
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx, canvas.width, canvas.height);

    // Draw all buildings and their elements
    blueprint.buildings.forEach((building) => {
      drawElement(ctx, building, building.id === blueprint.selectedBuildingId);

      (building.elements || []).forEach((element) =>
        drawElement(ctx, element, element.id === blueprint.selectedElementId)
      );
    });

    // Draw current element in progress
    if (isDrawing && currentElement) {
      drawElement(ctx, currentElement, true);
    }
  }, [blueprint, isDrawing, currentElement]);

  // Canvas initialization
  useEffect(() => {
    if (!open || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    drawCanvas();
  }, [open, drawCanvas]);

  // Event handlers
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    startPos.current = { x, y };

    if (mode === ELEMENT_TYPES.SELECT) {
      // TODO: Implement selection logic
      return;
    }

    setIsDrawing(true);
    const newElement = createNewElement(mode, {
      x,
      y,
      buildingId: blueprint.selectedBuildingId,
    });
    setCurrentElement(newElement);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentElement) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update current element dimensions
    setCurrentElement((prev) => {
      const updated = { ...prev };

      if (['building', 'room', 'bathroom', 'green', 'court'].includes(mode)) {
        updated.width = x - startPos.current.x;
        updated.height = y - startPos.current.y;
      } else if (mode === 'brace') {
        updated.x2 = x;
        updated.y2 = y;
      }

      return updated;
    });

    drawCanvas();
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
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
        // Add new building
        updatedBuildings = [...updatedBuildings, elementToSave];
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Interactive Blueprint Builder</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Tools
              </Typography>
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
                onChange={(e, newMode) => setMode(newMode)}
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

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Buildings
              </Typography>
              {blueprint.buildings.map((building) => {
                const elements = building.elements || [];
                const roomCount = elements.filter(
                  (e) => e.type === ELEMENT_TYPES.ROOM
                ).length;
                const bathroomCount = elements.filter(
                  (e) => e.type === ELEMENT_TYPES.BATHROOM
                ).length;
                // Count other element types similarly...

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
                    <Typography fontWeight="bold">{building.name}</Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                      <Chip label={`${roomCount} rooms`} size="small" />
                      <Chip label={`${bathroomCount} baths`} size="small" />
                      {/* Add other chips for different element types */}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid>

          <Grid item xs={9}>
            <Box
              ref={canvasRef}
              component="canvas"
              sx={{
                width: '100%',
                height: '500px',
                border: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
                cursor: mode === ELEMENT_TYPES.SELECT ? 'default' : 'crosshair',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {/* Element Form Dialog */}
      <Dialog open={showElementForm} onClose={() => setShowElementForm(false)}>
        <DialogTitle>Name Your {currentElement?.type}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Element Name"
            fullWidth
            value={elementName}
            onChange={(e) => setElementName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowElementForm(false)}>Cancel</Button>
          <Button
            onClick={handleSaveElement}
            disabled={!elementName.trim()}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => onSave(blueprint)}
        >
          Save Blueprint
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InteractiveBlueprintBuilder;
