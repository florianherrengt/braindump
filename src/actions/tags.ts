import {
  api,
  GetCurrentUserTagsQuery,
  GetCurrentUserTagsQueryVariables,
  decrypt,
} from '../helpers';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';

export interface TagsActionFetching {
  type: 'GET_CURRENT_USER_TAGS_REQUEST';
  isFetching: true;
}

export interface TagsActionSuccess {
  type: 'GET_CURRENT_USER_TAGS_SUCCESS';
  tags: GetCurrentUserTagsQuery['currentUserTags'];
  aesPassphrase?: string;
  isFetching: false;
}

export interface TagsActionFailure {
  type: 'GET_CURRENT_USER_TAGS_FAILURE';
  error: string;
  isFetching: false;
}

export type TagsAction =
  | TagsActionFetching
  | TagsActionSuccess
  | TagsActionFailure;

interface Options {
  variables: GetCurrentUserTagsQueryVariables;
  forceReload: boolean;
}

export const fetchCurrentUserTags = (options?: Options) => async (
  dispatch: ThunkDispatch<{}, {}, TagsAction>,
  getState: () => RootState,
) => {
  const state = getState();
  const { aesPassphrase } = state.currentUser

  if (!options?.forceReload) {
    if (
      state.currentUserTags.isFetching ||
      state.currentUserTags.tags.length ||
      state.currentUserTags.error
    ) {
      return;
    }
  }
  dispatch({
    type: 'GET_CURRENT_USER_TAGS_REQUEST',
    isFetching: true,
  });
  try {
    const { currentUserTags } = await api.getCurrentUserTags(
      options?.variables,
    );
    if (!currentUserTags) {
      return dispatch({
        type: 'GET_CURRENT_USER_TAGS_FAILURE',
        error: 'No user returned',
        isFetching: false,
      });
    }
    dispatch({
      type: 'GET_CURRENT_USER_TAGS_SUCCESS',
      tags: currentUserTags.map(tag => ({ ...tag, label: aesPassphrase ? decrypt(tag.label, aesPassphrase) : tag.label })),
      aesPassphrase: state.currentUser.aesPassphrase,
      isFetching: false,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'GET_CURRENT_USER_TAGS_FAILURE',
      error,
      isFetching: false,
    });
  }
};
