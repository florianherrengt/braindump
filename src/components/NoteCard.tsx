import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { LineSpacer } from "./LineSpacer";
import { Tag } from "./SelectTag";

export interface Note {
  id: string;
  text: string;
  tags?: Tag[];
}

interface NoteCardProps {
  note: Note;
}

// using number instead of boolean because react complains about it otherwise...
const Container = styled(Card)<{ optimistic: number }>`
  position: relative;
  opacity: ${props => (props.optimistic ? 0.5 : 1)};
`;

const Spinner = styled(CircularProgress)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const TypographyEllipsis = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const NoteCard: React.SFC<NoteCardProps> = props => {
  const [expanded, setExpanded] = useState(false);
  const isOptimistic = props.note.id.includes("optimistic");
  const text = decodeURIComponent(props.note.text);
  return (
    <Container variant="outlined" optimistic={isOptimistic ? 1 : 0}>
      <CardContent onClick={() => setExpanded(!expanded)}>
        {isOptimistic && <Spinner size={10} />}
        {expanded ? (
          <Typography variant="body1">{text}</Typography>
        ) : (
          <TypographyEllipsis variant="body1">{text}</TypographyEllipsis>
        )}
        <LineSpacer />
        {props.note.tags?.map(
          tag =>
            tag && (
              <Chip
                key={tag.id}
                variant="outlined"
                size="small"
                label={tag.label}
              />
            )
        )}
      </CardContent>
    </Container>
  );
};
