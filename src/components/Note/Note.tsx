import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { ValuesType } from 'utility-types';
import { i18n } from '../../i18n';
import { RootState } from '../../redux';
import { Card } from '../Card';

type StateNote = ValuesType<RootState['currentUserNotes']['notes']>;

export interface NoteProps {
    note: StateNote;
    onEdit(note: StateNote): void;
    onDelete(note: StateNote): void;
}

export const Note: React.SFC<NoteProps> = props => {
    return (
        <Card
            className='Note'
            actions={[
                {
                    icon: 'edit',
                    label: i18n.text.edit,
                    onClick: () => props.onEdit(props.note),
                },
                {
                    icon: 'delete',
                    label: i18n.text.delete,
                    onClick: () => props.onDelete(props.note),
                },
            ]}
        >
            <div className='Note_DateFrom'>
                {formatDistanceToNow(props.note.createdAt, {
                    addSuffix: true,
                    locale: i18n.date,
                })}
            </div>
            <p className='Note_Text'>{props.note.text}</p>
        </Card>
    );
};
