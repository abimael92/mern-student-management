import { v4 as uuidv4 } from 'uuid';

export const createNewElement = (type, props, styles) => ({
    id: uuidv4(),
    type,
    name: "",
    ...styles[type],
    ...props,
});

export const validatePlacement = (element, building) => {
    if (!building) return true;
    const { x, y, width, height, radius } = element;
    const b = building;
    const elW = width || radius * 2 || 50;
    const elH = height || radius * 2 || 50;

    return (
        x >= b.x &&
        y >= b.y &&
        x + elW <= b.x + b.width &&
        y + elH <= b.y + b.height
    );
};

export const drawBathroomIcon = (ctx, element) => {
    const { x, y, width, height } = element;
    ctx.fillStyle = "#00796b";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🚻", x + width / 2, y + height / 2);
};
