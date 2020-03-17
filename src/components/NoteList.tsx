import { Fab, Slide } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import { useThrottledFn, useWindowScroll } from 'beautiful-react-hooks';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LineSpacer } from './LineSpacer';
import { NoteCard, NoteCardProps } from './NoteCard';
import { RootState } from '../reducers/';

interface NoteListProps {
  notes: Array<{
    note: NoteCardProps['note'];
    tags: NoteCardProps['tags'];
  }>;
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

  useWindowScroll(
    (useThrottledFn(
      () => setScrollY(window.scrollY),
      1000,
    ) as unknown) as () => {},
  );

  // if (Math.round(scrollY / (document.body.scrollHeight - window.innerHeight)) === 1) {
  //   props.loadMore && props.loadMore();
  // }
  // console.log(props.notes);
  return (
    <div>
      {props.notes.map(({ note, tags }) => (
        <div key={note.id}>
          <NoteCard
            onEditClick={props.onEditClick}
            onDeleteClick={props.onDeleteClick}
            note={note}
            tags={tags}
          />
          <LineSpacer />
        </div>
      ))}

      <Slide direction='up' in={!!scrollY} mountOnEnter unmountOnExit>
        <GoToTopFabContainer>
          <Fab
            onClick={() => {
              window.scrollTo(0, 0);
              setScrollY(0);
            }}
            color='primary'
            size='small'
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </GoToTopFabContainer>
      </Slide>
    </div>
  );
};
