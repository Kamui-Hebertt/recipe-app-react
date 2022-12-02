import { React, useContext, useEffect, useState } from 'react';
import FoodContext from '../context/FoodContext';

function MealCategory() {
  const { setMealFilter, mealFilter } = useContext(FoodContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await request.json();
      setCategories(data.meals);
    };
    fetchCategories();
  }, []);

  const setFilter = (value) => {
    const filter = mealFilter === value ? 'all' : value;
    setMealFilter(filter);
  };

  const five = 5;

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          value="all"
          onClick={ () => setMealFilter('all') }
        >
          All

        </button>
      </div>
      <div>
        {categories.slice(0, five)
          .map((element, i) => (
            <button
              key={ i }
              type="button"
              data-testid={ `${element.strCategory}-category-filter` }
              name={ element.strCategory }
              value={ element.strCategory }
              onClick={ ({ target }) => setFilter(target.value) }
            >
              {element.strCategory}

            </button>
          ))}
      </div>
    </div>

  );
}

export default MealCategory;
