import gql from "graphql-tag";

export const GET_CURRENT_USER_TAGS = gql`
  {
    currentUserTags {
      id
      label
    }
  }
`;