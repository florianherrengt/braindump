import React from "react";
import { LineSpacer } from "./LineSpacer";
import { Note, NoteCard } from "./NoteCard";

interface NoteListProps {
  notes?: Note[];
}

export const NoteList: React.SFC<NoteListProps> = props => {
  return (
    <div>
      {props.notes &&
        props.notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} />
            <LineSpacer />
          </div>
        ))}
    </div>
  );
};
