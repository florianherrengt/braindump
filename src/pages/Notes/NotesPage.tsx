import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import { useLocation } from 'react-router';
import { LineSpacer } from '../../components';
import { GET_AES_PASSPHRASE } from '../../queries';
import { AesPassphraseContainer } from './AesPassphraseContainer';
import { CreateNoteContainer } from './CreateNoteContainer';
import { NoteListContainer } from './NoteListContainer';

export const GET_CURRENT_USER_TAGS = gql`
  {
    currentUserTags {
      id
      label
    }
  }
`;

export const NotesPage = () => {
  const location = useLocation();
  const searchFilter = new URLSearchParams(location.search).get('search');

  const getAesPassphraseResults = useQuery(GET_AES_PASSPHRASE);
  const aesPassphrase = getAesPassphraseResults.data?.aesPassphrase;

  return (
    <div>
      <LineSpacer />
      {!searchFilter &&
        (!aesPassphrase ? <AesPassphraseContainer /> : <CreateNoteContainer aesPassphrase={aesPassphrase} />)}
      <LineSpacer />
      <NoteListContainer aesPassphrase={aesPassphrase} />
    </div>
  );
};
