import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities'
import App from './App';
import ActorByCharacter from './components/ActorByCharacter.jsx';
import CharactersByActor from './components/CharactersByActor.jsx';
import CharactersByTitle from './components/CharactersByTitle.jsx';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const cache = new InMemoryCache({
  typePolicies: {
    Character: {
      fields: {
        media: offsetLimitPagination(),
      },
    },
  },
});

// const cache = new InMemoryCache({
//   typePolicies: {
//     Character: {
//       fields: {
//         media: {
//           ...offsetLimitPagination(),
//           read(existing, { args }) {
//               let res
//               if (existing) {
//                   res = existing.slice(
//                       args?.offset,
//                       args?.offset + args?.limit
//                   )
//               }
//               return res && res.length === args?.limit
//                   ? res
//                   : undefined
//           },
//         },
//       }
//     },
//     Media: {
//       fields: {
//         characters: {
//           ...offsetLimitPagination(),
//           read(existing, { args: { offset, limit }}) {
//             // A read function should always return undefined if existing is
//             // undefined. Returning undefined signals that the field is
//             // missing from the cache, which instructs Apollo Client to
//             // fetch its value from your GraphQL server.
//             return existing && existing.slice(offset, offset + limit);
//           },

//           // The keyArgs list and merge function are the same as above.
//           keyArgs: [],
//           merge(existing, incoming, { args: { offset = 0 }}) {
//             const merged = existing ? existing.slice(0) : [];
//             for (let i = 0; i < incoming.length; ++i) {
//               merged[offset + i] = incoming[i];
//             }
//             return merged;
//           },
//           // read(existing, { args }) {
//           //     let res
//           //     if (existing) {
//           //         res = existing.slice(
//           //             args?.offset,
//           //             args?.offset + args?.limit
//           //         )
//           //     }
//           //     return res && res.length === args?.limit
//           //         ? res
//           //         : undefined
//           // },
//         }
//       }
//     },
//     Staff: {
//       fields: {
//         characters: {
//           ...offsetLimitPagination(),
//           read(existing, { args: { offset, limit }}) {
//             // A read function should always return undefined if existing is
//             // undefined. Returning undefined signals that the field is
//             // missing from the cache, which instructs Apollo Client to
//             // fetch its value from your GraphQL server.
//             return existing && existing.slice(offset, offset + limit);
//           },

//           // The keyArgs list and merge function are the same as above.
//           keyArgs: [],
//           merge(existing, incoming, { args: { offset = 0 }}) {
//             const merged = existing ? existing.slice(0) : [];
//             for (let i = 0; i < incoming.length; ++i) {
//               merged[offset + i] = incoming[i];
//             }
//             return merged;
//           },
//         }
//       }
//     }
//   }
// });

// Supported in React 18+
const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    children: [
      {
        path: "ActorByCharacter/:search",
        element: <ActorByCharacter />
      },
      {
        path: "CharactersByActor/:search",
        element: <CharactersByActor />
      },
      {
        path: "CharactersByTitle/:search",
        element: <CharactersByTitle />
      }
    ]
  },
  // {
  //       path: "/ActorByCharacter/:search",
  //       element: <ActorByCharacter />
  //     }
]);

const app = ReactDOM.createRoot(document.getElementById('app'));

app.render(
  <ApolloProvider client={client} cache={cache}>
    {/* <App /> */}
    <RouterProvider router={router} />
  </ApolloProvider>,
);