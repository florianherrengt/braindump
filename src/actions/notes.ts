import { ThunkDispatch } from 'redux-thunk';
import {
  api,
  GetCurrentUserNotesQuery,
  GetCurrentUserNotesQueryVariables,
  CreateNoteMutation,
  CreateNoteMutationVariables,
  decrypt,
  encrypt,
} from '../helpers';
import { RootState } from '../reducers';
import CryptoJS from 'crypto-js';

export interface GetNotesActionFetching {
  type: 'GET_CURRENT_USER_NOTES_REQUEST';
}

export interface GetNotesActionSuccess {
  type: 'GET_CURRENT_USER_NOTES_SUCCESS';
  notes: GetCurrentUserNotesQuery['currentUserNotes'];
  aesPassphrase?: string;
}

export interface GetNotesActionFailure {
  type: 'GET_CURRENT_USER_NOTES_FAILURE';
  error: string;
}

type GetNoteAction =
  | GetNotesActionFetching
  | GetNotesActionSuccess
  | GetNotesActionFailure;

export interface DeleteNotesActionFetching {
  type: 'DELETE_NOTE_REQUEST';
  id: string;
}

export interface DeleteNotesActionSuccess {
  type: 'DELETE_NOTE_SUCCESS';
  id: string;
}

export interface DeleteNotesActionError {
  type: 'DELETE_NOTE_FAILURE';
  id: string;
  error: string;
}

type DeleteNoteAction =
  | DeleteNotesActionFetching
  | DeleteNotesActionSuccess
  | DeleteNotesActionError;

export interface CreateNotesActionFetching {
  type: 'CREATE_NOTE_REQUEST';
  note: CreateNoteMutationVariables['input'];
  transactionId: string;
}

export interface CreateNotesActionSuccess {
  type: 'CREATE_NOTE_SUCCESS';
  note: CreateNoteMutation['createNote'];
  transactionId: string;
}

export interface CreateNotesActionError {
  type: 'CREATE_NOTE_FAILURE';
  error: string;
  transactionId: string;
}

type CreateNoteAction =
  | CreateNotesActionFetching
  | CreateNotesActionSuccess
  | CreateNotesActionError;

export type NotesAction = GetNoteAction | DeleteNoteAction | CreateNoteAction;

interface Options {
  variables: GetCurrentUserNotesQueryVariables;
  forceReload: boolean;
}

export const fetchCurrentUserNotes = (options?: Options) => async (
  dispatch: ThunkDispatch<{}, {}, GetNoteAction>,
  getState: () => RootState,
) => {
  const state = getState();
  if (state.currentUserNotes.isFetching) {
    return;
  }
  if (!options?.forceReload) {
    if (state.currentUserNotes.fetched || state.currentUserNotes.error) {
      return;
    }
  }
  dispatch({
    type: 'GET_CURRENT_USER_NOTES_REQUEST',
    isFetching: true,
  });
  try {
    const { currentUserNotes } = await api.getCurrentUserNotes(
      options?.variables,
    );

    if (!currentUserNotes) {
      return dispatch({
        type: 'GET_CURRENT_USER_NOTES_FAILURE',
        error: 'No notes returned',
      });
    }
    dispatch({
      type: 'GET_CURRENT_USER_NOTES_SUCCESS',
      notes: {
        ...currentUserNotes,
        items: currentUserNotes.items.map(note => ({
          ...note,
          text: state.currentUser.aesPassphrase
            ? decrypt(note.text, state.currentUser.aesPassphrase)
            : note.text,
        })),
      },
      aesPassphrase: state.currentUser.aesPassphrase,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'GET_CURRENT_USER_NOTES_FAILURE',
      error,
    });
  }
};

export const deleteNote = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, DeleteNoteAction>,
) => {
  dispatch({ type: 'DELETE_NOTE_REQUEST', id });
  try {
    const { deleteNote } = await api.deleteNote({ id });
    dispatch({
      type: 'DELETE_NOTE_SUCCESS',
      id: deleteNote.id,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'DELETE_NOTE_FAILURE',
      id,
      error,
    });
  }
};
export const createNote = (
  note: CreateNoteMutationVariables['input'],
) => async (
  dispatch: ThunkDispatch<{}, {}, CreateNoteAction>,
  getState: () => RootState,
  ) => {
    const state = getState();
    const transactionId =
      new Date().valueOf().toString() +
      '-' +
      CryptoJS.lib.WordArray.random(128 / 8).toString();

    dispatch({ type: 'CREATE_NOTE_REQUEST', note, transactionId });
    const { aesPassphrase } = state.currentUser
    if (!aesPassphrase) {
      dispatch({
        type: 'CREATE_NOTE_FAILURE',
        transactionId,
        error: 'No aes passphrase in state',
      });
      return;
    }
    try {
      const { createNote } = await api.createNote({
        input: {
          ...note,
          text: encrypt(note.text, aesPassphrase),
          tags: note.tags.map(tag => ({ id: tag.id }))
        },
      });
      dispatch({
        type: 'CREATE_NOTE_SUCCESS',
        note: { ...createNote, text: decrypt(createNote.text, aesPassphrase) },
        transactionId,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'CREATE_NOTE_FAILURE',
        transactionId,
        error,
      });
    }
  };
