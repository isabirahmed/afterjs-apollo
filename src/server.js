import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import createApolloClient from "createApolloClient";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { render } from "@jaredpalmer/after";

import Document from "modules/common/Document";
import routes from "routes";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const initialState = {
  userDetailsLocal: {
    __typename: "UserDetailsLocal",
    _id: null,
    userId: null
  }
};

const client = createApolloClient(initialState, false);

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", async (req, res) => {
    const customRenderer = node => {
      const App = <ApolloProvider client={client}>{node}</ApolloProvider>;

      return getDataFromTree(App).then(() => {
        const initialApolloState = client.extract();
        const html = renderToString(App);

        // console.log(html);
        return { html, initialApolloState };
      });
    };

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
        document: Document
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
