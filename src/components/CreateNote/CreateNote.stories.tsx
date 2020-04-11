import faker from 'faker';
import React from 'react';
import { TagEmotion } from '../../helpers';
import '../../styles/index.scss';
import { CreateNote, CreateNoteProps } from './';

export default {
    component: CreateNote,
    title: 'CreateNote',
};

const tags: CreateNoteProps['tags'] = Array(10)
    .fill(null)
    .map(() => ({
        id: faker.random.uuid(),
        createdAt: faker.date.past(),
        emotion: faker.random.arrayElement([
            TagEmotion.positive,
            TagEmotion.neutral,
            TagEmotion.negative,
        ]),
        label: faker.random.word(),
    }));

export const Default = () => (
    <div style={{ padding: 20 }}>
        <CreateNote tags={tags} />
    </div>
);
