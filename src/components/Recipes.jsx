import { React, useContext } from 'react';
import PropTypes from 'prop-types';

import FoodContext from '../context/FoodContext';

function Recipes() {
  const { initialRecipes } = useContext(FoodContext);
  const twelve = 12;
  return (
    <>
      {initialRecipes.meals ? (
        <div>
          <p>Recipes</p>
          {initialRecipes.meals.slice(0, twelve)
            .map((element, i) => (
              <div key={ i } data-testid={ `${i}-recipe-card` }>
                <p
                  key={ i }
                  data-testid={ `${i}-card-name` }
                >
                  {element.strMeal}

                </p>
                <img
                  data-testid={ `${i}-card-img` }
                  src={ element.strMealThumb }
                  alt={ element.strMeal }
                />
              </div>
            ))}
        </div>
      ) : null}

      {initialRecipes.drinks ? (
        <div>
          <p>Recipes</p>
          {initialRecipes.drinks.slice(0, twelve).map((element1, i) => (

            <div key={ i } data-testid={ `${i}-recipe-card` }>

              <p key={ i } data-testid={ `${i}-card-name` }>

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
      )
        : null}

    </>
  );
}

Recipes.propTypes = {
  renderDrinkOrMeal: PropTypes.string,
}.isRequired;

export default Recipes;
