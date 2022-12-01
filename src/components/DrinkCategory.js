import React from 'react';
import drinkCategoryMock from '../helpers/drinkCategoryMock';

function DrinkCategory() {
  const theDrinksCategory = drinkCategoryMock.drinks;
  const five = 5;
  return (
    <div>
      <div>
        <button type="button" data-testid="All-category-filter">All</button>
      </div>
      {theDrinksCategory.slice(0, five)
        .map((element, i) => (
          <button
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            key={ i }
          >
            {element.strCategory}

          </button>
        ))}
    </div>
  );
}

export default DrinkCategory;
