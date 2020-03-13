import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { CreateNote, Tag, LoadingOrError } from "../../components";
import { encrypt, decrypt } from "../../helpers";
import { GET_CURRENT_USER_NOTES, GET_CURRENT_USER_TAGS } from "../../queries";

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
    CREATE_NOTE_MUTATION,
    {
      update(cache, { data: { createNote } }) {
        const { currentUserNotes } =
          cache.readQuery({
            query: GET_CURRENT_USER_NOTES,
            variables: { tagsId: [], limit: 10 }
          }) || {};
        cache.writeQuery({
          query: GET_CURRENT_USER_NOTES,
          data: {
            currentUserNotes: {
              items: [createNote, ...currentUserNotes.items]
            }
          },

          variables: { tagsId: [], limit: 10 }
        });
      }
    }
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
        data: getCurrentUserTagsResults.data?.currentUserTags.map(
          (tag: Tag) => ({
            ...tag,
            label: decrypt(tag.label, props.aesPassphrase)
          })
        ),
        errors: getCurrentUserTagsResults.error?.graphQLErrors.map(
          ({ message }) => message
        ),
        loading: getCurrentUserTagsResults.loading
      }}
      onSubmit={input => {
        createNoteMutation({
          variables: {
            input: {
              text: encrypt(input.text, props.aesPassphrase),
              tags: input.tags.map(t => ({ id: t.id }))
            }
          }
          /*
          optimisticResponse: {
            __typename: "Mutation",
            createNote: {
              __typename: "Note",
              id: "optimistic" + Math.random().toString(),
              ...input
            }
          }
    */
        });
      }}
    />
  );
};
