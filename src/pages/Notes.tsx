import { QueryResult } from "@apollo/react-common";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { CreateNote } from "../components/CreateNote";
import { Layout } from "../components/Layout";
import { LineSpacer } from "../components/LineSpacer";
import { NoteList } from "../components/NoteList";

const GET_CURRENT_USER_NOTES = gql`
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

const GET_CURRENT_USER_TAGS = gql`
  {
    currentUserTags {
      id
      label
    }
  }
`;

const CREATE_NOTE_MUTATION = gql`
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

const getErrors = (queryResult: QueryResult): string[] | undefined => {
  return queryResult.error?.graphQLErrors.map(({ message }) => message);
};

export const NotesPage = () => {
  const getCurrentUserNotesResults = useQuery(GET_CURRENT_USER_NOTES);
  const getCurrentUserTagsResults = useQuery(GET_CURRENT_USER_TAGS);
  const [createNoteMutation, createNoteResults] = useMutation(
    CREATE_NOTE_MUTATION
  );
  if (getCurrentUserNotesResults.error) {
    return (
      <div>
        {getCurrentUserNotesResults.error.graphQLErrors.map(({ message }) => (
          <div key={btoa(message)}>{message}</div>
        ))}
      </div>
    );
  }
  if (createNoteResults.error) {
    alert(createNoteResults.error);
  }

  return (
    <Layout>
      <LineSpacer />
      <CreateNote
        userTags={{
          data: getCurrentUserTagsResults.data?.currentUserTags,
          errors: getErrors(getCurrentUserTagsResults),
          loading: getCurrentUserTagsResults.loading
        }}
        onSubmit={input => {
          console.log(input);
          createNoteMutation({
            variables: { input },
            // optimisticResponse: {
            //   __typename: "Mutation",
            //   createNote: {
            //     __typename: "Note",
            //     id: "optimistic" + Math.random().toString(),
            //     ...input
            //   }
            // },
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
            }
          });
        }}
      />
      <LineSpacer />
      <NoteList
        errors={getErrors(getCurrentUserNotesResults)}
        loading={getCurrentUserNotesResults.loading}
        notes={getCurrentUserNotesResults.data?.currentUserNotes}
      />
    </Layout>
  );
};
