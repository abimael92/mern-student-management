import React from 'react';
import {
  Edit as EditIcon,
  MeetingRoom as RoomIcon,
  Wc as BathroomIcon,
  Park as GreenAreaIcon,
  SportsSoccer as CourtIcon,
  TextFields as TextIcon,
  Architecture as BraceIcon,
} from '@mui/icons-material';
import { ELEMENT_TYPES } from './BlueprintElements';

export const TOOLS = [
  {
    value: ELEMENT_TYPES.SELECT,
    icon: <EditIcon titleAccess="Select tool — click to select elements" />,
    label: 'Select tool — click to select elements',
    disabled: false,
  },
  {
    value: ELEMENT_TYPES.ROOM,
    icon: (
      <RoomIcon titleAccess="Add classroom/office — click and drag to place" />
    ),
    label: 'Add classroom/office — click and drag to place',
    disabled: false,
  },
  {
    value: ELEMENT_TYPES.BATHROOM,
    icon: <BathroomIcon titleAccess="Add bathroom — click and drag to place" />,
    label: 'Add bathroom — click and drag to place',
    disabled: false,
  },
  {
    value: ELEMENT_TYPES.GREEN_AREA,
    icon: (
      <GreenAreaIcon titleAccess="Add green area/garden — click and drag to place" />
    ),
    label: 'Add green area/garden — click and drag to place',
    disabled: false,
  },
  {
    value: ELEMENT_TYPES.COURT,
    icon: (
      <CourtIcon titleAccess="Add sports court — click and drag to place" />
    ),
    label: 'Add sports court — click and drag to place',
    disabled: false,
  },
  {
    value: ELEMENT_TYPES.TEXT,
    icon: <TextIcon titleAccess="Add text label — click to place" />,
    label: 'Add text label — click to place',
    disabled: false,
  },
  {
    value: ELEMENT_TYPES.BRACE,
    icon: <BraceIcon titleAccess="Add measurement brace — click and drag" />,
    label: 'Add measurement brace — click and drag',
    disabled: false,
  },
];
