import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Card } from './components/Card/Card';
import { routerUri } from './config';
import { history } from './helpers/history';
import { SignInPage } from './pages';
import { RootState } from './redux';

export const AppRouter = () => {
    const appState = useSelector((state: RootState) => state.appState);
    return (
        <Router history={history}>
            <Switch>
                <Route path='/' exact>
                    <Card />
                </Route>
                <Route path={routerUri.signIn} component={SignInPage} />
            </Switch>
        </Router>
    );
};
