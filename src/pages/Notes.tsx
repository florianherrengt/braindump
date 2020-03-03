import gql from "graphql-tag";
import React from "react";
import { CreateNote } from "../components/CreateSnap";
import { Layout } from "../components/Layout";
import { LineSpacer } from "../components/LineSpacer";
import { NoteCard } from "../components/NoteCard";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_CURRENT_USER_NOTES = gql`
  {
    currentUserNotes {
      id
      text
    }
  }
`;

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      text
    }
  }
`;

export const NotesPage = () => {
  const getCurrentUserNotesResults = useQuery(GET_CURRENT_USER_NOTES);
  const [createNoteMutation, createNoteResults] = useMutation(
    CREATE_NOTE_MUTATION
  );
  if (getCurrentUserNotesResults.loading) {
    return <div>Loading</div>;
  }
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
        onSubmit={input =>
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
            }
          })
        }
      />
      {getCurrentUserNotesResults.data.currentUserNotes.map((note: any) => (
        <div key={note.id}>
          <LineSpacer />
          <NoteCard note={note} />
        </div>
      ))}
    </Layout>
  );
};
