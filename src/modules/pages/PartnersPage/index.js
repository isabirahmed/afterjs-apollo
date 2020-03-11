import gql from "graphql-tag";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";

import DetailPage from "./component";

const GET_PARTNERS = gql`
  {
    partners {
      id
      name
    }
  }
`;
export default compose(graphql(GET_PARTNERS, { name: "partnersQuery" }))(
  DetailPage
);

// export default compose(graphql(GET_POSTS, { name: "postsQuery" }))(Homepage);
