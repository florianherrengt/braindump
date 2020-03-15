import { Fab, Slide } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import { useThrottledFn, useWindowScroll } from 'beautiful-react-hooks';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LineSpacer } from './LineSpacer';
import { Note, NoteCard } from './NoteCard';

interface NoteListProps {
  notes?: Note[];
  loadMore?(): void;
  onEditClick(noteId: string): void;
  onDeleteClick(noteId: string): void;
}

const GoToTopFabContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const NoteList: React.SFC<NoteListProps> = props => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useWindowScroll((useThrottledFn(() => setScrollY(window.scrollY), 200) as unknown) as () => {});

  if (scrollY / (document.body.scrollHeight - window.innerHeight) >= 0.8) {
    props.loadMore && props.loadMore();
  }

  return (
    <div>
      {props.notes &&
        props.notes.map(note => (
          <div key={note.id}>
            <NoteCard onEditClick={props.onEditClick} onDeleteClick={props.onDeleteClick} note={note} />
            <LineSpacer />
          </div>
        ))}

      <Slide direction='up' in={!!scrollY} mountOnEnter unmountOnExit>
        <GoToTopFabContainer>
          <Fab onClick={() => window.scrollTo(0, 0)} color='primary' size='small'>
            <KeyboardArrowUpIcon />
          </Fab>
        </GoToTopFabContainer>
      </Slide>
    </div>
  );
};
