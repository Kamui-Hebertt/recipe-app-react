import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './searchBar.css';

import FoodContext from '../context/FoodContext';

function SearchBar() {
  const { setSearchFilter,
    handleSearchClick, foodRecipes, drinkRecipes } = useContext(FoodContext);
  const location = useLocation();
  const twelve = 12;
  return (
    <div className="searchBar">
      <div className="inputs">
        <label htmlFor="ingredient">
          ingredient:
          <input
            type="radio"
            name="searchInput"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onClick={ ({ target }) => setSearchFilter(target.value) }
            id="ingredient"
          />
        </label>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="radio"
            name="searchInput"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setSearchFilter(target.value) }
            value="name"
          />
        </label>

        <label htmlFor='"first-letter"'>
          First Letter:
          <input
            type="radio"
            name="searchInput"
            onClick={ ({ target }) => setSearchFilter(target.value) }
            data-testid="first-letter-search-radio"
            value="first-letter"
          />
        </label>
        <div className="searchBtn">
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleSearchClick }
          >
            Search

          </button>
        </div>
      </div>
      {location.pathname === '/meals'
        ? foodRecipes?.slice(0, twelve).map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              alt="food"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          </div>
        ))
        : drinkRecipes?.slice(0, twelve).map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strDrinkThumb }
              alt="food"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          </div>
        ))}
    </div>
  );
}

export default SearchBar;
