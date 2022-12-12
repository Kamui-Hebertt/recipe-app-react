import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FoodContext from '../context/FoodContext';
import './recipes.css';

function Recipes() {
  const { recipes } = useContext(FoodContext);
  const twelve = 12;

  return (
    <>
      {recipes.meals ? (
        <div>
          <p className="titleR">recipes</p>
          <div className="thefoods">
            {recipes.meals.slice(0, twelve)
              .map((element, i) => (
                <Link
                  to={ `/meals/${element.idMeal}` }
                  key={ i }

                >
                  <div
                    className="foodImages"
                    data-testid={ `${i}-recipe-card` }
                  >
                    <p
                      className="foodLinkNames"
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
                </Link>
              ))}
          </div>
        </div>
      ) : null}

      {recipes.drinks ? (
        <div>
          <p className="titleR">recipes</p>
          <div className="thefoods">
            {recipes.drinks.slice(0, twelve).map((element1, i) => (
              <Link to={ `/drinks/${element1.idDrink}` } key={ i }>

                <div
                  className="foodImages"
                  data-testid={ `${i}-recipe-card` }
                >

                  <p data-testid={ `${i}-card-name` }>

                    {element1.strDrink}

                  </p>
                  <img
                    src={ element1.strDrinkThumb }
                    alt={ element1.strDrink }
                    data-testid={ `${i}-card-img` }
                  />

                </div>
              </Link>

            ))}
          </div>
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
