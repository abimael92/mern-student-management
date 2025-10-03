// BlueprintRenderer.js
import { ELEMENT_TYPES } from './BlueprintElements';

// Default styles for different element types
export const DEFAULT_STYLES = {
  [ELEMENT_TYPES.BUILDING]: {
    fillColor: '#d3e3fd',
    strokeColor: '#3a7bd5',
    strokeWidth: 2,
    minWidth: 200,
    minHeight: 150,
  },
  [ELEMENT_TYPES.ROOM]: {
    fillColor: '#f5f5f5',
    strokeColor: '#757575',
    strokeWidth: 1,
    minWidth: 100,
    minHeight: 80,
  },
  [ELEMENT_TYPES.BATHROOM]: {
    fillColor: '#e3f2fd',
    strokeColor: '#2196f3',
    strokeWidth: 1,
    icon: '🚽',
    minWidth: 80,
    minHeight: 60,
  },
};

// Draw grid background
export const drawGrid = (ctx, width, height) => {
  const gridSize = 20;
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 0.5;

  // Draw vertical lines
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Draw horizontal lines
  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

// Draw individual elements (buildings, rooms, bathrooms, etc.)
export const drawElement = (ctx, element, isSelected = false) => {
  const { x, y, width, height, type, fillColor, strokeColor, strokeWidth } = element;

  ctx.save();

  // Draw fill
  ctx.fillStyle = fillColor || '#ffffff';
  ctx.fillRect(x, y, width, height);

  // Draw border
  ctx.strokeStyle = isSelected ? '#ff6b35' : strokeColor || '#000000';
  ctx.lineWidth = isSelected ? strokeWidth + 2 : strokeWidth || 1;
  ctx.strokeRect(x, y, width, height);

  // Draw element name if available
  if (element.name) {
    ctx.fillStyle = isSelected ? '#ff6b35' : '#333333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(element.name, x + width / 2, y + height / 2);
  }

  // Draw bathroom icon for bathroom elements
  if (type === ELEMENT_TYPES.BATHROOM) {
    drawBathroomIcon(ctx, element);
  }

  ctx.restore();
};

// Draw bathroom icon
export const drawBathroomIcon = (ctx, element) => {
  const centerX = element.x + element.width / 2;
  const centerY = element.y + element.height / 2;

  ctx.save();
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🚽', centerX, centerY);
  ctx.restore();
};

// Draw dimensions for elements
export const drawDimensions = (ctx, element, type) => {
  const { x, y, width, height } = element;
  const absWidth = Math.abs(width);
  const absHeight = Math.abs(height);

  ctx.save();
  ctx.strokeStyle = '#ff6b35';
  ctx.fillStyle = '#ff6b35';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 3]);

  // Draw width dimension line (top)
  ctx.beginPath();
  ctx.moveTo(x, y - 15);
  ctx.lineTo(x + width, y - 15);
  ctx.stroke();

  // Draw width dimension arrows
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x, y - 20);
  ctx.lineTo(x, y - 10);
  ctx.moveTo(x + width, y - 20);
  ctx.lineTo(x + width, y - 10);
  ctx.stroke();

  // Draw height dimension line (right)
  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  ctx.moveTo(x + width + 15, y);
  ctx.lineTo(x + width + 15, y + height);
  ctx.stroke();

  // Draw height dimension arrows
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x + width + 10, y);
  ctx.lineTo(x + width + 20, y);
  ctx.moveTo(x + width + 10, y + height);
  ctx.lineTo(x + width + 20, y + height);
  ctx.stroke();

  // Draw dimension text
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Width text
  ctx.fillText(`${absWidth}px`, x + width / 2, y - 25);

  // Height text
  ctx.save();
  ctx.translate(x + width + 25, y + height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(`${absHeight}px`, 0, 0);
  ctx.restore();

  ctx.restore();
};

// Check if point is inside element
export const isPointInElement = (point, element) => {
  const { x, y, width, height } = element;
  return (
    point.x >= x &&
    point.x <= x + width &&
    point.y >= y &&
    point.y <= y + height
  );
};

// Calculate distance between two points
export const calculateDistance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
};

// Snap to grid
export const snapToGrid = (value, gridSize = 20) => {
  return Math.round(value / gridSize) * gridSize;
};

// Validate element placement
export const validateElementPlacement = (element, buildings, existingElements = []) => {
  const errors = [];

  // Check minimum dimensions
  if (element.width < (element.minWidth || 50)) {
    errors.push(`Width too small. Minimum: ${element.minWidth || 50}px`);
  }

  if (element.height < (element.minHeight || 50)) {
    errors.push(`Height too small. Minimum: ${element.minHeight || 50}px`);
  }

  // Check if element is inside a building (for rooms and bathrooms)
  if ([ELEMENT_TYPES.ROOM, ELEMENT_TYPES.BATHROOM].includes(element.type)) {
    const isInsideBuilding = buildings.some(building =>
      element.x >= building.x &&
      element.x + element.width <= building.x + building.width &&
      element.y >= building.y &&
      element.y + element.height <= building.y + building.height
    );

    if (!isInsideBuilding) {
      errors.push(`${element.type.charAt(0).toUpperCase() + element.type.slice(1)} must be placed inside a building`);
    }
  }

  // Check for overlaps with existing elements
  const hasOverlap = existingElements.some(existing => {
    return (
      element.x < existing.x + existing.width &&
      element.x + element.width > existing.x &&
      element.y < existing.y + existing.height &&
      element.y + element.height > existing.y
    );
  });

  if (hasOverlap && existingElements.length > 0) {
    errors.push('Element overlaps with existing elements');
  }

  return errors;
};

export default {
  drawGrid,
  drawElement,
  drawDimensions,
  drawBathroomIcon,
  isPointInElement,
  calculateDistance,
  snapToGrid,
  validateElementPlacement,
  DEFAULT_STYLES,
};