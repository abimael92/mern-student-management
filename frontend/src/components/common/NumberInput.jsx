import React, { useState } from 'react';
import { TextField, FormHelperText } from '@mui/material';

const NumberInput = ({ label, value, onChange, validation, errorMessage, style, ...props }) => {
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);

        if (validation) {
            setError(!validation(inputValue));
        }
    };

    return (
        <>
            <TextField
                label={label}
                value={value}
                onChange={handleChange}
                fullWidth
                margin="dense"
                type="number"
                error={error}
                style={style}
                {...props}
            />
            {error && <FormHelperText error>{errorMessage}</FormHelperText>}
        </>
    );
};

export default NumberInput;
