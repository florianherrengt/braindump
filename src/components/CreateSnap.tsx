import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import styled from "styled-components";

interface CreateNoteProps {
  onSubmit(input: { text: string }): any;
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 }
];
const Container = styled.div`
  width: 100%;
`;

const CreateNote = (props: CreateNoteProps) => {
  const [text, setText] = useState<string>("");
  return (
    <Container>
      <form
        onSubmit={event => {
          event.preventDefault();
          props.onSubmit({ text });
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <TextField
              onChange={({ target: { value } }) => setText(value)}
              style={{ width: "100%" }}
              multiline
              variant="outlined"
              placeholder="What's in your mind?"
            />
            <div style={{ display: "flex", marginTop: 20 }}>
              <Autocomplete
                multiple
                style={{ flex: 1 }}
                options={top100Films.map(option => option.title)}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={params => (
                  <TextField
                    style={{ border: "none" }}
                    variant="outlined"
                    {...params}
                    placeholder="Tags"
                  />
                )}
              />
              <Button type="submit">Save</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
};

export { CreateNote };
