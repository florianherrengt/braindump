import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

interface CreateTagFormProps {
  onSubmit(label: string): void;
}

export const CreateTagForm: React.SFC<CreateTagFormProps> = props => {
  const [label, setLabel] = useState<string>('');
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.onSubmit(label);
        setLabel('');
      }}
      style={{ display: 'flex' }}
    >
      <TextField
        autoFocus
        onChange={event => setLabel(event.target.value)}
        style={{ flex: 1 }}
        variant='outlined'
        placeholder='New tag'
      />
      <Button type='submit'>Add</Button>
    </form>
  );
};
