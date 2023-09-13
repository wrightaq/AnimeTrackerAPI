import React from 'react';
import { useQuery, gql } from "@apollo/client";


const FeedData = (QUERY) => {
  const { loading, error, data, fetchMore } = useQuery(QUERY, {
    variables: {
      offset: 0,
      limit: 10
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <button
      entries={data.feed || []}
      onLoadMore={() => fetchMore({
        variables: {
          offset: data.feed.length
        },
      })}
    > more </button>
  );
}

export default FeedData;