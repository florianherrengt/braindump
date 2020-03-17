import { useQuery, useMutation } from '@apollo/react-hooks';
import React from 'react';
import { useLocation } from 'react-router';
import { LoadingOrError, NoteList } from '../../components';
import { decrypt } from '../../helpers';
import { GET_CURRENT_USER_NOTES, GET_CURRENT_USER_TAGS } from '../../queries';
import gql from 'graphql-tag';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import {
  fetchCurrentUserNotes,
  fetchCurrentUserTags,
  deleteNote,
} from '../../actions';
import { CircularProgress, Button } from '@material-ui/core';

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

interface NoteListContainerProps {}

export const decrypNotes = (
  aesPassphrase: string,
  encryptedNotes?: any,
  decryptedTags?: any,
): any[] => {
  return (
    aesPassphrase &&
    encryptedNotes &&
    encryptedNotes.map((note: any) => {
      const decryptedNotes = {
        ...note,
        text: decrypt(note.text, aesPassphrase),
        tags:
          (note.tags &&
            note.tags.length &&
            decryptedTags &&
            note.tags.map(
              (tag: any) =>
                decryptedTags.find((dtag: any) => dtag.id === tag.id) || null,
            )) ||
          [],
      };
      return decryptedNotes;
    })
  );
};

export const decryptTags = (
  aesPassphrase: string,
  encryptedTags?: any,
): any[] => {
  return (
    aesPassphrase &&
    encryptedTags &&
    encryptedTags.map((tag: any) => {
      return { ...tag, label: decrypt(tag.label, aesPassphrase) };
    })
  );
};

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
  dispatch(fetchCurrentUserNotes());
  dispatch(fetchCurrentUserTags());
  const currentUserNotes = useSelector(
    (state: RootState) => state.currentUserNotes,
  );
  const currentUserTags = useSelector(
    (state: RootState) => state.currentUserTags,
  );

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
            notes={currentUserNotes.notes.map(note => {
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
  // const location = useLocation();
  // const searchFilter = new URLSearchParams(location.search).get('search');

  // const getCurrentUserTags = useQuery(GET_CURRENT_USER_TAGS);

  // const currentUserTags = getCurrentUserTags.data?.currentUserTags;

  // const decryptedTags = decryptTags(props.aesPassphrase, currentUserTags) || [];

  // const tagsIdFilter = getTagsIdFromSearch(decryptedTags, searchFilter);

  // const getCurrentUserNotesResults = useQuery(GET_CURRENT_USER_NOTES, {
  //   variables: { tagsId: tagsIdFilter, limit: tagsIdFilter.length ? 100 : 10 },
  // });
  // // const currentUserNotes = getCurrentUserNotesResults.data?.currentUserNotes.items;
  // const decryptedNotes = decrypNotes(props.aesPassphrase, currentUserNotes, decryptedTags) || [];
  // const hasMoreNotes = getCurrentUserNotesResults.data?.currentUserNotes.hasMore;

  // const [deleteNoteMutation] = useMutation(DELETE_NOTE_MUTATION, {
  //   update(cache, { data: { deleteNote } }) {
  //     cache.writeQuery({
  //       query: GET_CURRENT_USER_NOTES,
  //       data: {
  //         currentUserNotes: {
  //           items: currentUserNotes && currentUserNotes.filter((note: any) => note.id !== deleteNote.id),
  //           hasMore: hasMoreNotes,
  //         },
  //       },
  //     });
  //   },
  // });
  // const fetchMoreNotes = async () => {
  //   if (!hasMoreNotes && !getCurrentUserNotesResults.loading) {
  //     return;
  //   }

  //   await getCurrentUserNotesResults.fetchMore({
  //     variables: {
  //       skip: getCurrentUserNotesResults.data.currentUserNotes.items.length,
  //       limit: 100,
  //     },
  //     updateQuery: (prev: any, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev;
  //       return {
  //         ...prev,
  //         currentUserNotes: {
  //           items: [...prev.currentUserNotes.items, ...fetchMoreResult.currentUserNotes.items],
  //           hasMore: fetchMoreResult.currentUserNotes.hasMore,
  //         },
  //       };
  //     },
  //   });
  // };

  // /*
  // if (
  //   decryptedNotes &&
  //   decryptedNotes.length &&
  //   !decryptedNotes[0].text &&
  //   !decryptedNotes.map(({ text }: any) => text).length
  // ) {
  //   localStorage.removeItem('aesPassphrase');
  //   window.location.reload();
  // }
  //  */
  // return (
  //   <LoadingOrError results={getCurrentUserNotesResults}>
  //     <NoteList
  //       loadMore={() => {
  //         fetchMoreNotes();
  //       }}
  //       onEditClick={noteId => {
  //         console.log(noteId);
  //       }}
  //       onDeleteClick={noteId => {
  //         console.log(noteId);
  //         deleteNoteMutation({ variables: { id: noteId } });
  //       }}
  //       notes={decryptedNotes || currentUserNotes}
  //     />
  //   </LoadingOrError>
  // );
};
