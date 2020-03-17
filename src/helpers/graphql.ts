import { GraphQLClient } from 'graphql-request';
import { getSdk } from './api';

export const graphqlClient = new GraphQLClient(
  'http://localhost:8080/api/graphql',
  {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  },
);

export const api = getSdk(graphqlClient);
