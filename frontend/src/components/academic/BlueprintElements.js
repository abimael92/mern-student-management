export const ELEMENT_TYPES = {
  BUILDING: 'building',
  ROOM: 'room',
  BATHROOM: 'bathroom',
  GREEN_AREA: 'green',
  COURT: 'court',
  TEXT: 'text',
  BRACE: 'brace',
  SELECT: 'select',
};

export const DOOR_POSITIONS = {
  NORTH: 'north',
  SOUTH: 'south',
  EAST: 'east',
  WEST: 'west',
};

export const DEFAULT_COLORS = {
  ROOM: '#e0e0e0',       // light grey for rooms
  GREEN_AREA: '#a5d6a7', // light green for gardens
  COURT: '#6fa8dc',      // fallback court background (used if no element.color)
  BUILDING: '#f5f5f5',
  BATHROOM: '#ffffff',
  TEXT: '#000000',
  BRACE: '#000000',
  DEFAULT: '#cccccc',
};

export const createNewElement = (type, options = {}) => {
  const baseElement = {
    id: Date.now(),
    type,
    name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    x: options.x || 0,
    y: options.y || 0,
    width: options.width || 0,
    height: options.height || 0,
    buildingId: options.buildingId || null,
  };

  switch (type) {
    case ELEMENT_TYPES.BUILDING:
      return {
        ...baseElement,
        doorPosition: DOOR_POSITIONS.NORTH,
        rooms: [],
        bathrooms: [],
        greenAreas: [],
        courts: [],
        texts: [],
        braces: [],
      };
    case ELEMENT_TYPES.ROOM:
      return {
        ...baseElement,
        color: DEFAULT_COLORS.ROOM,
        doorPosition: DOOR_POSITIONS.NORTH,
      };
    case ELEMENT_TYPES.BATHROOM:
      return {
        ...baseElement,
        color: DEFAULT_COLORS.BATHROOM,
        doorPosition: DOOR_POSITIONS.NORTH,
      };
    case ELEMENT_TYPES.GREEN_AREA:
      return {
        ...baseElement,
        color: DEFAULT_COLORS.GREEN_AREA,
      };
    case ELEMENT_TYPES.COURT:
      return {
        ...baseElement,
        color: DEFAULT_COLORS.COURT,
      };
    case ELEMENT_TYPES.TEXT:
      return {
        ...baseElement,
        content: 'Label',
        size: 12,
        color: DEFAULT_COLORS.TEXT,
      };
    case ELEMENT_TYPES.BRACE:
      return {
        ...baseElement,
        x1: options.x1 || 0,
        y1: options.y1 || 0,
        x2: options.x2 || 0,
        y2: options.y2 || 0,
        label: '',
        color: DEFAULT_COLORS.BRACE,
      };
    default:
      return baseElement;
  }
};
