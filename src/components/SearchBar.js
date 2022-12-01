import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient">
        ingredient:
        <input
          type="radio"
          name="searchInput"
          data-testid="ingredient-search-radio"
          value="ingredient"
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
          value="name"
        />
      </label>
      <label htmlFor='"first-letter"'>
        First Letter:
        <input
          type="radio"
          name="searchInput"
          data-testid="first-letter-search-radio"
          value="first-letter"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
