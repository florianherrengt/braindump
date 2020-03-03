import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { LineSpacer } from "./LineSpacer";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { routerUri } from "../config/routerUri";
import red from "@material-ui/core/colors/red";

interface SignInProps {
  errors?: string[];
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

const ErrorTypography = styled(Typography)`
  text-align: center;
  color: ${red[400]};
`;

export const SignIn = (props: SignInProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Container>
      <Form
        onSubmit={event => {
          event.preventDefault();
          props.onSubmit({ username, password });
        }}
      >
        <div>
          <CustomTextField
            onChange={({ target }) => setUsername(target.value)}
            variant="outlined"
            label="Username"
          />
        </div>
        <LineSpacer />
        <div>
          <CustomTextField
            onChange={({ target }) => setPassword(target.value)}
            variant="outlined"
            label="Password"
            type="password"
          />
        </div>
        <LineSpacer />
        {props.errors &&
          props.errors.map(error => (
            <div key={btoa(error)}>
              <ErrorTypography>{error}</ErrorTypography>
              <LineSpacer />
            </div>
          ))}
        <SignInButton type="submit" variant="outlined">
          Sign In
        </SignInButton>
        <LineSpacer />
        <SmallPrintTypography variant="body2">
          Don't have an account yet?
        </SmallPrintTypography>
        <SmallPrintTypography variant="body2">
          <Link to={routerUri.signUp}>Create account</Link>
        </SmallPrintTypography>
      </Form>
    </Container>
  );
};
