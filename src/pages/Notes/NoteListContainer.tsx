import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { LoadingOrError, NoteList } from "../../components";
import { decrypt } from "../../helpers";
import { GET_CURRENT_USER_NOTES, GET_CURRENT_USER_TAGS } from "../../queries";
import { useLocation } from "react-router";

interface NoteListContainerProps {
  aesPassphrase: string;
}

export const NoteListContainer: React.SFC<NoteListContainerProps> = props => {
  const getCurrentUserNotesResults = useQuery(GET_CURRENT_USER_NOTES);
  const getCurrentUserTags = useQuery(GET_CURRENT_USER_TAGS);
  const currentUserNotes =
    getCurrentUserNotesResults.data?.currentUserNotes.items;
  const hasMoreNotes =
    getCurrentUserNotesResults.data?.currentUserNotes.hasMore;
  const currentUserTags = getCurrentUserTags.data?.currentUserTags;

  const fetchMoreNotes = () => {
    if (!hasMoreNotes) {
      return;
    }
    getCurrentUserNotesResults.fetchMore({
      variables: {
        skip: getCurrentUserNotesResults.data.currentUserNotes.items.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          currentUserNotes: {
            items: [
              ...prev.currentUserNotes.items,
              ...fetchMoreResult.currentUserNotes.items
            ],
            hasMore: fetchMoreResult.currentUserNotes.hasMore
          }
        });
      }
    });
  };

  const location = useLocation();
  const searchFilter = new URLSearchParams(location.search).get("search");
  const decryptedTags =
    props.aesPassphrase &&
    currentUserTags &&
    currentUserTags.map((tag: any) => {
      return { ...tag, label: decrypt(tag.label, props.aesPassphrase) };
    });

  const decryptedNotes =
    (props.aesPassphrase &&
      currentUserNotes &&
      currentUserNotes.map((note: any) => {
        const decryptedNotes = {
          ...note,
          text: decodeURIComponent(decrypt(note.text, props.aesPassphrase)),
          tags:
            (note.tags &&
              note.tags.length &&
              decryptedTags &&
              note.tags.map(
                (tag: any) =>
                  decryptedTags.find((dtag: any) => dtag.id === tag.id) || null
              )) ||
            []
        };
        return decryptedNotes;
      })) ||
    [];

  const notesToDisplay = searchFilter
    ? decryptedNotes.filter((note: any) =>
        note.tags.map((tag: any) => tag.label).includes(searchFilter)
      )
    : decryptedNotes;
  if (
    decryptedNotes &&
    decryptedNotes.lenght &&
    !decryptedNotes[0].text &&
    !decryptedNotes.map(({ text }: any) => text).lenght
  ) {
    localStorage.removeItem("aesPassphrase");
    window.location.reload();
  }
  return (
    <LoadingOrError results={getCurrentUserNotesResults}>
      <NoteList
        loadMore={() => {
          fetchMoreNotes();
        }}
        notes={notesToDisplay || currentUserNotes}
      />
    </LoadingOrError>
  );
};
