import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { SignUp } from "../components/SignUp";
import { useHistory } from "react-router-dom";
import throttle from "lodash.throttle";

const GET_USER_BY_ID = gql`
  query userById($username: String!) {
    userById(username: $username) {
      username
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input)
  }
`;

export const SignUpPage = () => {
  const [username, setUsername] = useState<string>("");
  const getUserByIdResults = useQuery(GET_USER_BY_ID, {
    variables: { username }
  });
  const [signUpMutation] = useMutation(SIGN_UP_MUTATION);
  const history = useHistory();

  if (getUserByIdResults.error) {
    return <div>{getUserByIdResults.error}</div>;
  }

  return (
    <SignUp
      loading={getUserByIdResults.loading}
      usernameExists={
        !!(getUserByIdResults.data && getUserByIdResults.data.userById)
      }
      onUsernameChange={throttle(username => {
        console.log("onUsernameChange");
        setUsername(username);
      }, 2000)}
      onSubmit={async input => {
        try {
          const { data, errors } = await signUpMutation({
            variables: { input }
          });
          if (errors) {
            console.error(errors);
            alert(errors.map(e => e.message).join(" "));
          }
          localStorage.setItem("token", data.signUp);
          history.push("/");
        } catch (error) {
          alert(error);
        }
      }}
    />
  );
};
