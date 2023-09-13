//header of the title name and image

// list of cards:
// character image next to character name
// followed by actor name next to their image
// hamburger that shows dropdown to do comparisons

// clicking actor name or image will redirect to actors character list

//figure out what to do about multiple actors playing same character and the actors
//playing the "young" version of characters


import React from 'react';
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";


// const cache = new InMemoryCache({
//   typePolicies: {
//     Title: {
//       fields: {
//         characters: {
//           merge(existing = [], incoming: any[]) {
//             return [...existing, ...incoming];
//           },
//         },
//       },
//     },
//   },
// });


const GET_CHARACTER_NAMES_BY_TITLE = gql `
query GetCharacterNamesByTitle($id: Int, $page: Int, $perPage: Int, $search: String){
  Media (id: $id, search: $search, type: ANIME) {
    id
    characters(page: $page, perPage: $perPage, sort: ID) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        node {
          id
          name {
            full
          }
        }
        voiceActors (language: JAPANESE) {
          id
          name {
            full
          }
        }
      }
    }
  }
}`


const CharactersByTitle = ({search}) => {
  console.log("search", search)
const [page, setPage] = useState(1)
const { loading, error, data } = useQuery(GET_CHARACTER_NAMES_BY_TITLE, {
  variables: {
    search: search,
    page: page,
    perPage: 25,
    },
});

if (loading) return <p>Loading...</p>;
if (error) return <p>Error : {error.message}</p>;

//PAGINATION
const handlePage = (event) => {
  if (event.target.name === 'more') {
    setPage(page + 1)
  }
  if (event.target.name === 'back') {
    setPage(page - 1)
  }
  console.log("page:", page)
}
console.log("data:", data)
return (

  <div>
    {data.Media.characters.edges.map(({ node, voiceActors }) => (
        <li key={node.id}>
          {node.name.full} voiced by {voiceActors[0].name.full}
        </li>
    ))}
    <button name='more' onClick={handlePage}>more</button>
  </div>
)
}

export default CharactersByTitle;
