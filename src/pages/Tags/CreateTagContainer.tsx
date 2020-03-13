import { useMutation, useQuery } from '@apollo/react-hooks';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import React from 'react';
import { LoadingOrError } from '../../components';
import { CreateTagForm } from '../../components/CreateTagForm';
import { encrypt } from '../../helpers';
import { GET_AES_PASSPHRASE, GET_CURRENT_USER_TAGS } from '../../queries';

interface TagsListContainerProps {}

const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      label
    }
  }
`;

export const CreateTagContainer: React.SFC<TagsListContainerProps> = props => {
  const getAesPassphraseResults = useQuery(GET_AES_PASSPHRASE);
  const aesPassphrase = getAesPassphraseResults.data?.aesPassphrase;
  const [createTagMutation, createTagMutationResults] = useMutation(CREATE_TAG_MUTATION, {
    update(cache, { data: { createTag } }) {
      const { currentUserTags } =
        cache.readQuery({
          query: GET_CURRENT_USER_TAGS,
        }) || {};

      cache.writeQuery({
        query: GET_CURRENT_USER_TAGS,
        data: {
          currentUserTags: [...currentUserTags, createTag],
        },
      });
    },
  });

  if (!aesPassphrase) {
    return <Typography>No aes passphrase found...</Typography>;
  }
  return (
    <LoadingOrError results={createTagMutationResults}>
      <CreateTagForm
        onSubmit={label => {
          createTagMutation({
            variables: { input: { label: encrypt(label, aesPassphrase) } },
          });
        }}
      />
    </LoadingOrError>
  );
};
