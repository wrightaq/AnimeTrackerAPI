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
query GetCharacterNamesByActor($id: Int, $offset: Int, $limit: Int $search: String){
  Staff (id: $id, search: $search ) {
    id
    characters(page: $offset, perPage: $limit, sort: ID) {
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
          id
          title {
            english
          }
        }
      }
    }
  }
}`

const CharactersByActor = ({search}) => {
  const [offset, setOffset] = useState(0);
  const { loading, error, data } = useQuery(GET_CHARACTER_NAMES_BY_ACTOR, {
    variables: {
      search: search,
      offset: offset,
      limit: 5
    },
  });

 const fetchMoreHandler = () => {
    const currentLength = data?.Staff.characters.edges.length || 0
    setOffset((offset) => offset + currentLength)
  }

  const fetchPrevHandler = () => {
    let currentLength = data?.Staff.characters.edges.length || 0
    if (currentLength === 0) {
      currentLength = 2
    }
    setOffset((offset) =>
    offset - currentLength < 0 ? 0 : offset - currentLength
    )
  }

if (loading) return <p>Loading...</p>;
if (error) return <p>Error : {error.message}</p>;

console.log("data:", data)

return (
  <div>
    {data.Staff.characters.edges.map(({ node, media }) => (
      media.length > 1 ?
       <div key={node.id}>
        {node.name.full} in:
        {media.map(({title}) => (
          title.english ?
            <li key={media.id}>
              {title.english}
            </li> : null
          ))}
        </div> :
        <li key={node.id}>
        {node.name.full} in {media[0].title.english}
        </li>
    ))}
    <button onClick={fetchPrevHandler}>back</button>
    <button onClick={fetchMoreHandler}>more</button>
  </div>
)
}

export default CharactersByActor;
