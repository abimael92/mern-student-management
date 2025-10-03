import React from 'react';
import {
  NearMe as SelectIcon,
  Home as BuildingIcon,
  MeetingRoom as RoomIcon,
  Wc as BathroomIcon,
  Park as GreenIcon,
  SportsBasketball as CourtIcon,
  HorizontalRule as BraceIcon,
} from '@mui/icons-material';

import { ELEMENT_TYPES } from './BlueprintElements';

export const TOOLS = [
  { value: ELEMENT_TYPES.SELECT, label: 'Select/Move', icon: <SelectIcon /> },
  { value: ELEMENT_TYPES.BUILDING, label: 'Building', icon: <BuildingIcon /> },
  { value: ELEMENT_TYPES.ROOM, label: 'Room', icon: <RoomIcon /> },
  { value: ELEMENT_TYPES.BATHROOM, label: 'Bathroom', icon: <BathroomIcon /> },
  { value: ELEMENT_TYPES.GREEN, label: 'Green Area', icon: <GreenIcon /> },
  { value: ELEMENT_TYPES.COURT, label: 'Sports Court', icon: <CourtIcon /> },
  { value: ELEMENT_TYPES.BRACE, label: 'Brace/Line', icon: <BraceIcon /> },
  // Remove Door and Window for now as they might not be available
  // { value: ELEMENT_TYPES.DOOR, label: 'Door', icon: <DoorIcon />, disabled: true },
  // { value: ELEMENT_TYPES.WINDOW, label: 'Window', icon: <WindowIcon />, disabled: true },
];

export default TOOLS;
