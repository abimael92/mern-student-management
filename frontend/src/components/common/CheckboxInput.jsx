import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const CheckboxInput = ({ label, checked, onChange, style, ...props }) => {
    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} style={style} />}
            label={label}
            {...props}
        />
    );
};

export default CheckboxInput;
