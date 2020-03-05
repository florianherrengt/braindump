import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { LoadingOrError, NoteList } from "../../components";
import CryptoJS from "crypto-js";

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
                ? CryptoJS.AES.decrypt(
                    decodeURIComponent(note.text),
                    props.aesPassphrase
                  ).toString(CryptoJS.enc.Utf8)
                : note.text
            };
          }
        )}
      />
    </LoadingOrError>
  );
};
