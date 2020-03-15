import { Button, Card, CardContent, CardActions, TextField, Tooltip, useMediaQuery } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { SelectTag, Tag } from './SelectTag';

interface CreateNoteProps {
  userTags: {
    errors?: string[];
    loading: boolean;
    data?: Tag[];
  };
  onDiscard?(): void;
  onSubmit(input: { text: string; tags: Tag[] }): any;
}

const Container = styled.div`
  width: 100%;
`;

const CreateNote = (props: CreateNoteProps) => {
  const isMobile = useMediaQuery('(max-width:450px)');
  const [text, setText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const location = useLocation();

  const reset = () => {
    setText('');
    setSelectedTags([]);
  };

  const submit = () => {
    if (!text) {
      return;
    }

    props.onSubmit({ text, tags: selectedTags });
    reset();
  };
  return (
    <Container>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (!text) {
            return;
          }
          submit();
        }}
      >
        <Card variant='outlined'>
          <CardContent>
            <TextField
              autoFocus={!new URLSearchParams(location.search).get('search')}
              onChange={({ target: { value } }) => setText(value)}
              value={text}
              style={{ width: '100%' }}
              multiline
              variant='outlined'
              placeholder="What's in your mind?"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  if (event.ctrlKey || event.altKey || event.metaKey) {
                    event.preventDefault();
                    submit();
                  }
                }
              }}
            />
            <div style={{ display: isMobile ? 'block' : 'flex', marginTop: 20 }}>
              <div style={{ flex: 1 }}>
                <SelectTag
                  value={selectedTags}
                  tags={props.userTags || []}
                  onSubmit={() => submit()}
                  onChange={tags => {
                    setSelectedTags(tags);
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardActions>
            <div style={{ flexGrow: 1 }} />
            <Button
              color='secondary'
              onClick={() => {
                props.onDiscard && props.onDiscard();
                reset();
              }}
            >
              Discard
            </Button>
            <Tooltip
              disableTouchListener
              enterDelay={0}
              title={`${navigator.platform.toLocaleLowerCase().includes('mac') ? 'Cmd' : 'Ctrl'} + Enter`}
              aria-label='save with Ctrl + Enter'
            >
              <Button type='submit'>Save</Button>
            </Tooltip>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};

export { CreateNote };
