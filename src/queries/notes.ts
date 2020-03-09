import gql from "graphql-tag";

export const GET_CURRENT_USER_NOTES = gql`
  {
    currentUserNotes {
      id
      text
      tags {
        id
      }
    }
  }
`;