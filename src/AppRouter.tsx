import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router';
import { routerUri } from './config';
import { history } from './helpers/history';
import { RootState } from './redux';
import { Card } from './components/Card/Card';

export const AppRouter = () => {
    const appState = useSelector((state: RootState) => state.appState);
    return (
        <Router history={history}>
            <Switch>
                <Route path='/' exact>
                    <Card />
                </Route>
            </Switch>
        </Router>
    );
};
