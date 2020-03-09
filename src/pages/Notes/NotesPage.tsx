import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { LineSpacer } from "../../components";
import { AesPassphraseContainer } from "./AesPassphraseContainer";
import { CreateNoteContainer } from "./CreateNoteContainer";
import { NoteListContainer } from "./NoteListContainer";
import { GET_AES_PASSPHRASE } from "../../queries";

export const GET_CURRENT_USER_TAGS = gql`
  {
    currentUserTags {
      id
      label
    }
  }
`;

export const NotesPage = () => {
  const getAesPassphraseResults = useQuery(GET_AES_PASSPHRASE);
  const aesPassphrase = getAesPassphraseResults.data?.aesPassphrase;
  const client = useApolloClient();

  return (
    <div>
      <LineSpacer />
      {!aesPassphrase ? (
        <AesPassphraseContainer
          onSubmit={aesPassphrase =>
            client.writeData({ data: { aesPassphrase } })
          }
        />
      ) : (
        <CreateNoteContainer aesPassphrase={aesPassphrase} />
      )}
      <LineSpacer />
      <NoteListContainer aesPassphrase={aesPassphrase} />
    </div>
  );
};
