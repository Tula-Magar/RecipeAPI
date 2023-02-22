import React, { useState } from 'react';
import RecipeList from './RecipeList';
import { Container } from 'react-bootstrap';
import "./App.css";

import {useDispatch } from 'react-redux';
import {setMeals } from './MealsState';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  

  const dispatch = useDispatch();

  const handleSearch = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
    const data = await response.json();
    dispatch(setMeals({ meals: data.meals }));
    console.log(data.meals);
  }
 

  return (
    <Container fluid className='App'>
      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    
      <RecipeList/>
    </Container>
  );
}

export default App;
