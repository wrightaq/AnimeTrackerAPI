import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";


// header of the character name and image

//       List of cards:
//       image of actor next to image of character
//       next to images is header of actors name
//       below actors  and next to images in smaller text is character name in anime title
//       hamburger that shows dropdown to do comparisons

//       image of actor and their name redirects to actors character List
//       image of character does nothing
//       anime title redirects to anime title character list (hover opens modal of top 5)
//MADE IT SO IF NOT ALL INFO IS THERE THEN RETURN NULL BUT I THINK THIS MESSES
//WITH THE PAGINATION (IS THERE A WAY TO FILTER THE DATA FROM THE QUERY?)
//ALSO: use react router useNavigate to do pagination? navigate(-1)

//try to get the page to reload to the home page without any search information

//IF A CHARACTER HAS MORE THAN ONE ACTOR FILTER OUT THE DOUBLES AND MAKE A DROP DOWN

//*** ADDED PAGE TO QUERY FOR PAGINATION. NEED TO UPDATE OFFSET AND LIMIT TO MATCH NEW QUERY
const GET_ACTOR_NAME_BY_CHARACTER = gql `
query GetActorByCharacter($id: Int, $page: Int, $perPage: Int, $search: String){
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    characters (id: $id, search: $search, sort: ID) {
      id
      media {
        edges {
          voiceActors (language: JAPANESE) {
            id
            image {
              medium
            }
            name {
              full
            }
          }
          node {
            id
            coverImage {
              medium
            }
            title {
              english
            }
          }
        }
      }
    }
  }
}`;

const ActorByCharacter = () => {
  const { search } = useParams();

  // const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(15);
  const { loading, error, data, fetchMore } = useQuery(GET_ACTOR_NAME_BY_CHARACTER, {
    variables: {
      search: search,
    },
  });

//PAGINATION
//  const fetchMoreHandler = () => {
//     // const currentLength = data?.Character.media.edges.length || 0
//     // setOffset((offset) => offset + currentLength);
//     setOffset((offset) => offset + limit)
//   }

  // const fetchPrevHandler = () => {
  //   // let currentLength = data.Page.characters[0].media.edges.length || 0
  //   // if (currentLength === 0) {
  //   //   currentLength = 2
  //   // }
  //   // setOffset((offset) =>
  //   // offset - currentLength < 0 ? 0 : offset - currentLength
  //   // )
  //   setOffset((offset) => offset - limit)
  // }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // const nodes = data.Page.characters[0].media.edges.map((edge) => edge.node);
  const nodes = data.Page.characters[0].media.edges.map(({ node, voiceActors }) => (
    node.title.english ?
    <li key={node.id}>
      {voiceActors.map(({name, image}) => (
        <Link to={`../CharactersByActor/${name.full}`} replace={true}>
          <img src={image.medium} alt='actor'/>
          {name.full}
        </Link>
      ))} in
      <Link to={`../CharactersByTitle/${node.title.english}`} replace={true}>
      {node.title.english}
      <img src={node.coverImage.medium} alt='title'/>
      </Link>
    </li> : null
  ))
  const pageInfo = data.Page.pageInfo;

  console.log("data:", data)
  console.log("nodes", nodes)
  console.log("pageInfo", pageInfo)

  return (
    <div>
      <Characters
        entries={nodes}
        onLoadMore={() => {
          if (pageInfo.hasNextPage) {
            fetchMore({
              variables: {
                cursor: pageInfo.currentPage
              }
            })
          }
        }}
      />
      <button onClick={onLoadMore}>More</button>
      {/* <div>
      {data.Page.characters[0].media.edges.map(({ node, voiceActors }) => (
        node.title.english ?
        <li key={node.id}>
          {voiceActors.map(({name, image}) => (
            <Link to={`../CharactersByActor/${name.full}`} replace={true}>
              <img src={image.medium} alt='actor'/>
              {name.full}
            </Link>
          ))} in
          <Link to={`../CharactersByTitle/${node.title.english}`} replace={true}>
          {node.title.english}
          <img src={node.coverImage.medium} alt='title'/>
          </Link>
        </li> : null
      ))}
      <button>back</button>
      <button>more</button>
      </div> */}
    </div>
  )
}
export default ActorByCharacter;