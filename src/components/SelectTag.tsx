import { Chip, CircularProgress, TextField } from "@material-ui/core/";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import React from "react";
import styled from "styled-components";

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

const filter = createFilterOptions();

export const SelectTag: React.SFC<SelectTagProps> = props => {
  return (
    <Autocomplete
      style={{ flex: 1 }}
      multiple
      disabled={props.tags.loading || !!props.tags.errors}
      autoHighlight
      selectOnFocus
      value={props.value}
      options={props.tags.data || []}
      onChange={(_, newValue: Tag[]) => {
        props.onChange(
          newValue.map(value => {
            if (value.id === "new") {
              const label = value.label.match(/(["])((?:\\\1|.)*?)\1/);
              value.label = label ? label.pop() || "" : value.label;
            }
            return value;
          })
        );
      }}
      renderOption={option => option.label}
      filterOptions={(options, params) => {
        const filtered = filter(options, params) as Tag[];

        if (params.inputValue !== "") {
          filtered.push({
            id: "new",
            label: `Create "${params.inputValue}"`
          });
        }

        return filtered;
      }}
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
              if (event.key === "Enter") {
                if (event.ctrlKey || event.altKey || event.metaKey) {
                  props.onSubmit && props.onSubmit();
                }
              }
            }}
            variant="outlined"
            {...params}
            placeholder={props.tags.loading ? "Loading..." : "Tags"}
          />
        </InputContainer>
      )}
    />
  );
};
