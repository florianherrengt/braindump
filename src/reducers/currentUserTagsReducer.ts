import { TagsAction } from '../actions';
import { Tag } from '../helpers/';

interface CurrentUserTagsState {
  tags: Tag[];
  isFetching: boolean;
  error?: string;
  fetched: boolean;
}

const defaultState: CurrentUserTagsState = {
  tags: [],
  isFetching: false,
  fetched: false,
};

export const currentUserTags = (
  state: CurrentUserTagsState = defaultState,
  action: TagsAction,
): CurrentUserTagsState => {
  switch (action.type) {
    case 'GET_CURRENT_USER_TAGS_REQUEST':
      return { ...state, ...action };
    case 'GET_CURRENT_USER_TAGS_SUCCESS':
      return { ...state, tags: action.tags, fetched: true, isFetching: false };
    case 'GET_CURRENT_USER_TAGS_FAILURE':
      return { ...state, ...action, fetched: true, isFetching: false };
    default:
      return state;
  }
};
