import { NotesAction, CurrentUserActionSetAesPassphrase } from '../actions';
import { Note, Tag, decrypt } from '../helpers';
import CryptoJS from 'crypto-js';

export interface CurrentUserNotesState {
  notes: Array<
    Omit<Note, 'tags'> & {
      tags: Array<Pick<Tag, 'id'>>;
      isLoading: boolean;
      transactionId?: string;
    }
  >;
  isFetching: boolean;
  error?: string;
  fetched: boolean;
  hasMore: boolean;
}

const defaultState: CurrentUserNotesState = {
  notes: [],
  isFetching: false,
  fetched: false,
  hasMore: false,
};

export const currentUserNotes = (
  state: CurrentUserNotesState = defaultState,
  action: NotesAction | CurrentUserActionSetAesPassphrase,
): CurrentUserNotesState => {
  switch (action.type) {
    case 'SET_AES_PASSPHRASE':
      return {
        ...state,
        notes: state.notes.map(note => ({
          ...note,
          text: decrypt(note.text, action.user.aesPassphrase),
        })),
      };
    case 'GET_CURRENT_USER_NOTES_REQUEST':
      return { ...state, ...action, isFetching: true };
    case 'GET_CURRENT_USER_NOTES_SUCCESS':
      console.log('GET_CURRENT_USER_NOTES_SUCCESS');
      const notes = [
        ...state.notes,
        ...action.notes.items.map(note => ({
          ...note,
          isLoading: false,
        })),
      ];
      return {
        ...state,
        notes,
        hasMore: action.notes.hasMore,
        fetched: true,
        isFetching: false,
      };
    case 'GET_CURRENT_USER_NOTES_FAILURE':
      return { ...state, ...action, fetched: true, isFetching: false };

    case 'DELETE_NOTE_REQUEST':
      return {
        ...state,
        notes: state.notes.map(note => ({
          ...note,
          isLoading: note.id === action.id,
        })),
      };

    case 'DELETE_NOTE_SUCCESS':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.id),
      };

    case 'DELETE_NOTE_FAILURE':
      return {
        ...state,
        notes: state.notes.map(note => ({ ...note, isLoading: false })),
      };

    case 'CREATE_NOTE_REQUEST':
      return {
        ...state,
        notes: [
          {
            ...action.note,
            id: 'optimistic' + CryptoJS.MD5(action.note.text),
            createdAt: new Date(),
            isLoading: true,
            transactionId: action.transactionId,
          },
          ...state.notes,
        ],
      };

    case 'CREATE_NOTE_SUCCESS':
      return {
        ...state,
        notes: [
          { ...action.note, isLoading: false },
          ...state.notes.filter(
            note => note.transactionId !== action.transactionId,
          ),
        ],
      };

    case 'CREATE_NOTE_FAILURE':
      alert('Oops! Something wrong happened.');
      return {
        ...state,
        notes: state.notes.filter(
          note => note.transactionId !== action.transactionId,
        ),
      };

    default:
      return state;
  }
};
