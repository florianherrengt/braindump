import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useHistory } from "react-router-dom";
import { SignIn } from "../components/SignIn";
import { routerUri } from "../config";

const SIGN_UP_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input)
  }
`;

export const SignInPage = () => {
  const [signInMutation, { error, loading }] = useMutation(SIGN_UP_MUTATION);
  const history = useHistory();

  return (
    <SignIn
      errors={error?.graphQLErrors.map(e => e.message)}
      loading={loading}
      onSubmit={async input => {
        try {
          const { data } = await signInMutation({
            variables: { input }
          });
          if (error) {
            return;
          }

          localStorage.setItem("token", data.signIn);
          window.location.replace(routerUri.notes);
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
};
