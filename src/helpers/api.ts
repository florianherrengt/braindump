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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
   __typename?: 'Query';
  insights: Insight;
  moods: Array<Mood>;
  currentUserNotes: PaginatedNoteResponse;
  paymentMethods: Array<PaymentMethod>;
  isSubscribed: Scalars['String'];
  stripeSessionId: Scalars['String'];
  currentUserTags: Array<Tag>;
  userExists: Scalars['Int'];
  currentUser?: Maybe<User>;
};


export type QueryCurrentUserNotesArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  tagsId?: Maybe<Array<Scalars['String']>>;
};


export type QueryUserExistsArgs = {
  username: Scalars['String'];
};

export type Insight = {
   __typename?: 'Insight';
  week: Array<InsightData>;
  month: Array<InsightData>;
  year: Array<InsightData>;
};

export type InsightData = {
   __typename?: 'InsightData';
  label: Scalars['String'];
  positive: Scalars['Int'];
  negative: Scalars['Int'];
};

export type Mood = {
   __typename?: 'Mood';
  id: Scalars['ID'];
  rating: MoodRating;
  createdAt: Scalars['DateTime'];
};

export enum MoodRating {
  Sad = 'sad',
  Meh = 'meh',
  Good = 'good',
  Special = 'special'
}


export type PaginatedNoteResponse = {
   __typename?: 'PaginatedNoteResponse';
  items: Array<Note>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type Note = {
   __typename?: 'Note';
  id: Scalars['ID'];
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
  tags: Array<Tag>;
};

export type Tag = {
   __typename?: 'Tag';
  id: Scalars['ID'];
  label: Scalars['String'];
  emotion?: Maybe<TagEmotion>;
  createdAt: Scalars['DateTime'];
};

export enum TagEmotion {
  Positive = 'positive',
  Neutral = 'neutral',
  Negative = 'negative'
}

export type PaymentMethod = {
   __typename?: 'PaymentMethod';
  id: Scalars['String'];
  isDefault: Scalars['Boolean'];
  card: Card;
};

export type Card = {
   __typename?: 'Card';
  brand: CardBrand;
  expMonth: Scalars['Float'];
  expMonthString: Scalars['String'];
  expYear: Scalars['Float'];
  last4: Scalars['String'];
};

export enum CardBrand {
  AmericanExpress = 'americanExpress',
  DinersClub = 'dinersClub',
  Discover = 'discover',
  Jcb = 'jcb',
  Mastercard = 'mastercard',
  Unionpay = 'unionpay',
  Visa = 'visa'
}

export type User = {
   __typename?: 'User';
  username: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  emailConfirmed?: Maybe<Scalars['Int']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  recordMood: Mood;
  deleteNote: Note;
  updateNote: Note;
  createNote: Note;
  updateDefaultPaymentMethod: Scalars['Int'];
  deletePaymentMethod: Scalars['Int'];
  cancelSubscription: Scalars['Int'];
  createTag: Tag;
  updateTag: Tag;
  deleteTag: Tag;
  signIn?: Maybe<Scalars['String']>;
  signUp: Scalars['String'];
  signOut: Scalars['Int'];
  updateEmail: User;
  resendConfirmEmail: User;
  deleteAccount: Scalars['Int'];
};


export type MutationRecordMoodArgs = {
  input: RecordMoodInput;
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


export type MutationUpdateDefaultPaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
};


export type MutationDeletePaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
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


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateEmailArgs = {
  input: UpdateEmailInput;
};

export type RecordMoodInput = {
  id: Scalars['ID'];
  rating: MoodRating;
  date: Scalars['DateTime'];
};

export type UpdateNoteInput = {
  id: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<TagNote>>;
};

export type TagNote = {
  id: Scalars['String'];
};

export type CreateNoteInput = {
  text: Scalars['String'];
  tags: Array<TagNote>;
};

export type CreateTagInput = {
  label: Scalars['String'];
  emotion?: Maybe<Scalars['String']>;
};

export type UpdateTagInput = {
  id: Scalars['String'];
  label: Scalars['String'];
  emotion?: Maybe<Scalars['String']>;
};

export type SignInInput = {
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type UpdateEmailInput = {
  email: Scalars['String'];
};

export type GetInsightsQueryVariables = {};


export type GetInsightsQuery = (
  { __typename?: 'Query' }
  & { insights: (
    { __typename?: 'Insight' }
    & { week: Array<(
      { __typename?: 'InsightData' }
      & Pick<InsightData, 'label' | 'positive' | 'negative'>
    )>, month: Array<(
      { __typename?: 'InsightData' }
      & Pick<InsightData, 'label' | 'positive' | 'negative'>
    )>, year: Array<(
      { __typename?: 'InsightData' }
      & Pick<InsightData, 'label' | 'positive' | 'negative'>
    )> }
  ) }
);

export type MoodsQueryVariables = {};


export type MoodsQuery = (
  { __typename?: 'Query' }
  & { moods: Array<(
    { __typename?: 'Mood' }
    & MoodFieldsFragment
  )> }
);

export type RecordMoodMutationVariables = {
  input: RecordMoodInput;
};


export type RecordMoodMutation = (
  { __typename?: 'Mutation' }
  & { recordMood: (
    { __typename?: 'Mood' }
    & MoodFieldsFragment
  ) }
);

export type MoodFieldsFragment = (
  { __typename?: 'Mood' }
  & Pick<Mood, 'id' | 'rating' | 'createdAt'>
);

export type GetCurrentUserNotesQueryVariables = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  tagsId?: Maybe<Array<Scalars['String']>>;
};


export type GetCurrentUserNotesQuery = (
  { __typename?: 'Query' }
  & { currentUserNotes: (
    { __typename?: 'PaginatedNoteResponse' }
    & Pick<PaginatedNoteResponse, 'hasMore' | 'total'>
    & { items: Array<(
      { __typename?: 'Note' }
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'id'>
      )> }
      & NoteFieldsFragment
    )> }
  ) }
);

export type DeleteNoteMutationVariables = {
  id: Scalars['String'];
};


export type DeleteNoteMutation = (
  { __typename?: 'Mutation' }
  & { deleteNote: (
    { __typename?: 'Note' }
    & Pick<Note, 'id'>
  ) }
);

export type CreateNoteMutationVariables = {
  input: CreateNoteInput;
};


export type CreateNoteMutation = (
  { __typename?: 'Mutation' }
  & { createNote: (
    { __typename?: 'Note' }
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id'>
    )> }
    & NoteFieldsFragment
  ) }
);

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput;
};


export type UpdateNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateNote: (
    { __typename?: 'Note' }
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id'>
    )> }
    & NoteFieldsFragment
  ) }
);

export type NoteFieldsFragment = (
  { __typename?: 'Note' }
  & Pick<Note, 'id' | 'text' | 'createdAt'>
);

export type UpdateDefaultPaymentMethodMutationVariables = {
  id: Scalars['String'];
};


export type UpdateDefaultPaymentMethodMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateDefaultPaymentMethod'>
);

export type DeletePaymentMethodMutationVariables = {
  id: Scalars['String'];
};


export type DeletePaymentMethodMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePaymentMethod'>
);

export type CancelSubscriptionMutationVariables = {};


export type CancelSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelSubscription'>
);

export type GetPaymentMethodsQueryVariables = {};


export type GetPaymentMethodsQuery = (
  { __typename?: 'Query' }
  & { paymentMethods: Array<(
    { __typename?: 'PaymentMethod' }
    & Pick<PaymentMethod, 'id' | 'isDefault'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'brand' | 'expMonth' | 'expMonthString' | 'expYear' | 'last4'>
    ) }
  )> }
);

export type IsSubscribedQueryVariables = {};


export type IsSubscribedQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isSubscribed'>
);

export type GetCurrentUserTagsQueryVariables = {};


export type GetCurrentUserTagsQuery = (
  { __typename?: 'Query' }
  & { currentUserTags: Array<(
    { __typename?: 'Tag' }
    & TagFieldsFragment
  )> }
);

export type CreateTagMutationVariables = {
  input: CreateTagInput;
};


export type CreateTagMutation = (
  { __typename?: 'Mutation' }
  & { createTag: (
    { __typename?: 'Tag' }
    & TagFieldsFragment
  ) }
);

export type UpdateTagMutationVariables = {
  input: UpdateTagInput;
};


export type UpdateTagMutation = (
  { __typename?: 'Mutation' }
  & { updateTag: (
    { __typename?: 'Tag' }
    & TagFieldsFragment
  ) }
);

export type DeleteTagMutationVariables = {
  id: Scalars['String'];
};


export type DeleteTagMutation = (
  { __typename?: 'Mutation' }
  & { deleteTag: (
    { __typename?: 'Tag' }
    & Pick<Tag, 'id'>
  ) }
);

export type TagFieldsFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'id' | 'label' | 'emotion' | 'createdAt'>
);

export type GetCurrentUserQueryVariables = {};


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> }
);

export type SignInMutationVariables = {
  input: SignInInput;
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signIn'>
);

export type SignOutMutationVariables = {};


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signOut'>
);

export type UserExistsQueryVariables = {
  username: Scalars['String'];
};


export type UserExistsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'userExists'>
);

export type GetStripeSessionIdQueryVariables = {};


export type GetStripeSessionIdQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'stripeSessionId'>
);

export type SignUpMutationVariables = {
  input: SignUpInput;
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signUp'>
);

export type UpdateEmailMutationVariables = {
  input: UpdateEmailInput;
};


export type UpdateEmailMutation = (
  { __typename?: 'Mutation' }
  & { updateEmail: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export type ResendConfirmEmailMutationVariables = {};


export type ResendConfirmEmailMutation = (
  { __typename?: 'Mutation' }
  & { resendConfirmEmail: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'username' | 'email' | 'emailConfirmed'>
);

export const MoodFieldsFragmentDoc = gql`
    fragment MoodFields on Mood {
  id
  rating
  createdAt
}
    `;
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
  emotion
  createdAt
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  username
  email
  emailConfirmed
}
    `;
export const GetInsightsDocument = gql`
    query getInsights {
  insights {
    week {
      label
      positive
      negative
    }
    month {
      label
      positive
      negative
    }
    year {
      label
      positive
      negative
    }
  }
}
    `;
export const MoodsDocument = gql`
    query moods {
  moods {
    ...MoodFields
  }
}
    ${MoodFieldsFragmentDoc}`;
export const RecordMoodDocument = gql`
    mutation recordMood($input: RecordMoodInput!) {
  recordMood(input: $input) {
    ...MoodFields
  }
}
    ${MoodFieldsFragmentDoc}`;
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
    total
  }
}
    ${NoteFieldsFragmentDoc}`;
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
    ${NoteFieldsFragmentDoc}`;
export const UpdateNoteDocument = gql`
    mutation updateNote($input: UpdateNoteInput!) {
  updateNote(input: $input) {
    ...NoteFields
    tags {
      id
    }
  }
}
    ${NoteFieldsFragmentDoc}`;
export const UpdateDefaultPaymentMethodDocument = gql`
    mutation updateDefaultPaymentMethod($id: String!) {
  updateDefaultPaymentMethod(paymentMethodId: $id)
}
    `;
export const DeletePaymentMethodDocument = gql`
    mutation deletePaymentMethod($id: String!) {
  deletePaymentMethod(paymentMethodId: $id)
}
    `;
export const CancelSubscriptionDocument = gql`
    mutation cancelSubscription {
  cancelSubscription
}
    `;
export const GetPaymentMethodsDocument = gql`
    query getPaymentMethods {
  paymentMethods {
    id
    isDefault
    card {
      brand
      expMonth
      expMonthString
      expYear
      last4
    }
  }
}
    `;
export const IsSubscribedDocument = gql`
    query isSubscribed {
  isSubscribed
}
    `;
export const GetCurrentUserTagsDocument = gql`
    query getCurrentUserTags {
  currentUserTags {
    ...TagFields
  }
}
    ${TagFieldsFragmentDoc}`;
export const CreateTagDocument = gql`
    mutation createTag($input: CreateTagInput!) {
  createTag(input: $input) {
    ...TagFields
  }
}
    ${TagFieldsFragmentDoc}`;
export const UpdateTagDocument = gql`
    mutation updateTag($input: UpdateTagInput!) {
  updateTag(input: $input) {
    ...TagFields
  }
}
    ${TagFieldsFragmentDoc}`;
export const DeleteTagDocument = gql`
    mutation deleteTag($id: String!) {
  deleteTag(id: $id) {
    id
  }
}
    `;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  currentUser {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const SignInDocument = gql`
    mutation signIn($input: SignInInput!) {
  signIn(input: $input)
}
    `;
export const SignOutDocument = gql`
    mutation signOut {
  signOut
}
    `;
export const UserExistsDocument = gql`
    query userExists($username: String!) {
  userExists(username: $username)
}
    `;
export const GetStripeSessionIdDocument = gql`
    query getStripeSessionId {
  stripeSessionId
}
    `;
export const SignUpDocument = gql`
    mutation signUp($input: SignUpInput!) {
  signUp(input: $input)
}
    `;
export const UpdateEmailDocument = gql`
    mutation updateEmail($input: UpdateEmailInput!) {
  updateEmail(input: $input) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const ResendConfirmEmailDocument = gql`
    mutation resendConfirmEmail {
  resendConfirmEmail {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getInsights(variables?: GetInsightsQueryVariables): Promise<GetInsightsQuery> {
      return withWrapper(() => client.request<GetInsightsQuery>(print(GetInsightsDocument), variables));
    },
    moods(variables?: MoodsQueryVariables): Promise<MoodsQuery> {
      return withWrapper(() => client.request<MoodsQuery>(print(MoodsDocument), variables));
    },
    recordMood(variables: RecordMoodMutationVariables): Promise<RecordMoodMutation> {
      return withWrapper(() => client.request<RecordMoodMutation>(print(RecordMoodDocument), variables));
    },
    getCurrentUserNotes(variables?: GetCurrentUserNotesQueryVariables): Promise<GetCurrentUserNotesQuery> {
      return withWrapper(() => client.request<GetCurrentUserNotesQuery>(print(GetCurrentUserNotesDocument), variables));
    },
    deleteNote(variables: DeleteNoteMutationVariables): Promise<DeleteNoteMutation> {
      return withWrapper(() => client.request<DeleteNoteMutation>(print(DeleteNoteDocument), variables));
    },
    createNote(variables: CreateNoteMutationVariables): Promise<CreateNoteMutation> {
      return withWrapper(() => client.request<CreateNoteMutation>(print(CreateNoteDocument), variables));
    },
    updateNote(variables: UpdateNoteMutationVariables): Promise<UpdateNoteMutation> {
      return withWrapper(() => client.request<UpdateNoteMutation>(print(UpdateNoteDocument), variables));
    },
    updateDefaultPaymentMethod(variables: UpdateDefaultPaymentMethodMutationVariables): Promise<UpdateDefaultPaymentMethodMutation> {
      return withWrapper(() => client.request<UpdateDefaultPaymentMethodMutation>(print(UpdateDefaultPaymentMethodDocument), variables));
    },
    deletePaymentMethod(variables: DeletePaymentMethodMutationVariables): Promise<DeletePaymentMethodMutation> {
      return withWrapper(() => client.request<DeletePaymentMethodMutation>(print(DeletePaymentMethodDocument), variables));
    },
    cancelSubscription(variables?: CancelSubscriptionMutationVariables): Promise<CancelSubscriptionMutation> {
      return withWrapper(() => client.request<CancelSubscriptionMutation>(print(CancelSubscriptionDocument), variables));
    },
    getPaymentMethods(variables?: GetPaymentMethodsQueryVariables): Promise<GetPaymentMethodsQuery> {
      return withWrapper(() => client.request<GetPaymentMethodsQuery>(print(GetPaymentMethodsDocument), variables));
    },
    isSubscribed(variables?: IsSubscribedQueryVariables): Promise<IsSubscribedQuery> {
      return withWrapper(() => client.request<IsSubscribedQuery>(print(IsSubscribedDocument), variables));
    },
    getCurrentUserTags(variables?: GetCurrentUserTagsQueryVariables): Promise<GetCurrentUserTagsQuery> {
      return withWrapper(() => client.request<GetCurrentUserTagsQuery>(print(GetCurrentUserTagsDocument), variables));
    },
    createTag(variables: CreateTagMutationVariables): Promise<CreateTagMutation> {
      return withWrapper(() => client.request<CreateTagMutation>(print(CreateTagDocument), variables));
    },
    updateTag(variables: UpdateTagMutationVariables): Promise<UpdateTagMutation> {
      return withWrapper(() => client.request<UpdateTagMutation>(print(UpdateTagDocument), variables));
    },
    deleteTag(variables: DeleteTagMutationVariables): Promise<DeleteTagMutation> {
      return withWrapper(() => client.request<DeleteTagMutation>(print(DeleteTagDocument), variables));
    },
    getCurrentUser(variables?: GetCurrentUserQueryVariables): Promise<GetCurrentUserQuery> {
      return withWrapper(() => client.request<GetCurrentUserQuery>(print(GetCurrentUserDocument), variables));
    },
    signIn(variables: SignInMutationVariables): Promise<SignInMutation> {
      return withWrapper(() => client.request<SignInMutation>(print(SignInDocument), variables));
    },
    signOut(variables?: SignOutMutationVariables): Promise<SignOutMutation> {
      return withWrapper(() => client.request<SignOutMutation>(print(SignOutDocument), variables));
    },
    userExists(variables: UserExistsQueryVariables): Promise<UserExistsQuery> {
      return withWrapper(() => client.request<UserExistsQuery>(print(UserExistsDocument), variables));
    },
    getStripeSessionId(variables?: GetStripeSessionIdQueryVariables): Promise<GetStripeSessionIdQuery> {
      return withWrapper(() => client.request<GetStripeSessionIdQuery>(print(GetStripeSessionIdDocument), variables));
    },
    signUp(variables: SignUpMutationVariables): Promise<SignUpMutation> {
      return withWrapper(() => client.request<SignUpMutation>(print(SignUpDocument), variables));
    },
    updateEmail(variables: UpdateEmailMutationVariables): Promise<UpdateEmailMutation> {
      return withWrapper(() => client.request<UpdateEmailMutation>(print(UpdateEmailDocument), variables));
    },
    resendConfirmEmail(variables?: ResendConfirmEmailMutationVariables): Promise<ResendConfirmEmailMutation> {
      return withWrapper(() => client.request<ResendConfirmEmailMutation>(print(ResendConfirmEmailDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;