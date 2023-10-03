// //header background could be scrolling images of things on watched list
// //maybe add a feature to add own information if api can't find the anime
// //need to deal with casing and mispelling of inputs
// //searches should have a dropdown of suggested choices
// //maybe add feature to see other things actor is in that haven't watched yet
// //maybe add a seiyuu birthday feature

import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ActorByCharacter from './components/ActorByCharacter.jsx';
import CharactersByActor from './components/CharactersByActor.jsx';
import CharactersByTitle from './components/CharactersByTitle.jsx';

const App = () => {
  const [input, setInput] = useState('');
  const search = useRef('');

  useEffect(() => {
    search.current = input;
  },[input]);

  const handleInput = (event) => {
    setInput(event.target.value);
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
      <div>
      <input placeholder='Search By Character' onChange={handleInput}></input>
        <Link to={`ActorByCharacter/${search.current}`}>
          <button>Search</button>
        </Link>
      </div>
      <div>
        <input placeholder='Search By Voice Actor' onChange={handleInput}></input>
        <Link to={`CharactersByActor/${search.current}`}>
          <button>Search</button>
        </Link>
      </div>
      <div>
        <input placeholder='Search By Title' onChange={handleInput}></input>
        <Link to={`CharactersByTitle/${search.current}`}>
          <button>Search</button>
        </Link>
      </div>
        <Routes>
          <Route path="ActorByCharacter/:search" element={<ActorByCharacter />} />
          <Route path="CharactersByActor/:search" element={<CharactersByActor />} />
          <Route path="CharactersByTitle/:search" element={<CharactersByTitle />} />
        </Routes>
    </React.Fragment>
  )
}

export default App;