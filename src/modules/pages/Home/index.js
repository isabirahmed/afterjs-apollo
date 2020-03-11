import gql from "graphql-tag";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";

import Homepage from "./component";

const GET_ARTISTS = gql`
  {
    popular_artists {
      artists {
        id
        name
      }
    }
  }
`;
export default compose(graphql(GET_ARTISTS, { name: "artistsQuery" }))(
  Homepage
);

// export default compose(graphql(GET_POSTS, { name: "postsQuery" }))(Homepage);
