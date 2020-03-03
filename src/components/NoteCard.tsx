import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface NoteCardProps {
  note: { id: string; text: string };
}

export const NoteCard: React.SFC<NoteCardProps> = props => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" component="p">
          {props.note.text}
        </Typography>
        <div>{props.note.id.includes("optimistic") && "loading"}</div>
      </CardContent>
    </Card>
  );
};
