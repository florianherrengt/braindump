import React from 'react';
import '../../styles/index.scss';
import { CheckBox } from './';

export default {
    component: CheckBox,
    title: 'CheckBox',
};

export const Default = () => (
    <div>
        <div style={{ padding: 20 }}>
            <CheckBox ariaLabel='story' label='Test' />
        </div>
        <div style={{ padding: 20 }}>
            <CheckBox checked ariaLabel='story' label='Test' />
        </div>
    </div>
);
