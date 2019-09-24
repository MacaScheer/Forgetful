import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { HashRouter } from "react-router-dom";
import Mutations from "../src/graphql/mutations";
const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

// const httpLink = createHttpLink({
//   uri: "http://localhost:5000/graphql",
//   headers: {
//     authorization: localStorage.getItem("auth-token")
//   }
// });

let uri;
if (process.env.NODE_ENV === "production") {
  uri = `/graphql`;
} else {
  uri = "http://localhost:5000/graphql";
}

const httpLink = createHttpLink({
  uri,
  headers: {
    // heroku can get a little buggy with headers and
    // localStorage so we'll just ensure a value is always in the header
    authorization: localStorage.getItem("auth-token") || ""
  }
});
const token = localStorage.getItem("auth-token");

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    searchResults: []
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache ,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
} else {
  cache.writeData({
    data: {
      isLoggedIn: false
    }
  });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
