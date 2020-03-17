import { combineReducers } from 'redux';
import { currentUser } from './currentUserReducer';
import { currentUserNotes } from './currentUserNotesReducer';
import { currentUserTags } from './currentUserTagsReducer';

export const rootReducer = combineReducers({
  currentUser,
  currentUserNotes,
  currentUserTags,
});

export type RootState = ReturnType<typeof rootReducer>;
