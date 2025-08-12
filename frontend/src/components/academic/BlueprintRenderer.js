import { ELEMENT_TYPES, DEFAULT_COLORS } from './BlueprintElements';

export const drawGrid = (ctx, width, height) => {
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

export const drawDoor = (ctx, element) => {
  ctx.fillStyle = '#795548';
  const doorSize = Math.min(element.width, element.height) * 0.2;

  switch (element.doorPosition) {
    case 'north':
      ctx.fillRect(
        element.x + element.width / 2 - doorSize / 2,
        element.y,
        doorSize,
        doorSize / 2
      );
      break;
    case 'south':
      ctx.fillRect(
        element.x + element.width / 2 - doorSize / 2,
        element.y + element.height - doorSize / 2,
        doorSize,
        doorSize / 2
      );
      break;
    case 'east':
      ctx.fillRect(
        element.x + element.width - doorSize / 2,
        element.y + element.height / 2 - doorSize / 2,
        doorSize / 2,
        doorSize
      );
      break;
    case 'west':
      ctx.fillRect(
        element.x,
        element.y + element.height / 2 - doorSize / 2,
        doorSize / 2,
        doorSize
      );
      break;
  }
};

export const drawElement = (ctx, element, isSelected = false) => {
  if (!element || !element.type) return;

  const rawType = String(element.type || '');
  const typeLower = rawType.toLowerCase();
  const elementColor =
    element.color ||
    DEFAULT_COLORS[rawType.toUpperCase()] ||
    DEFAULT_COLORS.DEFAULT;

  ctx.save();
  const strokeColor = isSelected ? '#1976D2' : '#333';

  switch (typeLower) {
    case ELEMENT_TYPES.BUILDING.toLowerCase():
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.setLineDash([]);
      ctx.strokeRect(element.x, element.y, element.width, element.height);
      drawDoor(ctx, element);
      break;

    case ELEMENT_TYPES.ROOM.toLowerCase():
      ctx.fillStyle = elementColor;
      ctx.fillRect(element.x, element.y, element.width, element.height);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(element.x, element.y, element.width, element.height);
      break;

    case ELEMENT_TYPES.GREEN_AREA.toLowerCase():
      ctx.fillStyle = elementColor;
      ctx.fillRect(element.x, element.y, element.width, element.height);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(element.x, element.y, element.width, element.height);
      break;

    case ELEMENT_TYPES.COURT.toLowerCase():
      drawCourt(ctx, element, isSelected);
      break;

    case ELEMENT_TYPES.TEXT.toLowerCase():
      ctx.fillStyle = elementColor;
      ctx.font = element.font || '12px sans-serif';
      ctx.fillText(element.text || '', element.x, element.y);
      break;

    default:
      ctx.strokeStyle = strokeColor;
      ctx.strokeRect(element.x, element.y, element.width, element.height);
      break;
  }

  ctx.restore();
};

export const drawCourt = (ctx, element, isSelected = false) => {
  const { x, y, width: w, height: h } = element;
  const sport =
    String(element.sport || element.courtType || element.subtype || 'generic').toLowerCase();

  const bg = element.color || DEFAULT_COLORS.COURT || DEFAULT_COLORS.DEFAULT;

  // background + border
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = isSelected ? '#1976D2' : '#333';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  // white lines for courts
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = Math.max(1, Math.round(Math.min(w, h) * 0.006));

  if (sport === 'soccer') {
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w / 2, y + h);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) * 0.12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeRect(x + w * 0.05, y + h * 0.2, w * 0.15, h * 0.6);
    ctx.strokeRect(x + w * 0.8, y + h * 0.2, w * 0.15, h * 0.6);
  } else if (sport === 'basketball' || sport === 'basket') {
    ctx.beginPath();
    ctx.rect(x + w * 0.06, y + h * 0.06, w * 0.88, h * 0.88);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) * 0.12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeRect(x + w * 0.02, y + h * 0.38, w * 0.12, h * 0.24);
    ctx.strokeRect(x + w * 0.86, y + h * 0.38, w * 0.12, h * 0.24);
  } else if (sport === 'tennis') {
    ctx.beginPath();
    ctx.moveTo(x + w * 0.05, y + h * 0.05);
    ctx.lineTo(x + w * 0.95, y + h * 0.05);
    ctx.moveTo(x + w * 0.05, y + h * 0.95);
    ctx.lineTo(x + w * 0.95, y + h * 0.95);
    ctx.moveTo(x + w / 2, y + h * 0.05);
    ctx.lineTo(x + w / 2, y + h * 0.95);
    ctx.stroke();
  } else if (sport === 'volleyball' || sport === 'volley') {
    ctx.beginPath();
    ctx.rect(x + w * 0.05, y + h * 0.05, w * 0.9, h * 0.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + h * 0.05);
    ctx.lineTo(x + w / 2, y + h * 0.95);
    ctx.stroke();
  } else if (sport === 'baseball' || sport === 'base') {
    ctx.beginPath();
    const cx = x + w / 2;
    const cy = y + h * 0.6;
    const s = Math.min(w, h) * 0.18;
    ctx.moveTo(cx, cy - s);
    ctx.lineTo(cx + s, cy);
    ctx.lineTo(cx, cy + s);
    ctx.lineTo(cx - s, cy);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y + h);
    ctx.moveTo(x + w, y);
    ctx.lineTo(x, y + h);
    ctx.stroke();
  }
};
