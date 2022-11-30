import React, { useContext } from 'react';

import FoodContext from '../context/FoodContext';

function SearchBar() {
  const { searchFilter, setSearchFilter, handleSearchClick } = useContext(FoodContext);
  console.log(searchFilter);
  return (
    <div>
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
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchClick }
      >
        Search

      </button>
    </div>
  );
}

export default SearchBar;
