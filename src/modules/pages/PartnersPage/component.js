import React from "react";

const PartnersPage = props => {
  const { partnersQuery } = props;
  const { loading, error, partners } = partnersQuery;

  return (
    <div>
      <h1>Welcome to Razzle + AfterJS + Apollo.</h1>
      <button onClick={() => props.history.goBack()}>Back</button>
      {error && <div>Error! {error.message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {partners.map(partner => (
            <li key={partner.id}>{partner.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PartnersPage;
