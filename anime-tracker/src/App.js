// //header background could be scrolling images of things on watched list
// //maybe add a feature to add own information if api can't find the anime
// //need to deal with casing and mispelling of inputs
// //searches should have a dropdown of suggested choices
// //maybe add feature to see other things actor is in that haven't watched yet
// //maybe add a seiyuu birthday feature

import React, {useState, Suspense, useRef, useEffect} from 'react';
import { useQuery, gql } from "@apollo/client";

const App = () => {
  const [component, setComponent] = useState(null);
  const [input, setInput] = useState('');
  const search = useRef('');

  useEffect(() => {
    search.current = input;
  },[input])

  const LoadComponent = location => {
    const Component = React.lazy(() => import(`./components/${location}.jsx`));
    setComponent(<Component search={search.current}/>);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = (event) => {
    console.log("search:", search)
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
          <button name='ActorByCharacter' onClick={handleSearch}>Search</button>
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

export default App;
