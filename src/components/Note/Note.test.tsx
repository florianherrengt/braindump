import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { Note, NoteProps } from './Note';

const note: NoteProps['note'] = {
    id: faker.random.uuid(),
    createdAt: faker.date.past(),
    isLoading: false,
    text: faker.lorem.sentences(),
    tags: [],
};

describe('Components/Note', () => {
    it('<Note ariaLabel="test" />', () => {
        render(<Note note={note} onEdit={jest.fn()} onDelete={jest.fn()} />);
    });
});
