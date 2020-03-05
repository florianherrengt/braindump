import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { AesPassphraseForm, LoadingOrError } from "../../components";

const GET_ONE_NOTE = gql`
  {
    currentUserNotes(limit: 1) {
      text
    }
  }
`;

export const AesPassphraseContainer = () => {
  const client = useApolloClient();
  const getOneNoteQuery = useQuery(GET_ONE_NOTE);
  //   console.log(getOneNoteQuery.data?.currentUserNotes[0]?.text);
  return (
    <AesPassphraseForm
      testNote={getOneNoteQuery.data?.currentUserNotes[0]?.text}
      onSubmit={({ passphrase }) => {
        client.writeData({ data: { aesPassphrase: passphrase } });
      }}
    />
  );
};
