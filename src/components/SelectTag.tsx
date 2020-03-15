import { Chip, CircularProgress, TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import styled from 'styled-components';

export interface Tag {
  id: string;
  label: string;
}

interface SelectTagProps {
  tags: {
    errors?: string[];
    loading: boolean;
    data?: Tag[];
  };
  value: Tag[];
  onSubmit?(): void;
  onChange(tags: Tag[]): void;
}

const InputContainer = styled.div`
  position: relative;
`;

const Spinner = styled(CircularProgress)`
  position: absolute;

  right: 40px;

  top: 17px;
`;

export const SelectTag: React.SFC<SelectTagProps> = props => {
  return (
    <Autocomplete
      style={{ flex: 1 }}
      multiple
      disabled={props.tags.loading || !!props.tags.errors}
      autoHighlight
      // selectOnFocus
      value={props.value}
      options={props.tags.data || []}
      // autoSelect
      onChange={(event, newValues: Tag[]) => {
        props.onChange(newValues);
      }}
      noOptionsText={!props.tags.data?.length ? "You haven't created any tags yet." : 'Tag not found.'}
      renderOption={option => option.label}
      renderTags={(value: Tag[], getTagProps) => {
        return value.map((option, index) => {
          return <Chip label={option.label} {...getTagProps({ index })} />;
        });
      }}
      renderInput={params => (
        <InputContainer>
          {props.tags.loading && <Spinner size={20} />}
          <TextField
            onKeyDown={event => {
              if (event.key === 'Enter') {
                if (event.ctrlKey || event.altKey || event.metaKey) {
                  props.onSubmit && props.onSubmit();
                }
              }
            }}
            variant='outlined'
            {...params}
            placeholder={props.tags.loading ? 'Loading...' : 'Tags'}
          />
        </InputContainer>
      )}
    />
  );
};
