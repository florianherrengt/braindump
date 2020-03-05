import { useMutation, useQuery } from "@apollo/react-hooks";
import CryptoJS from "crypto-js";
import gql from "graphql-tag";
import React from "react";
import { CreateNote } from "../../components";
import { GET_CURRENT_USER_NOTES } from "./NoteListContainer";

export const GET_CURRENT_USER_TAGS = gql`
  {
    currentUserTags {
      id
      label
    }
  }
`;

export const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      text
      tags {
        id
        label
      }
    }
  }
`;

interface CreateNoteContainerProps {
  aesPassphrase: string;
}

export const CreateNoteContainer: React.SFC<CreateNoteContainerProps> = props => {
  const getCurrentUserTagsResults = useQuery(GET_CURRENT_USER_TAGS);
  const [createNoteMutation, createNoteResults] = useMutation(
    CREATE_NOTE_MUTATION
  );
  if (createNoteResults.error) {
    return (
      <div>
        {createNoteResults.error?.graphQLErrors.map(({ message }) => (
          <div>{message}</div>
        ))}
      </div>
    );
  }
  return (
    <CreateNote
      userTags={{
        data: getCurrentUserTagsResults.data?.currentUserTags,
        errors: getCurrentUserTagsResults.error?.graphQLErrors.map(
          ({ message }) => message
        ),
        loading: getCurrentUserTagsResults.loading
      }}
      onSubmit={input => {
        input.text = CryptoJS.AES.encrypt(
          input.text,
          props.aesPassphrase
        ).toString();

        createNoteMutation({
          variables: { input },
          optimisticResponse: {
            __typename: "Mutation",
            createNote: {
              __typename: "Note",
              id: "optimistic" + Math.random().toString(),
              ...input
            }
          },
          update(cache, { data: { createNote } }) {
            const { currentUserNotes } =
              cache.readQuery({
                query: GET_CURRENT_USER_NOTES
              }) || {};

            cache.writeQuery({
              query: GET_CURRENT_USER_NOTES,
              data: {
                currentUserNotes: [createNote, ...currentUserNotes]
              }
            });
            const { currentUserTags } =
              cache.readQuery({ query: GET_CURRENT_USER_TAGS }) || {};

            cache.writeQuery({
              query: GET_CURRENT_USER_TAGS,
              data: {
                currentUserTags: [...createNote.tags, ...currentUserTags]
              }
            });
          }
        });
      }}
    />
  );
};
