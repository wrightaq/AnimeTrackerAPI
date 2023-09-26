//header of the title name and image

// list of cards:
// character image next to character name
// followed by actor name next to their image
// hamburger that shows dropdown to do comparisons

// clicking actor name or image will redirect to actors character list

//figure out what to do about multiple actors playing same character and the actors
//playing the "young" version of characters

//AFTER A COUPLE PAGES 'NAME' BECOMES UNDEFINED FOR SOME REASON AND PAGINATION
//GETS ALL MESSED UP
import React from 'react';
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";

const GET_CHARACTER_NAMES_BY_TITLE = gql `
query GetCharacterNamesByTitle($id: Int, $offset: Int, $limit: Int $search: String){
  Media (id: $id, search: $search, type: ANIME) {
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
  const [offset, setOffset] = useState(0);
  console.log(offset)
  const { loading, error, data } = useQuery(GET_CHARACTER_NAMES_BY_TITLE, {
    variables: {
      search: search,
      offset: offset,
      limit: 5
      },
  });

  const fetchMoreHandler = () => {
    const currentLength = data?.Media.characters.edges.length || 0
    setOffset((offset) => offset + currentLength)
  }

  const fetchPrevHandler = () => {
    let currentLength = data?.Media.characters.edges.length || 0
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
    {data?.Media.characters.edges.map(({ node, voiceActors }) => (
        <li key={node.id}>
          {node.name.full} voiced by {voiceActors[0].name.full}
        </li>
    ))}
    <button onClick={fetchPrevHandler}>back</button>
    <button onClick={fetchMoreHandler}>more</button>
  </div>
)
}

export default CharactersByTitle;
