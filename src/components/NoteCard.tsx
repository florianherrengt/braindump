import {
  Card,
  Menu,
  MenuItem,
  ListItemIcon,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { LineSpacer } from './LineSpacer';
import { Tag } from './SelectTag';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { formatDistance } from 'date-fns';

export interface Note {
  id: string;
  text: string;
  createdAt: string;
  tags?: Tag[];
}

interface NoteCardProps {
  note: Note;
  onEditClick(noteId: string): void;
  onDeleteClick(noteId: string): void;
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

const HeaderTypography = styled(Typography)`
  font-size: 12px;
  margin-bottom: 5px;
`;

export const NoteCard: React.SFC<NoteCardProps> = props => {
  const isOptimistic = props.note.id.includes('optimistic');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const text = decodeURIComponent(props.note.text);
  return (
    <Container variant='outlined' optimistic={isOptimistic ? 1 : 0}>
      <CardHeader
        title={
          <HeaderTypography>{formatDistance(new Date(props.note.createdAt), new Date()) + ' ago'}</HeaderTypography>
        }
        subheader={
          props.note.tags &&
          props.note.tags?.map(
            tag =>
              tag && <Chip key={tag.id} style={{ marginRight: 5 }} variant='outlined' size='small' label={tag.label} />,
          )
        }
        action={
          <IconButton onClick={event => setAnchorEl(event.currentTarget)} aria-label='note-more-actions'>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        {isOptimistic && <Spinner size={10} />}
        <Typography
          variant='body1'
          dangerouslySetInnerHTML={{
            __html: text.replace(/\n/gi, '<br />').trim(),
          }}
        />
      </CardContent>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            props.onEditClick(props.note.id);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            props.onDeleteClick(props.note.id);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Delete</Typography>
        </MenuItem>
      </Menu>
    </Container>
  );
};
