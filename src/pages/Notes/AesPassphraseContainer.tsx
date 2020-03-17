import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserNotes, setAesPassphrase } from '../../actions';
import { AesPassphraseForm } from '../../components';
import { RootState } from '../../reducers';
import { useHistory } from 'react-router';
import { routerUri } from '../../config';

interface AesPassphraseContainerProps {
  submitLabel?: string;
}

export const AesPassphraseContainer: React.SFC<AesPassphraseContainerProps> = props => {
  const dispatch = useDispatch();
  dispatch(fetchCurrentUserNotes());
  const currentUserNotes = useSelector(
    (state: RootState) => state.currentUserNotes,
  );

  if (currentUserNotes.isFetching) {
    return <CircularProgress />;
  }
  return (
    <AesPassphraseForm
      submitLabel={props.submitLabel}
      testNote={currentUserNotes.notes[0].text}
      onSubmit={({ passphrase, shouldSaveToLocalstorage }) => {
        dispatch(setAesPassphrase(passphrase, shouldSaveToLocalstorage));
        window.location.replace(routerUri.notes);
      }}
    />
  );
};
