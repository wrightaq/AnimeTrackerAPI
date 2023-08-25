//header background could be scrolling images of things on watched list
//maybe add a feature to add own information if api can't find the anime
//need to deal with casing and mispelling of inputs
//searches should have a dropdown of suggested choices
//maybe add feature to see other things actor is in that haven't watched yet
//maybe add a seiyuu birthday feature

import React from 'react';
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import CharactersByTitle from "./components/CharactersByTitle.jsx";

const App = () => {

  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [flag, setFlag] = useState(false);


  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = () => {
    setSearch(input);
    setFlag(!flag);
  };

  return (
    <React.Fragment>
      <h1>
        Seiyuu x SeiyWho?
      </h1>
      <h3>
        Add to watched list:
        <input placeholder='enter title'></input>
        <button>Add</button>
      </h3>
      <div>
        <input placeholder='Search By Character' ></input>
        <button name='characterView'>Search</button>
        <input placeholder='Search By Voice Actor'></input>
        <button name='actorView'>Search</button>
        <input placeholder='Search By Anime Title' onChange={handleChange}></input>
        <button name='titleView' onClick={handleClick}>Search</button>
      </div>
      <div>
     {flag ? <div>
              <CharactersByTitle search={search}/>
            </div> : null}

      </div>
    </React.Fragment>
  );
}

export default App;
