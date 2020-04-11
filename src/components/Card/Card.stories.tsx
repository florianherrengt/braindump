import { action } from '@storybook/addon-actions';
import React from 'react';
import { Card, CardProps } from './';

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

const actions: CardProps['actions'] = [
    {
        icon: 'edit',
        label: 'Edit',
        onClick: action('edit'),
    },
    {
        icon: 'delete',
        label: 'Delete',
        onClick: action('delete'),
    },
];

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <Card actions={actions}>Card content</Card>
    </div>
);

export const ActionOpened = () => (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <Card actionOpen actions={actions}>
            Card content
        </Card>
    </div>
);
