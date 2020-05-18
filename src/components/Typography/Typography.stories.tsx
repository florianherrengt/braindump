import React from 'react';
import { Typography } from '.';
import '../../styles/index.scss';

export default {
    component: Typography,
    title: 'Typography',
};

export const Default = () => (
    <div style={{ padding: 20 }}>
        <Typography>Default</Typography>
    </div>
);
