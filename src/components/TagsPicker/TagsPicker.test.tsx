import React from 'react';
import { render } from '@testing-library/react';
import { TagsPicker } from './TagsPicker';
import { Variant, Color } from '../../config/theme';
import { RootState } from '../../redux';
import { TagEmotion } from '../../helpers';

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
        render(<TagsPicker tags={tags} placeholder='test' ariaLabel='test' />);
    });
});
