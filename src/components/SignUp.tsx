import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { LineSpacer } from "./LineSpacer";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { routerUri } from "../config/routerUri";
import throttle from "lodash.throttle";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

interface SignUpProps {
  usernameExists: boolean;
  loading: boolean;
  onUsernameChange(username: string): void;
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

const SignUpButton = styled(Button)`
  width: 100%;
`;

const SmallPrintTypography = styled(Typography)`
  text-align: center;
`;

export const SignUp = (props: SignUpProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onUsernameChange = useRef(
    throttle((newUsername: string) => {
      props.onUsernameChange(newUsername);
    }, 200)
  );

  useEffect(() => onUsernameChange.current(username), [username]);
  return (
    <Container>
      <Form>
        <div>
          <CustomTextField
            onChange={({ target }) => {
              setUsername(target.value);
            }}
            InputProps={{
              endAdornment: props.loading && <CircularProgress size={20} />
            }}
            error={props.usernameExists}
            helperText={props.usernameExists && "Username already exists"}
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
        <SignUpButton
          variant="outlined"
          onClick={() => props.onSubmit({ username, password })}
        >
          Sign Up
        </SignUpButton>
        <LineSpacer />
        <SmallPrintTypography style={{ textAlign: "center" }} variant="body2">
          By creating an account, you are agreeing to our{" "}
          <Link to={routerUri.termAndConditions}>Terms of Service</Link> and{" "}
          <Link to={routerUri.privacy}>Privacy Policy</Link>.
        </SmallPrintTypography>
        <div>
          <LineSpacer />
          <SmallPrintTypography variant="body2">
            Already have an account?
          </SmallPrintTypography>
          <SmallPrintTypography variant="body2">
            <Link to={routerUri.signIn}>Sign in</Link>
          </SmallPrintTypography>
        </div>
      </Form>
    </Container>
  );
};
