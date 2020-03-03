import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useHistory } from "react-router-dom";
import { SignIn } from "../components/SignIn";

const SIGN_UP_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input)
  }
`;

export const SignInPage = () => {
  const [SignInMutation, { error }] = useMutation(SIGN_UP_MUTATION);
  const history = useHistory();

  return (
    <SignIn
      errors={error?.graphQLErrors.map(e => e.message)}
      onSubmit={async input => {
        try {
          const { data } = await SignInMutation({
            variables: { input }
          });
          if (error) {
            return;
          }
          localStorage.setItem("token", data.SignIn);
          history.push("/");
        } catch (error) {
          // console.log(error);
        }
      }}
    />
  );
};
