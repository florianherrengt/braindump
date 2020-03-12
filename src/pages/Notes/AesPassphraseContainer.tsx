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

interface AesPassphraseContainerProps {
  submitLabel?: string;
}

export const AesPassphraseContainer: React.SFC<AesPassphraseContainerProps> = props => {
  const client = useApolloClient();
  const getOneNoteQuery = useQuery(GET_ONE_NOTE);

  return (
    <LoadingOrError results={getOneNoteQuery}>
      <AesPassphraseForm
        submitLabel={props.submitLabel}
        testNote={getOneNoteQuery.data?.currentUserNotes[0]?.text}
        onSubmit={({ passphrase, shouldSaveToLocalstorage }) => {
          client.writeData({ data: { aesPassphrase: passphrase } });
          if (shouldSaveToLocalstorage) {
            localStorage.setItem("aesPassphrase", passphrase);
          }
        }}
      />
    </LoadingOrError>
  );
};
