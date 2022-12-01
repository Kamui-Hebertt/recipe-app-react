import React, { useEffect, useState, useContext } from 'react';
import FoodContext from '../context/FoodContext';

function DrinkCategory() {
  const [categories, setCategories] = useState([]);
  const { setMealFilter } = useContext(FoodContext);
  console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await request.json();
      console.log(data);
      setCategories(data.drinks);
    };
    fetchCategories();
  }, []);

  const five = 5;
  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ ({ target }) => setMealFilter(target.value) }
          value="all"
        >
          All

        </button>
      </div>
      {categories.slice(0, five)
        .map((element, i) => (
          <button
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            onClick={ ({ target }) => setMealFilter(target.value) }
            value={ element.strCategory }
            key={ i }
          >
            {element.strCategory}

          </button>
        ))}
    </div>
  );
}

export default DrinkCategory;
