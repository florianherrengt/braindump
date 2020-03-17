import { ThunkDispatch } from 'redux-thunk';
import { api, User } from '../helpers';
import { RootState } from '../reducers';

export interface UserActionFetching {
  type: 'GET_CURRENT_USER_REQUEST';
  isFetching: true;
}

export interface UserActionSuccess {
  type: 'GET_CURRENT_USER_SUCCESS';
  user: User;
  isFetching: false;
}

export interface UserActionFailure {
  type: 'GET_CURRENT_USER_FAILURE';
  error: string;
  isFetching: false;
}

export interface UserActionSetAesPassphrase {
  type: 'SET_AES_PASSPHRASE';
  user: { aesPassphrase: string };
}

export type UserAction =
  | UserActionFetching
  | UserActionSuccess
  | UserActionFailure
  | UserActionSetAesPassphrase;

interface Options {
  forceReload: boolean;
}

export const fetchCurrentUser = (options?: Options) => async (
  dispatch: ThunkDispatch<{}, {}, UserAction>,
  getState: () => RootState,
) => {
  if (!options?.forceReload) {
    const state = getState();
    if (
      state.currentUser.isFetching ||
      state.currentUser.user ||
      state.currentUser.error
    ) {
      return;
    }
  }
  dispatch({
    type: 'GET_CURRENT_USER_REQUEST',
    isFetching: true,
  });
  try {
    const { currentUser } = await api.getCurrentUser();
    if (!currentUser) {
      return dispatch({
        type: 'GET_CURRENT_USER_FAILURE',
        error: 'No user returned',
        isFetching: false,
      });
    }
    dispatch({
      type: 'GET_CURRENT_USER_SUCCESS',
      user: currentUser,
      isFetching: false,
    });
  } catch (error) {
    dispatch({
      type: 'GET_CURRENT_USER_FAILURE',
      error,
      isFetching: false,
    });
  }
};

export const setAesPassphrase = (aesPassphrase: string) => async (
  dispatch: ThunkDispatch<{}, {}, UserAction>,
  getState: () => RootState,
) => {
  dispatch({ type: 'SET_AES_PASSPHRASE', user: { aesPassphrase } });
};
