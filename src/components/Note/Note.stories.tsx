import { action } from '@storybook/addon-actions';
import faker from 'faker';
import React from 'react';
import { Note, NoteProps } from '.';
import '../../styles/index.scss';

export default {
    component: Note,
    title: 'Note',
};

const note: NoteProps['note'] = {
    id: faker.random.uuid(),
    createdAt: faker.date.past(),
    isLoading: false,
    text: faker.lorem.sentences(5),
    tags: [],
};

export const Default = () => (
    <div style={{ padding: 20 }}>
        <Note note={note} onEdit={action('edit')} onDelete={action('delete')} />
    </div>
);
