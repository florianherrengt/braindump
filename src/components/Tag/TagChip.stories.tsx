import '../../styles/index.scss';
import React from 'react';
import { TagChip } from '.';
import { LineSpacer } from '../LineSpacer';
import { Color, Variant } from '../../config/theme';

export default {
    component: TagChip,
    title: 'TagChip',
};

export const Default = () => (
    <div style={{ padding: 20 }}>
        <TagChip tag={{ id: '1', label: 'test', createdAt: new Date() }} />
    </div>
);
