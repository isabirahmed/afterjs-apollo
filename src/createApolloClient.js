import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink
} from "apollo-boost";
import { withClientState } from "apollo-link-state";
import fetch from "node-fetch";

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.

  const middlewareLink = new ApolloLink((operation, forward) => {
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      const authorizationHeader = token ? `Bearer ${token}` : null;
      operation.setContext({
        headers: {
          authorization: authorizationHeader
        }
      });
    }
    return forward(operation);
  });

  const httpLinkWithAuthToken = middlewareLink.concat(
    new HttpLink({
      uri: "https://metaphysics-production.artsy.net",
      fetch: fetch
    })
  );

  const cache = new InMemoryCache();

  if (typeof window !== "undefined") {
    cache.restore(window.__APOLLO_STATE__);
  }

  const clientState = withClientState({
    cache,
    defaults: initialState,
    resolvers: {}
  });

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([clientState, httpLinkWithAuthToken]),
    cache: cache
  });
}
