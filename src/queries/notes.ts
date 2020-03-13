import gql from "graphql-tag";

export const GET_CURRENT_USER_NOTES = gql`
  query CurrentUserNotes($skip: Int, $limit: Int, $tagsId: [String!]) {
    currentUserNotes(skip: $skip, limit: $limit, tagsId: $tagsId) {
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
