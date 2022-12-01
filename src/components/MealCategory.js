import { React, useContext, useEffect, useState } from 'react';
import FoodContext from '../context/FoodContext';

function MealCategory() {
  const { setMealFilter } = useContext(FoodContext);
  const [categories, setCategories] = useState([]);
  console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await request.json();
      setCategories(data.meals);
    };
    fetchCategories();
  }, []);

  const five = 5;

  const categoryFilter = async (theName) => {
    const linkMeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${theName}`;
    const respose = await fetch(linkMeals);
    const resposejson = await respose.json();
    // console.log(resposejson);
    setMealFilter(resposejson);
  };

  return (
    <div>
      <div>
        <button type="button" data-testid="All-category-filter">All</button>
      </div>
      <div>
        {categories.slice(0, five)
          .map((element, i) => (
            <button
              key={ i }
              type="button"
              data-testid={ `${element.strCategory}-category-filter` }
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
