import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities'
import App from './App';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const cache = new InMemoryCache({
  typePolicies: {
    Character: {
      fields: {
        media: {
          keyArgs: false,
          merge: true,
          edges: offsetLimitPagination()
        }
      }
    }
  },
});

// Supported in React 18+
const app = ReactDOM.createRoot(document.getElementById('app'));

app.render(
  <ApolloProvider client={client} cache={cache}>
    <App />
  </ApolloProvider>,
);


const inMemoryCacheOptions = {
  addTypename: true,
  typePolicies: {
    Repository: {
      fields: {
        releases: {
          keyArgs: false,
          merge(existing, incoming) {
            if (!incoming) return existing;
            if (!existing) return incoming;

            const { nodes, ...rest } = incoming;
            // We only need to merge the nodes array.
            // The rest of the fields (pagination) should always be overwritten by incoming
            let result = rest;
            result.nodes = [...existing.nodes, ...nodes];
            return result;
          }
        }
      }
    }
  }
};