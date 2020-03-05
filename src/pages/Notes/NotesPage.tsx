import { QueryResult } from "@apollo/react-common";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import {
  AesPassphraseForm,
  CreateNote,
  Layout,
  LineSpacer,
  NoteList
} from "../../components";
import { CreateNoteContainer } from "./CreateNoteContainer";
import { NoteListContainer } from "./NoteListContainer";

import { useApolloClient } from "@apollo/react-hooks";

const GET_AES_PASSPHRASE = gql`
  {
    aesPassphrase @client
  }
`;

export const NotesPage = () => {
  const client = useApolloClient();
  const getAesPassphraseResults = useQuery(GET_AES_PASSPHRASE);
  const aesPassphrase = getAesPassphraseResults.data?.aesPassphrase;
  return (
    <Layout>
      <LineSpacer />
      {!aesPassphrase ? (
        <AesPassphraseForm
          onSubmit={({ passphrase }) => {
            client.writeData({ data: { aesPassphrase: passphrase } });
          }}
        />
      ) : (
        <CreateNoteContainer aesPassphrase={aesPassphrase} />
      )}
      <LineSpacer />
      <NoteListContainer aesPassphrase={aesPassphrase} />
    </Layout>
  );
};
