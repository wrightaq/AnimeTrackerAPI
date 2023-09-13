import React from 'react';
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";

// a header with the voice actors name and image

// list of cards:
// character image and their name next to it
// followed by title of the anime and its image next to that
// hamburger that shows dropdown to do comparisons

// clicking title or title image will redirect to character list for that title

//ADD BUTTON TO TEST SEARCH
const GET_CHARACTER_NAMES_BY_ACTOR = gql `
query GetCharacterNamesByActor($id: Int, $page: Int, $perPage: Int, $search: String){
  Staff (id: $id, search: $search ) {
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
        media {
          title {
            english
          }
        }
      }
    }
  }
}`

const CharactersByActor = ({search}) => {
  console.log("search", search)
const [page, setPage] = useState(1)
const { loading, error, data } = useQuery(GET_CHARACTER_NAMES_BY_ACTOR, {
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
    {data.Staff.characters.edges.map(({ node, media }) => (
        <li key={node.id}>
          {node.name.full} in {media[0].title.english}
        </li>
    ))}
    <button name='more' onClick={handlePage}>more</button>
  </div>
)
}

export default CharactersByActor;
