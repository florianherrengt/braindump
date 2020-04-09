// import { SnackbarProvider } from 'notistack';
import { hot } from 'react-hot-loader/root';
import React, { Fragment, lazy, Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { AppRouter } from './AppRouter';
import { localStorageKeys } from './config';
import { configureStore } from './store';

// const Notifier = lazy(() => import('./pages/Notifier'));

const store = configureStore({
    currentUser: {
        aesPassphrase:
            localStorage.getItem(localStorageKeys.aesPassphrase) || undefined,
        fetched: false,
        isFetching: false,
    },
});

export const App: React.SFC<{}> = () => {
    return (
        <div className='App'>
            <ReduxProvider store={store}>
                {/* <SnackbarProvider> */}
                <Fragment>
                    <Suspense fallback={<div />}>{/* <Notifier /> */}</Suspense>
                    <AppRouter />
                </Fragment>
                {/* </SnackbarProvider> */}
            </ReduxProvider>
        </div>
    );
};

export default hot(App);
