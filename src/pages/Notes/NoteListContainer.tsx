import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { LoadingOrError, NoteList } from "../../components";
import CryptoJS from "crypto-js";
import { decrypt } from "../../helpers";

export const GET_CURRENT_USER_NOTES = gql`
  {
    currentUserNotes {
      id
      text
      tags {
        id
        label
      }
    }
  }
`;

interface NoteListContainerProps {
  aesPassphrase: string;
}

export const NoteListContainer: React.SFC<NoteListContainerProps> = props => {
  const getCurrentUserNotesResults = useQuery(GET_CURRENT_USER_NOTES);
  console.log(props.aesPassphrase);
  return (
    <LoadingOrError query={getCurrentUserNotesResults}>
      <NoteList
        notes={getCurrentUserNotesResults.data?.currentUserNotes.map(
          (note: any) => {
            return {
              ...note,
              text: props.aesPassphrase
                ? decrypt(note.text, props.aesPassphrase)
                : note.text
            };
          }
        )}
      />
    </LoadingOrError>
  );
};
