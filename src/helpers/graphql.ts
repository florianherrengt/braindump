import { GraphQLClient } from 'graphql-request';
import { getSdk } from './api';
import { graphqlUrl } from '../config/'

export const graphqlClient = new GraphQLClient(
  graphqlUrl,
  {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  },
);

export const api = getSdk(graphqlClient);
