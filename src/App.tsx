import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/Layout";
import { CreateSnap } from "./components/CreateSnap";
import SimpleCard from "./components/Snap";
import { LineSpacer } from "./components/LineSpacer";
import CryptoJS from "crypto-js";
import ApolloClient from "apollo-client";

import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SignUpPage } from "./pages/SignUp";
import { PrivacyPage } from "./pages/Privacy";
import { TnCPage } from "./pages/TnC";
import { routerUri } from "./config/routerUri";

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
            <Route path="/">
              <Layout>
                <LineSpacer />
                <CreateSnap />
                <LineSpacer />
                <SimpleCard />
              </Layout>
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
