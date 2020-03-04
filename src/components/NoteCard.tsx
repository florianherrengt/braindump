import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import CardActions from "@material-ui/core/CardActions";

interface NoteCardProps {
  note: { id: string; text: string };
}

const Container = styled.div<{ optimistic: boolean }>`
  position: relative;
  opacity: ${props => (props.optimistic ? 0.5 : 1)};
`;

const Spinner = styled(CircularProgress)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export const NoteCard: React.SFC<NoteCardProps> = props => {
  const isOptimistic = props.note.id.includes("optimistic");
  return (
    <Container optimistic={isOptimistic}>
      <Card variant="outlined">
        <CardContent>
          {isOptimistic && <Spinner size={10} />}
          <Typography variant="body1" component="p">
            {props.note.text}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
