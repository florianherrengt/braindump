import React from 'react';
import { Card } from './Card';

export default {
    component: Card,
    title: 'Card',
};

export const Loading = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <Card />
    </div>
);
