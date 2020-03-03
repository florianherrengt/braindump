import React from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

import styled from "styled-components";

interface CreateSnapProps {}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 }
];
const Container = styled.div`
  width: 100%;
`;

const CreateSnap = (props: CreateSnapProps) => {
  return (
    <Container>
      <Card variant="outlined">
        <CardContent>
          <TextField
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
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export { CreateSnap };
