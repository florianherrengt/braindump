import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import throttle from 'lodash.throttle';
import React, { useState } from 'react';
import { SignUp } from '../components/SignUp';
import { routerUri } from '../config';
import { LineSpacer } from '../components/LineSpacer';

const GET_USER_BY_ID = gql`
  query userExists($username: String!) {
    userExists(username: $username)
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input)
  }
`;

export const SignUpPage = () => {
  const [username, setUsername] = useState<string>('');
  const getUserExistsResults = useQuery(GET_USER_BY_ID, {
    variables: { username },
  });
  const [signUpMutation] = useMutation(SIGN_UP_MUTATION);

  if (getUserExistsResults.error) {
    return <div>{getUserExistsResults.error.message}</div>;
  }

  return (
    <div>
      <LineSpacer />
      <SignUp
        loading={getUserExistsResults.loading}
        usernameExists={!!(getUserExistsResults.data && getUserExistsResults.data.userExists)}
        onUsernameChange={throttle(username => {
          setUsername(username);
        }, 2000)}
        onSubmit={async input => {
          try {
            const { data, errors } = await signUpMutation({
              variables: { input },
            });
            if (errors) {
              console.error(errors);
              alert(errors.map(e => e.message).join(' '));
            }
            localStorage.setItem('token', data.signUp);
            window.location.replace(routerUri.notes);
          } catch (error) {
            alert(error);
          }
        }}
      />
    </div>
  );
};
