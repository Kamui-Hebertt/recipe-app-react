import React, { useEffect, useState, useContext } from 'react';
import FoodContext from '../context/FoodContext';
import mealIcon from '../images/mealIcon.svg';
import './DrinkCategory.css';

function DrinkCategory() {
  const [categories, setCategories] = useState([]);
  const { setMealFilter, mealFilter } = useContext(FoodContext);
  const names2 = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];
  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await request.json();
      setCategories(data.drinks);
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
      <div className="allBtn2">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ ({ target }) => setMealFilter(target.value) }
          value="all"
        >
          <img src={ mealIcon } alt="meal icon" />

        </button>
        <p>All</p>
      </div>
      <div className="btnWithNames2">
        <div className="category-btn2">
          {categories.slice(0, five)
            .map((element, i) => (
              <button
                type="button"
                data-testid={ `${element.strCategory}-category-filter` }
                onClick={ ({ target }) => setFilter(target.value) }
                value={ element.strCategory }
                key={ i }
              >
                <p className="names2">{element.strCategory}</p>

              </button>
            ))}

        </div>
        <div className="theNames2">
          {names2.map((elementName, i2) => (
            <p key={ i2 }>{elementName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrinkCategory;
