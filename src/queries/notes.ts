import gql from "graphql-tag";

export const GET_CURRENT_USER_NOTES = gql`
  query CurrentUserNotes($skip: Float) {
    currentUserNotes(skip: $skip) {
      items {
        id
        text
        tags {
          id
        }
      }
      hasMore
    }
  }
`;
