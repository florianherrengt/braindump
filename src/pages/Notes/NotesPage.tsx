import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { LineSpacer } from '../../components';
import { RootState } from '../../reducers';
import { AesPassphraseContainer } from './AesPassphraseContainer';
import { CreateNoteContainer } from './CreateNoteContainer';
import { NoteListContainer } from './NoteListContainer';

export const NotesPage = () => {
  const aesPassphrase = useSelector(
    (state: RootState) => state.currentUser.aesPassphrase,
  );
  const location = useLocation();
  const searchFilter = new URLSearchParams(location.search).get('search');

  return (
    <div>
      <LineSpacer />
      {!searchFilter &&
        (!aesPassphrase ? <AesPassphraseContainer /> : <CreateNoteContainer />)}
      <LineSpacer />
      <NoteListContainer />
    </div>
  );
};
