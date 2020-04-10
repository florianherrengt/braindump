import '../../styles/index.scss';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { TagChip } from '.';
import { LineSpacer } from '../LineSpacer';
import { Color, Variant } from '../../config/theme';
import { TagEmotion } from '../../helpers';

export default {
    component: TagChip,
    title: 'TagChip',
};

export const Default = () => (
    <div>
        <div style={{ padding: 20 }}>
            <TagChip
                tag={{
                    id: '1',
                    label: 'neutral',
                    createdAt: new Date(),
                    emotion: TagEmotion.neutral,
                }}
            />
            <TagChip
                tag={{
                    id: '1',
                    label: 'positive',
                    createdAt: new Date(),
                    emotion: TagEmotion.positive,
                }}
            />
            <TagChip
                tag={{
                    id: '1',
                    label: 'negative',
                    createdAt: new Date(),
                    emotion: TagEmotion.negative,
                }}
            />
        </div>
        <div style={{ padding: 20 }}>
            <TagChip
                tag={{
                    id: '1',
                    label: 'neutral',
                    createdAt: new Date(),
                    emotion: TagEmotion.neutral,
                }}
                onDelete={action('onDelete')}
            />
            <TagChip
                tag={{
                    id: '1',
                    label: 'positive',
                    createdAt: new Date(),
                    emotion: TagEmotion.positive,
                }}
                onDelete={action('onDelete')}
            />
            <TagChip
                tag={{
                    id: '1',
                    label: 'negative',
                    createdAt: new Date(),
                    emotion: TagEmotion.negative,
                }}
                onDelete={action('onDelete')}
            />
        </div>
    </div>
);
