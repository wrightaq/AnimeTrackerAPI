import React from 'react';
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";


// header of the character name and image

//       List of cards:
//       image of actor next to image of character
//       next to images is header of actors name
//       below actors name and next to images in smaller text is character name in anime title
//       hamburger that shows dropdown to do comparisons

//       image of actor and their name redirects to actors character List
//       image of character does nothing
//       anime title redirects to anime title character list

const GET_ACTOR_NAME_BY_CHARACTER = gql `
query GetActorNameByCharacter($id: Int, $offset: Int, $limit: Int $search: String){
  Character (id: $id, search: $search) {
    id
    media(page: $offset, perPage: $limit, sort: ID) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        voiceActors (language: JAPANESE) {
          id
          name {
            full
          }
        }
        node {
          id
          title {
            english
          }
        }
      }
    }
  }
}`;


const ActorByCharacter = ({search}) => {

  const { loading, error, data, fetchMore } = useQuery(GET_ACTOR_NAME_BY_CHARACTER, {
    variables: {
      search: search,
      offset: 0,
      limit: 5
      },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  //PAGINATION
  // const handlePage = (event) => {
  //   if (event.target.name === 'more') {
  //     setPage(page + 1)
  //   }
  //   if (event.target.name === 'back') {
  //     setPage(page - 1)
  //   }
  //   console.log("page:", page)
  // }
  console.log("data:", data)

  return (
    <div>
      {data.Character.media.edges.map(({ node, voiceActors }) => (
        <li key={node.id}>
          {voiceActors.map(({name}) => (
            name.full
          ))} in {node.title.english}
        </li>
      ))}
      <button
        onClick={()=>
          fetchMore({variables: {
            offset: data.Character.media.edges.length
          }})
        }
        >
        more
      </button>
    </div>
  )
}
export default ActorByCharacter;