import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { Layout, LineSpacer } from "../../components";
import { AesPassphraseContainer } from "./AesPassphraseContainer";
import { CreateNoteContainer } from "./CreateNoteContainer";
import { NoteListContainer } from "./NoteListContainer";

const GET_AES_PASSPHRASE = gql`
  {
    aesPassphrase @client
  }
`;

export const NotesPage = () => {
  const getAesPassphraseResults = useQuery(GET_AES_PASSPHRASE);
  const aesPassphrase = getAesPassphraseResults.data?.aesPassphrase;

  return (
    <Layout>
      <LineSpacer />
      {!aesPassphrase ? (
        <AesPassphraseContainer />
      ) : (
        <CreateNoteContainer aesPassphrase={aesPassphrase} />
      )}
      <LineSpacer />
      <NoteListContainer aesPassphrase={aesPassphrase} />
    </Layout>
  );
};
