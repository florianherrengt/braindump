import '../../styles/index.scss';
import React from 'react';
import { TextField } from '.';
import { LineSpacer } from '../LineSpacer';
import { Color, Variant } from '../../config/theme';

export default {
    component: TextField,
    title: 'Input/TextField',
};

export const Default = () => (
    <div style={{ padding: 20 }}>
        <TextField placeholder='Enter your text here' ariaLabel='test' />
    </div>
);

export const Error = () => (
    <div style={{ padding: 20 }}>
        <TextField
            error
            placeholder='Enter your text here'
            ariaLabel='test'
            helperText='Oops... Something wrong happened'
        />
    </div>
);
