import React from "react";
import { hydrate } from "react-dom";
import BrowserRouter from "react-router-dom/BrowserRouter";
import { ensureReady, After } from "@jaredpalmer/after";
import { ApolloProvider } from "react-apollo";

import routes from "routes";
import createApolloClient from "createApolloClient";

const initialState = {
  userDetailsLocal: {
    __typename: "UserDetailsLocal",
    _id: null,
    userId: null
  }
};

const client = createApolloClient(initialState, true);

// Client
ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <After data={data} routes={routes} client={client} />
      </ApolloProvider>
    </BrowserRouter>,

    document.getElementById("root")
  )
);

if (module.hot) {
  module.hot.accept();
}
