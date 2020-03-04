import React from "react";
import { Note, NoteCard } from "./NoteCard";

import { LoadingOrError } from "./LoadingOrError";
import { LineSpacer } from "./LineSpacer";

interface NoteListProps {
  notes?: Note[];
  loading: boolean;
  errors?: string[];
}

export const NoteList: React.SFC<NoteListProps> = props => {
  return (
    <LoadingOrError errors={props.errors} loading={props.loading}>
      <div>
        {props.notes &&
          props.notes.map(note => (
            <div key={note.id}>
              <NoteCard note={note} />
              <LineSpacer />
            </div>
          ))}
      </div>
    </LoadingOrError>
  );
};
