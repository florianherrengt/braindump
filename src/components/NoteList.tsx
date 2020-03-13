import React from 'react';
import { LineSpacer } from './LineSpacer';
import { Note, NoteCard } from './NoteCard';
import { Fab, Icon, Slide } from '@material-ui/core';
import styled from 'styled-components';
import { useState } from 'react';
import { useWindowScroll, useThrottledFn } from 'beautiful-react-hooks';

interface NoteListProps {
  notes?: Note[];
  loadMore?(): void;
}

const GoToTopFabContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const NoteList: React.SFC<NoteListProps> = props => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useWindowScroll((useThrottledFn(() => setScrollY(window.scrollY), 100) as unknown) as Function);

  if (scrollY / (document.body.scrollHeight - window.innerHeight) >= 0.8) {
    props.loadMore && props.loadMore();
  }

  return (
    <div>
      {props.notes &&
        props.notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} />
            <LineSpacer />
          </div>
        ))}

      <Slide direction='up' in={!!scrollY} mountOnEnter unmountOnExit>
        <GoToTopFabContainer>
          <Fab onClick={() => window.scrollTo(0, 0)} color='primary' size='small'>
            <Icon>keyboard_arrow_up</Icon>
          </Fab>
        </GoToTopFabContainer>
      </Slide>
    </div>
  );
};
