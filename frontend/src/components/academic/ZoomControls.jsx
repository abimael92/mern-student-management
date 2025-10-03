import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

const ZoomControls = ({ zoom, setZoom, setPan }) => {
    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
                Zoom: {Math.round(zoom * 100)}%
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setZoom((prev) => Math.min(prev + 0.25, 3))}
                >
                    Zoom In
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setZoom((prev) => Math.max(prev - 0.25, 0.5))}
                >
                    Zoom Out
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                        setZoom(1);
                        setPan({ x: 0, y: 0 });
                    }}
                >
                    Reset View
                </Button>
            </Box>
            <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mt: 1, display: 'block' }}
            >
                Hold Ctrl + drag to pan
            </Typography>
        </Paper>
    );
};

export default ZoomControls;
