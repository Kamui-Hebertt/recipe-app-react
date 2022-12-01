import { React, useContext } from 'react';
import mealCategoryMock from '../helpers/mealCategoryMock';
import FoodContext from '../context/FoodContext';

function MealCategory() {
  const { setMealFilter } = useContext(FoodContext);
  const theMealsCategory = mealCategoryMock.meals;
  const five = 5;

  const categoryFilter = async (theName) => {
    const linkMeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${theName}`;
    const respose = await fetch(linkMeals);
    const resposejson = await respose.json();
    console.log(resposejson);
    setMealFilter(resposejson);
  };

  return (
    <div>
      <div>
        <button type="button" data-testid="All-category-filter">All</button>
      </div>
      <div>
        {theMealsCategory.slice(0, five)
          .map((element, i) => (
            <button
              key={ i }
              type="button"
              name={ element.strCategory }
              onClick={ ({ target }) => categoryFilter(target.name) }
            >
              {element.strCategory}

            </button>
          ))}
      </div>
    </div>

  );
}

export default MealCategory;
