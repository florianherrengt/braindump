import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, fetchCurrentUserNotes } from '../../actions';
import { NoteList } from '../../components';
import { RootState } from '../../reducers';

interface NoteListContainerProps {}

export const getTagsIdFromSearch = (
  decryptedTags: any[],
  searchFilter?: string | null,
): any[] => {
  if (!searchFilter) {
    return [];
  }
  const searchFilterTags = searchFilter
    ? decodeURIComponent(searchFilter || '')
        .split(',')
        .map(word => word.trim())
    : [];
  const tagsIdFilter = decryptedTags
    ? decryptedTags
        .filter((tag: any) => searchFilterTags.includes(tag.label))
        .map((tag: any) => tag.id)
    : [];

  return tagsIdFilter;
};

export const NoteListContainer: React.SFC<NoteListContainerProps> = props => {
  const dispatch = useDispatch();

  const currentUserNotes = useSelector(
    (state: RootState) => state.currentUserNotes,
  );
  const currentUserTags = useSelector(
    (state: RootState) => state.currentUserTags,
  );

  const searchNotes = useSelector((state: RootState) => state.searchNotes);

  const displayedNotes = searchNotes.searchValue
    ? searchNotes
    : currentUserNotes;

  const loadMore = () => {
    if (!currentUserNotes.isFetching && currentUserNotes.hasMore) {
      dispatch(
        fetchCurrentUserNotes({
          forceReload: true,
          variables: { limit: 100, skip: currentUserNotes.notes.length },
        }),
      );
    }
  };

  return (
    <div>
      <div>
        {
          <NoteList
            onEditClick={noteId => {
              console.log(noteId);
            }}
            onDeleteClick={noteId => {
              dispatch(deleteNote(noteId));
            }}
            notes={displayedNotes.notes.map(note => {
              const tags = note.tags
                .map(
                  tag =>
                    currentUserTags.tags.find(
                      userTag => userTag.id === tag.id,
                    )!,
                )
                .filter(t => t);

              return {
                note,
                tags: tags.length ? tags : [],
              };
            })}
          />
        }
      </div>
      {(currentUserNotes.isFetching || currentUserTags.isFetching) && (
        <CircularProgress />
      )}
      {!currentUserNotes.isFetching && currentUserNotes.hasMore && (
        <div>
          <Button onClick={loadMore} style={{ padding: 30 }} fullWidth>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};
