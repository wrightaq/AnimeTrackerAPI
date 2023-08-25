//header of the title name and image

// list of cards:
// character image next to character name
// followed by actor name next to their image
// hamburger that shows dropdown to do comparisons

// clicking actor name or image will redirect to actors character list


import React from 'react';
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";

const GET_CHARACTER_NAMES = gql `
query GetCharacterNames($id: Int, $page: Int, $perPage: Int, $search: String){
  Media (id: $id, search: $search, type: ANIME) {
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

// const GET_CHARACTER_NAMES = gql `
// query GetCharacterNames($id: Int, $page: Int, $perPage: Int, $search: String) {
//   Page (page: $page, perPage: $perPage) {
//     pageInfo {
//       currentPage
//       hasNextPage
//       perPage
//     }
//     media (id: $id, search: $search, type: ANIME) {
//       id
//       title {
//         english
//       }
//       characters (sort: ID) {
//         nodes{
//           id
//            name {
//              full
//            }
//         }
//       }
//     }
//   }
//  }
// `
//FINISH PAGINATION, FIND OUT ABOUT'AT' FROM THE OTHER GITHUB REPO. BUTTON NOT CHANGING PAGES CURRENTLY
//PREVIOUSLY WAS MAKING THE LIST SHORTER AND SHORTER INSTEAD OF MOVING TO THE NEXT PAGE
const CharactersByTitle = ({search}) => {
  console.log("search", search)
const [page, setPage] = useState(1)
const { loading, error, data } = useQuery(GET_CHARACTER_NAMES, {
  variables: {
    search: search,
    page: page,
    perPage: 25
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
    {data.Media.characters.edges.map(({ node }) => (
        <li key={node.id}>
          {node.name.full}
        </li>
    ))}
    <button name='more' onClick={handlePage}>more</button>
  </div>
)
}

export default CharactersByTitle;
