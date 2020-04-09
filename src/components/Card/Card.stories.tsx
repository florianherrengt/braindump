import React from 'react';
import { Card } from './';

export default {
    component: Card,
    title: 'Card',
};

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <Card actions={<div>Actions here</div>}>Card content</Card>
    </div>
);

export const ActionOpened = () => (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <Card actionOpen actions={<div>Actions here</div>}>
            Card content
        </Card>
    </div>
);
