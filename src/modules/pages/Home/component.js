import React from "react";
import { Link } from "react-router-dom";

const App = props => {
  const { artistsQuery } = props;
  const { loading, error, popular_artists } = artistsQuery;

  return (
    <div>
      <h1>Welcome to Razzle + AfterJS + Apollo.</h1>
      <Link to="/partners">Partners</Link>
      {error && <div>Error! {error.message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {popular_artists.artists.map(artist => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
