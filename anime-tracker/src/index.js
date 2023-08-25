import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

// Supported in React 18+
const app = ReactDOM.createRoot(document.getElementById('app'));

app.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);