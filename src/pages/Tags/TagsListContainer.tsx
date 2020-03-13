import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CURRENT_USER_TAGS, GET_AES_PASSPHRASE } from '../../queries';
import { LoadingOrError, ListTags } from '../../components';
import { Typography } from '@material-ui/core';
import { decrypt, encrypt } from '../../helpers';
import gql from 'graphql-tag';

const DELETE_TAG_MUTATION = gql`
  mutation DeleteTag($id: String!) {
    deleteTag(id: $id) {
      id
    }
  }
`;

const UPDATE_TAG_MUTATION = gql`
  mutation UpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input) {
      id
      label
    }
  }
`;

interface TagsListContainerProps {}

export const TagsListContainer: React.SFC<TagsListContainerProps> = props => {
  const getCurrentUserTags = useQuery(GET_CURRENT_USER_TAGS);
  const getAesPassphraseResults = useQuery(GET_AES_PASSPHRASE);
  const aesPassphrase = getAesPassphraseResults.data?.aesPassphrase;

  const [deleteTagMutation, deleteTagMutationResults] = useMutation(DELETE_TAG_MUTATION, {
    update(cache, { data: { deleteTag } }) {
      const { currentUserTags } =
        cache.readQuery({
          query: GET_CURRENT_USER_TAGS,
        }) || {};
      cache.writeQuery({
        query: GET_CURRENT_USER_TAGS,
        data: {
          currentUserTags: currentUserTags.filter((t: any) => t.id !== deleteTag.id),
        },
      });
    },
  });

  const [updateTagMutation, updateTagMutationResults] = useMutation(UPDATE_TAG_MUTATION, {
    update(cache, { data: { updateTag } }) {
      const { currentUserTags } =
        cache.readQuery({
          query: GET_CURRENT_USER_TAGS,
        }) || {};
      cache.writeQuery({
        query: GET_CURRENT_USER_TAGS,
        data: {
          currentUserTags: currentUserTags.map((t: any) => (t.id === updateTag.id ? updateTag : t)),
        },
      });
    },
  });

  if (!aesPassphrase) {
    return <Typography>No aes passphrase found...</Typography>;
  }

  return (
    <LoadingOrError results={getCurrentUserTags}>
      <ListTags
        onUpdate={tag =>
          updateTagMutation({
            variables: {
              input: { ...tag, label: encrypt(tag.label, aesPassphrase) },
            },
          })
        }
        onDelete={id => deleteTagMutation({ variables: { id } })}
        tags={
          (getCurrentUserTags.data?.currentUserTags || []).map((tag: any) => ({
            ...tag,
            label: decrypt(tag.label, aesPassphrase),
          })) || []
        }
      />
    </LoadingOrError>
  );
};
