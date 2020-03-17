import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateNoteInput = {
  text: Scalars['String'];
  tags: Array<TagNote>;
};

export type CreateTagInput = {
  label: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteNote: Note;
  updateNote: Note;
  createNote: Note;
  signIn?: Maybe<Scalars['String']>;
  signUp: Scalars['String'];
  deleteAccount: Scalars['Int'];
  createTag: Tag;
  updateTag: Tag;
  deleteTag: Tag;
};

export type MutationDeleteNoteArgs = {
  id: Scalars['String'];
};

export type MutationUpdateNoteArgs = {
  input: UpdateNoteInput;
};

export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationCreateTagArgs = {
  input: CreateTagInput;
};

export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};

export type MutationDeleteTagArgs = {
  id: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
  tags: Array<Tag>;
};

export type PaginatedNoteResponse = {
  __typename?: 'PaginatedNoteResponse';
  items: Array<Note>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  currentUserNotes: PaginatedNoteResponse;
  userExists: Scalars['Int'];
  currentUser?: Maybe<User>;
  currentUserTags: Array<Tag>;
};

export type QueryCurrentUserNotesArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  tagsId?: Maybe<Array<Scalars['String']>>;
};

export type QueryUserExistsArgs = {
  username: Scalars['String'];
};

export type SignInInput = {
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  label: Scalars['String'];
};

export type TagNote = {
  id: Scalars['String'];
};

export type UpdateNoteInput = {
  id: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<TagNote>>;
};

export type UpdateTagInput = {
  id: Scalars['String'];
  label: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  username: Scalars['ID'];
};

export type GetCurrentUserNotesQueryVariables = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  tagsId?: Maybe<Array<Scalars['String']>>;
};

export type GetCurrentUserNotesQuery = { __typename?: 'Query' } & {
  currentUserNotes: { __typename?: 'PaginatedNoteResponse' } & Pick<
    PaginatedNoteResponse,
    'hasMore'
  > & {
      items: Array<
        { __typename?: 'Note' } & {
          tags: Array<{ __typename?: 'Tag' } & Pick<Tag, 'id'>>;
        } & NoteFieldsFragment
      >;
    };
};

export type DeleteNoteMutationVariables = {
  id: Scalars['String'];
};

export type DeleteNoteMutation = { __typename?: 'Mutation' } & {
  deleteNote: { __typename?: 'Note' } & Pick<Note, 'id'>;
};

export type CreateNoteMutationVariables = {
  input: CreateNoteInput;
};

export type CreateNoteMutation = { __typename?: 'Mutation' } & {
  createNote: { __typename?: 'Note' } & {
    tags: Array<{ __typename?: 'Tag' } & Pick<Tag, 'id'>>;
  } & NoteFieldsFragment;
};

export type NoteFieldsFragment = { __typename?: 'Note' } & Pick<
  Note,
  'id' | 'text' | 'createdAt'
>;

export type GetCurrentUserTagsQueryVariables = {};

export type GetCurrentUserTagsQuery = { __typename?: 'Query' } & {
  currentUserTags: Array<{ __typename?: 'Tag' } & TagFieldsFragment>;
};

export type TagFieldsFragment = { __typename?: 'Tag' } & Pick<
  Tag,
  'id' | 'label'
>;

export type GetCurrentUserQueryVariables = {};

export type GetCurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: Maybe<{ __typename?: 'User' } & UserFieldsFragment>;
};

export type UserFieldsFragment = { __typename?: 'User' } & Pick<
  User,
  'username'
>;

export const NoteFieldsFragmentDoc = gql`
  fragment NoteFields on Note {
    id
    text
    createdAt
  }
`;
export const TagFieldsFragmentDoc = gql`
  fragment TagFields on Tag {
    id
    label
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    username
  }
`;
export const GetCurrentUserNotesDocument = gql`
  query getCurrentUserNotes($skip: Int, $limit: Int, $tagsId: [String!]) {
    currentUserNotes(skip: $skip, limit: $limit, tagsId: $tagsId) {
      items {
        ...NoteFields
        tags {
          id
        }
      }
      hasMore
    }
  }
  ${NoteFieldsFragmentDoc}
`;
export const DeleteNoteDocument = gql`
  mutation deleteNote($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;
export const CreateNoteDocument = gql`
  mutation createNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      ...NoteFields
      tags {
        id
      }
    }
  }
  ${NoteFieldsFragmentDoc}
`;
export const GetCurrentUserTagsDocument = gql`
  query getCurrentUserTags {
    currentUserTags {
      ...TagFields
    }
  }
  ${TagFieldsFragmentDoc}
`;
export const GetCurrentUserDocument = gql`
  query getCurrentUser {
    currentUser {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export function getSdk(client: GraphQLClient) {
  return {
    getCurrentUserNotes(
      variables?: GetCurrentUserNotesQueryVariables,
    ): Promise<GetCurrentUserNotesQuery> {
      return client.request<GetCurrentUserNotesQuery>(
        print(GetCurrentUserNotesDocument),
        variables,
      );
    },
    deleteNote(
      variables: DeleteNoteMutationVariables,
    ): Promise<DeleteNoteMutation> {
      return client.request<DeleteNoteMutation>(
        print(DeleteNoteDocument),
        variables,
      );
    },
    createNote(
      variables: CreateNoteMutationVariables,
    ): Promise<CreateNoteMutation> {
      return client.request<CreateNoteMutation>(
        print(CreateNoteDocument),
        variables,
      );
    },
    getCurrentUserTags(
      variables?: GetCurrentUserTagsQueryVariables,
    ): Promise<GetCurrentUserTagsQuery> {
      return client.request<GetCurrentUserTagsQuery>(
        print(GetCurrentUserTagsDocument),
        variables,
      );
    },
    getCurrentUser(
      variables?: GetCurrentUserQueryVariables,
    ): Promise<GetCurrentUserQuery> {
      return client.request<GetCurrentUserQuery>(
        print(GetCurrentUserDocument),
        variables,
      );
    },
  };
}