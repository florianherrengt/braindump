import React from 'react';
import { TagsPicker } from '.';
import { TagEmotion } from '../../helpers';
import { RootState } from '../../redux';
import '../../styles/index.scss';

export default {
    component: TagsPicker,
    title: 'TagsPicker',
};

const tags: RootState['currentUserTags']['tags'] = [
    ...Array(10)
        .fill(null)
        .map((_, index) => ({
            id: index.toString(),
            label: 'tag' + index,
            createdAt: new Date(),
            emotion: TagEmotion.neutral,
        })),
    {
        id: '2',
        label: 'positive tag',
        createdAt: new Date(),
        emotion: TagEmotion.positive,
    },
    {
        id: '3',
        label: 'negative',
        createdAt: new Date(),
        emotion: TagEmotion.negative,
    },
];

export const Default = () => (
    <div style={{ padding: 20 }}>
        <TagsPicker
            tags={tags}
            placeholder='Enter your text here'
            ariaLabel='test'
        >
            Default
        </TagsPicker>
    </div>
);

export const WithResults = () => (
    <div style={{ padding: 20 }}>
        <TagsPicker
            pickedTags={[tags[0]]}
            tags={tags}
            value='posi'
            placeholder='Enter your text here'
            ariaLabel='test'
        >
            Default
        </TagsPicker>
    </div>
);
