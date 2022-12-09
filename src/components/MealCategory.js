import { React, useContext, useEffect, useState } from 'react';
import FoodContext from '../context/FoodContext';
import mealIcon from '../images/mealIcon.svg';
import './MealCategory.css';
import goatIcon from './goat.svg';
import chickenIcon from './chicken.png';

function MealCategory() {
  const { setMealFilter, mealFilter } = useContext(FoodContext);
  const [categories, setCategories] = useState([]);
  const mealCategory = [goatIcon, chickenIcon];

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
          <img src={ mealIcon } alt="meal icon" />
        </button>
        <p>All</p>
      </div>
      <div className="category-btn">
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
              <img src={ goatIcon } alt={ element.strCategory } />

              { element.strCategory }

            </button>

          ))}
      </div>
    </div>

  );
}

export default MealCategory;
