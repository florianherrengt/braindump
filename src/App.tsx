import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import { routerUri } from "./config/routerUri";
import { PrivacyPage } from "./pages/Privacy";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
import { TnCPage } from "./pages/TnC";
import { NotesPage } from "./pages/Notes";

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(
//   "my message",
//   "secret key 123"
// ).toString();

// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'
// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:8080/api/graphql",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token")
    }
  })
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
            <PrivateRoute path="/">
              <NotesPage />
            </PrivateRoute>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
