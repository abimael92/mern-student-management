// frontend/src/hooks/useDimensionEditing.js
import { useState } from 'react';

export const useDimensionEditing = () => {
    const [editingDimension, setEditingDimension] = useState(null);
    const [dimensionValue, setDimensionValue] = useState('');

    const handleDimensionClick = (e, element, dimensionType) => {
        e.stopPropagation();
        setEditingDimension({ elementId: element.id, dimensionType });
        setDimensionValue(
            dimensionType === 'width'
                ? Math.abs(element.width)
                : Math.abs(element.height)
        );
    };

    const handleDimensionChange = (e) => {
        setDimensionValue(e.target.value);
    };

    const handleDimensionSave = (blueprint, setBlueprint, drawCanvas) => {
        if (!editingDimension || !dimensionValue) return;

        const numericValue = parseInt(dimensionValue);
        if (isNaN(numericValue) || numericValue < 50) return;

        setBlueprint((prev) => ({
            ...prev,
            buildings: prev.buildings.map((building) => {
                // Update building dimensions
                if (building.id === editingDimension.elementId) {
                    return {
                        ...building,
                        [editingDimension.dimensionType]:
                            editingDimension.dimensionType === 'width'
                                ? Math.sign(building.width) * numericValue
                                : Math.sign(building.height) * numericValue,
                    };
                }

                // Update element dimensions within building
                if (building.elements) {
                    return {
                        ...building,
                        elements: building.elements.map((element) => {
                            if (element.id === editingDimension.elementId) {
                                return {
                                    ...element,
                                    [editingDimension.dimensionType]:
                                        editingDimension.dimensionType === 'width'
                                            ? Math.sign(element.width) * numericValue
                                            : Math.sign(element.height) * numericValue,
                                };
                            }
                            return element;
                        }),
                    };
                }

                return building;
            }),
        }));

        setEditingDimension(null);
        setDimensionValue('');
        drawCanvas();
    };

    const cancelDimensionEditing = () => {
        setEditingDimension(null);
        setDimensionValue('');
    };

    return {
        editingDimension,
        dimensionValue,
        handleDimensionClick,
        handleDimensionChange,
        handleDimensionSave,
        cancelDimensionEditing,
    };
};