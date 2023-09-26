import React,{ useState, useEffect, useRef, Suspense } from 'react';
import { useQuery, gql } from "@apollo/client";


// header of the character name and image

//       List of cards:
//       image of actor next to image of character
//       next to images is header of actors name
//       below actors name and next to images in smaller text is character name in anime title
//       hamburger that shows dropdown to do comparisons

//       image of actor and their name redirects to actors character List
//       image of character does nothing
//       anime title redirects to anime title character list (hover opens modal of top 5)
//MADE IT SO IF NOT ALL INFO IS THERE THEN RETURN NULL BUT I THINK THIS MESSES
//WITH THE PAGINATION (IS THERE A WAY TO FILTER THE DATA FROM THE QUERY?)
//ALSO
//CHANGE TO A REACT ROUTER SYSTEM SINCE THIS WAY OF COMPONENT SWITCHING ISNT WORKING AND IS
//CURRENTLY UNNECESSARY
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
  //COMPONENT SWITCH
  const [component, setComponent] = useState(null)
  const [newSearch, setNewSearch] = useState('');
  const [newComponent, setNewComponent] = useState(false);
  const listItem = useRef('')

  useEffect(() => {
    listItem.current = newSearch;
  }, [newSearch])

  const SwitchComponent = location => {
    const Component = React.lazy(() => import(`./${location}.jsx`));
    console.log("newSearch", newSearch)
    setComponent(<Component search={listItem.current} />);
  };

  // const handleListItem = (event) => {
  //   setNewSearch(event.target.value)
  // }
  const handleNewSearch = (event) => {
    setNewComponent(prevSetNewComponent => !prevSetNewComponent);
    setNewSearch(event.target.value);
    SwitchComponent(event.target.name);
  };

  const [offset, setOffset] = useState(0);
  const { loading, error, data } = useQuery(GET_ACTOR_NAME_BY_CHARACTER, {
    variables: {
      search: search,
      offset: offset,
      limit: 5
      },
  });
//PAGINATION
 const fetchMoreHandler = () => {
    const currentLength = data?.Character.media.edges.length || 0
    setOffset((offset) => offset + currentLength);
  }

  const fetchPrevHandler = () => {
    let currentLength = data?.Character.media.edges.length || 0
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
      <Suspense fallback={<div>Loading...</div>}>

      {newComponent ? component :
      <div>
      {data.Character.media.edges.map(({ node, voiceActors }) => (
        node.title.english ?
        <li key={node.id}>
          {voiceActors.map(({name}) => (
            <button value={name.full} name='CharactersByActor' onClick={handleNewSearch}>
              {name.full}
            </button>
          ))} in {node.title.english}
        </li> : null
      ))}
      <button onClick={fetchPrevHandler}>back</button>
      <button onClick={fetchMoreHandler}>more</button>
      </div>}
      </Suspense>
    </div>
  )
}
export default ActorByCharacter;