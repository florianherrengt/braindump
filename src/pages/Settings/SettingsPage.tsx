import React from 'react';
import { LineSpacer } from '../../components';
import { AesPassphraseContainer } from '../Notes/AesPassphraseContainer';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';

interface SettingsPageProps {}

const DangerButton = styled(Button)`
  width: 100%;
`;

export const SettingsPage: React.SFC<SettingsPageProps> = props => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('aesPassphrase');
    window.location.reload();
  };
  return (
    <div>
      <LineSpacer />
      <AesPassphraseContainer submitLabel='Save' />
      <LineSpacer />
      <Card>
        <CardContent>
          <LineSpacer />
          <DangerButton onClick={logout} variant='outlined' color='secondary'>
            Logout
          </DangerButton>
          {/*
          <LineSpacer />
                    <DangerButton variant="outlined" color="secondary">
            Delete account
          </DangerButton>
            */}
        </CardContent>
      </Card>
    </div>
  );
};
