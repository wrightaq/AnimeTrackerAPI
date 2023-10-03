//header of the title name and image

// list of cards:
// character image next to character name
// followed by actor name next to their image
// hamburger that shows dropdown to do comparisons

// clicking actor name or image will redirect to actors character list

//figure out what to do about multiple actors playing same character and the actors
//playing the "young" version of characters

//AFTER A COUPLE PAGES 'NAME' BECOMES UNDEFINED FOR SOME REASON AND PAGINATION
//GETS ALL MESSED UP *After implementing Link one of the One Piece movies had trouble with an undefined name but everything
//else that was clicked on was fine so may be problem with retrieving data from the api
//AFTER ADDING IMAGE PAGINATION DOESN'T WORK ANYMORE, it may have stopped working prior to image addition but didn't notice
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
          image {
            medium
          }
          name {
            full
          }
        }
        voiceActors (language: JAPANESE) {
          id
          image {
            medium
          }
          name {
            full
          }
        }
      }
    }
  }
}`


const CharactersByTitle = () => {
  const { search } = useParams();

  const [offset, setOffset] = useState(0);

  const { loading, error, data } = useQuery(GET_CHARACTER_NAMES_BY_TITLE, {
    variables: {
      search: search,
      offset: offset,
      limit: 15
      },
  });

  //PAGINATION
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

  return (
    <div>
      {data?.Media.characters.edges.map(({ node, voiceActors }) => (
        <li key={node.id}>
          <Link to={`../ActorByCharacter/${node.name.full}`} replace={true}>
          <img src={node.image.medium} alt='character'/>
            {node.name.full}
          </Link>
            voiced by
          <Link to={`../CharactersByActor/${voiceActors[0].name.full}`}>
            {voiceActors[0].name.full}
            <img src={voiceActors[0].image.medium} alt='actor' />
          </Link>
        </li>
      ))}
      <button onClick={fetchPrevHandler}>back</button>
      <button onClick={fetchMoreHandler}>more</button>
    </div>
  )
}

export default CharactersByTitle;
