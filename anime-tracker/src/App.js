// //header background could be scrolling images of things on watched list
// //maybe add a feature to add own information if api can't find the anime
// //need to deal with casing and mispelling of inputs
// //searches should have a dropdown of suggested choices
// //maybe add feature to see other things actor is in that haven't watched yet
// //maybe add a seiyuu birthday feature

import React, {useState, Suspense} from 'react';
import { useQuery, gql } from "@apollo/client";
// import CharactersByTitle from "./components/CharactersByTitle.jsx";
// import CharactersByActor from "./components/CharactersByActor.jsx";
// import ActorByCharacter from "./components/ActorByCharacter.jsx";

const App = () => {
  const [component, setComponent] = useState(null);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const LoadComponent = location => {
    const Component = React.lazy(() => import(`./components/${location}.jsx`));
    setComponent(<Component search={search}/>);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log("initial search:", search)
    LoadComponent(event.target.name);

  };

  return (
    <React.Fragment>
      <h1>
        Seiyuu x SeiyWho? or Who Dat?
      </h1>
      <h3>
        Add to watched list:
        <input placeholder='enter title'></input>
        <button>Add</button>
      </h3>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <input placeholder='Search By Character' onChange={handleInput}></input>
          <button name='ActorByCharacter' value={input} onClick={handleSearch}>Search</button>
        </div>
        <div>
          <input placeholder='Search By Voice Actor' onChange={handleInput}></input>
          <button name='CharactersByActor' onClick={handleSearch}>Search</button>
        </div>
        <div>
          <input placeholder='Search By Title' onChange={handleInput}></input>
          <button name='CharactersByTitle' onClick={handleSearch}>Search</button>
        </div>
        {component}
      </Suspense>
    </React.Fragment>
  )
}
// const App = () => {
//   const [input, setInput] = useState('');
//   const [titlesearch, setTitleSearch] = useState('');
//   const [actorsearch, setActorSearch] = useState('');
//   const [charactersearch, setCharacterSearch] = useState('');
//   const [flag, setFlag] = useState(false);
//   const [page, setPage] = useState('');


//   const handleChange = (event) => {
//     setInput(event.target.value);
//   };

//   // const handlePage = (event) => {
//   //   setPage(event.target.name)
//   //   if (page === )
//   // }
//   const handleClick = () => {
//     // setSearch(input);
//     // setFlag(!flag);
//   };

//   const handleActorSearch = () => {
//     setActorSearch(input);
//     setFlag(!flag);
//   }

//   const handleTitleSearch = () => {
//     setTitleSearch(input);
//     setFlag(!flag);
//   }

//   const handleCharacterSearch = () => {
//     setCharacterSearch(input);
//     setFlag(!flag);
//   }

//   return (
//     <React.Fragment>
//       <h1>
//         Seiyuu x SeiyWho?
//       </h1>
//       <h3>
//         Add to watched list:
//         <input placeholder='enter title'></input>
//         <button>Add</button>
//       </h3>
//       <div>
//         <input placeholder='Search By Character' onChange={handleChange}></input>
//         <button name='characterView' onClick={handleCharacterSearch}>Search</button>
//         <div>
//           {flag ?
//             <div>
//               <ActorByCharacter search={charactersearch}/>
//             </div> : null}
//         </div>

//         <input placeholder='Search By Voice Actor' onChange={handleChange}></input>
//         <button name='actorView' onClick={handleActorSearch}>Search</button>
//         <div>
//           {flag ?
//             <div>
//               <CharactersByActor search={actorsearch}/>
//             </div> : null}
//         </div>
//         <input placeholder='Search By Anime Title' onChange={handleChange}></input>
//         <button name='titleView' onClick={handleTitleSearch}>Search</button>
//         <div>
//           {flag ?
//             <div>
//               <CharactersByTitle search={titlesearch}/>
//             </div> : null}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

export default App;
