import { render } from '@testing-library/react';
import React from 'react';
import { TagEmotion } from '../../helpers';
import { RootState } from '../../redux';
import { TagsPicker } from './TagsPicker';

const tags: RootState['currentUserTags']['tags'] = [
    {
        id: '1',
        label: 'tag1',
        createdAt: new Date(),
        emotion: TagEmotion.neutral,
    },
    {
        id: '2',
        label: 'postive tag',
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

describe('Components/TagsPicker', () => {
    it('render', () => {
        render(<TagsPicker tags={tags} />);
    });
});
