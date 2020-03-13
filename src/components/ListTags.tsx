import React from 'react';
import { Tag } from './SelectTag';
import { Chip, Icon, Menu, MenuItem, Button, ListItemIcon, Typography, TextField } from '@material-ui/core';
import { EditTagModal } from './EditTagModal';

interface ListTagsProps {
  tags: Tag[];
  onUpdate(tag: Tag): void;
  onDelete(id: string): void;
}

// const TagChip: React.SFC<{ tag: Tag }> = ({ tag }) => {
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

//   return (

//   );
// };

export const ListTags: React.SFC<ListTagsProps> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [clickedTagId, setClickedTagId] = React.useState<null | string>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  return (
    <div>
      <EditTagModal
        open={isEditing}
        label={props.tags.find(t => t.id === clickedTagId)?.label || ''}
        onClose={() => setIsEditing(false)}
        onSubmit={label => {
          setIsEditing(false);
          props.onUpdate({
            ...props.tags.find(t => t.id === clickedTagId)!,
            label,
          });
        }}
      />
      {props.tags.map(tag => (
        <Chip
          key={tag.id}
          style={{ margin: '10px 10px 0 0' }}
          clickable
          label={tag.label}
          size='medium'
          deleteIcon={<Icon fontSize='small'>edit</Icon>}
          onClick={event => {
            setClickedTagId(tag.id);
            setAnchorEl(event.currentTarget);
          }}
          onDelete={event => {
            setClickedTagId(tag.id);
            setAnchorEl(event.currentTarget);
          }}
        />
      ))}
      <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setIsEditing(true);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <Icon fontSize='small'>edit</Icon>
          </ListItemIcon>
          <Typography variant='inherit'>Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (window.confirm('Are you sure? This tag will be removed from all your notes.')) {
              clickedTagId && props.onDelete(clickedTagId);
            }
            setClickedTagId(null);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <Icon fontSize='small'>delete</Icon>
          </ListItemIcon>
          <Typography variant='inherit'>Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
