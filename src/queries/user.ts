import gql from 'graphql-tag';

export const GET_AES_PASSPHRASE = gql`
  {
    aesPassphrase @client
  }
`;
