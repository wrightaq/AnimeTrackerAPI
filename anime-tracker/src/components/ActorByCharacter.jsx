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

//*** DATA IS NOT RETURNING BASED ON PERPAGE VARIABLE. THEN NEED TO FIX FETCHMORE
const GET_ACTOR_NAME_BY_CHARACTER = gql `
query GetActorByCharacter($id: Int, $offset: Int, $limit: Int, $search: String){
  Page (page: $offset, perPage: $limit) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    characters (id: $id, search: $search, sort: ID) {
      id
      media (page: $offset, perPage: $limit) {
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
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const onLoadMore = () => fetchMore({
    variables: {
      offset: page + perPage
    }
  })

  const { loading, error, data, fetchMore } = useQuery(GET_ACTOR_NAME_BY_CHARACTER, {
    variables: {
      search: search,
      offset: page,
      limit: perPage
    },
  });

  // const nextPage = () => {
  //   fetchMore({
  //     variables: {
  //       offset: offset + limit,
  //       limit: limit
  //     },
  //     updateQuery: (prev, {fetchMoreResult}) => {
  //       if (!fetchMoreResult) return prev;
  //       return fetchMoreResult;
  //     }
  //   });
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log("data:", data)
  console.log("page:", page)
  console.log("perPage", perPage)
  console.log("search:", search)

  return (
    <div>
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
      <button onClick={fetchMore({variables:{offset: page + perPage}})}>more</button>
    </div>
  )
}
export default ActorByCharacter;