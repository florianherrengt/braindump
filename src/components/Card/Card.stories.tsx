import React from 'react';
import { Card } from './';

export default {
    component: Card,
    title: 'Card',
};

const SomeActions = () => (
    <div style={{ padding: 20 }}>
        <div>Update</div>
        <div>Delete</div>
    </div>
);

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <Card actions={<SomeActions />}>Card content</Card>
    </div>
);

export const ActionOpened = () => (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <Card actionOpen actions={<SomeActions />}>
            Card content
        </Card>
    </div>
);
