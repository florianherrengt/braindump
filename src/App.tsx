import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import { routerUri } from "./config/routerUri";
import { NotesPage } from "./pages/Notes";
import { PrivacyPage } from "./pages/Privacy";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
import { TnCPage } from "./pages/TnC";
import { ApolloLink } from "apollo-link";

import { onError } from "apollo-link-error";
import CryptoJS from "crypto-js";

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          window.location.replace(routerUri.signIn);
        }
      }
    }
  }
);
const httpLink = new HttpLink({
  uri: "http://localhost:8080/api/graphql",
  headers: {
    authorization: "Bearer " + localStorage.getItem("token")
  }
});

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache({ addTypename: false });

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, httpLink])
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path={routerUri.signUp}>
              <SignUpPage />
            </Route>
            <Route path={routerUri.privacy}>
              <PrivacyPage />
            </Route>
            <Route path={routerUri.termAndConditions}>
              <TnCPage />
            </Route>
            <Route path={routerUri.signIn}>
              <SignInPage />
            </Route>
            <PrivateRoute path="/notes">
              <NotesPage />
            </PrivateRoute>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
