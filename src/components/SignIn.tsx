import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { LineSpacer } from "./LineSpacer";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { routerUri } from "../config/routerUri";

interface SignInProps {
  onSubmit(input: { username: string; password: string }): void;
}

const Container = styled.div`
  width: 300px;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: block;
  width: 100%;
  height: 50vh;
`;

const CustomTextField = styled(TextField)`
  width: 100%;
`;

const SignInButton = styled(Button)`
  width: 100%;
`;

const SmallPrintTypography = styled(Typography)`
  text-align: center;
`;

export const SignIn = (props: SignInProps) => {
  return (
    <Container>
      <Form>
        <div>
          <CustomTextField variant="outlined" label="Username" />
        </div>
        <LineSpacer />
        <div>
          <CustomTextField variant="outlined" label="Password" />
        </div>
        <LineSpacer />
        <SignInButton
          variant="outlined"
          onClick={() => props.onSubmit({ username: "test", password: "123" })}
        >
          Sign In
        </SignInButton>
      </Form>
    </Container>
  );
};
