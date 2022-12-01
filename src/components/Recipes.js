import { React } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import mealsMock from '../helpers/mealsMock';
import drinkMock from '../helpers/drinkMock';

function Recipes() {
  const location = useLocation();
  const theMeal = mealsMock.meals;
  const theDrinks = drinkMock.drinks;
  const twelve = 12;
  return (
    <div>
      <p>Recipes</p>
      {location.pathname === '/meals' ? theMeal
        .map((element, i) => (
          <>
            <p
              key={ i }
              data-testid={ `${element.strMeal}-card-name` }
            >
              {element.strMeal}

            </p>
            <img
              data-testid={ `${i}-card-img` }
              src={ element.strMealThumb }
              alt={ element.strMeal }
            />
          </>
        ))
        : theDrinks.slice(0, twelve).map((element1, i) => (

          <div key={ i }>

            <p key={ i } data-testid={ `${element1.strDrink}-card-name` }>

              {element1.strDrink}

            </p>
            <img
              src={ element1.strDrinkThumb }
              alt={ element1.strDrink }
              data-testid={ `${i}-card-img` }
            />

          </div>
        ))}
    </div>

  );
}

Recipes.propTypes = {
  renderDrinkOrMeal: PropTypes.string,
}.isRequired;

export default Recipes;
