import React, { useContext, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import DetailsPageContext from '../context/DetailsPageContext';
import './RecipeDetails.css';

function RecipeDetails() {
  const six = 6;
  const location = useLocation();
  const {
    ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo,
    setId,
    foodRecomendation,
    drinkRecomendation,
  } = useContext(DetailsPageContext);
  const [mealsReco, setMealsReco] = useState([]);
  const [drinksReco, setDrinksReco] = useState([]);
  const [recipeIsDone, setRecipeIsDone] = useState(false);

  useEffect(() => setId(location.pathname.split('/')[2]), []);

  useEffect(() => {
    if (foodRecomendation) {
      setMealsReco(foodRecomendation);
      const done = JSON.parse(localStorage.getItem('doneRecipes')) !== null
        ? JSON.parse(localStorage.getItem('doneRecipes'))
        : [];
      setRecipeIsDone(done.some((recipe) => mealInfos.strMeal === recipe));
    }
    if (drinkRecomendation) {
      setDrinksReco(drinkRecomendation);
      const done = JSON.parse(localStorage.getItem('doneRecipes')) !== null
        ? JSON.parse(localStorage.getItem('doneRecipes'))
        : [];
      setRecipeIsDone(done.some((recipe) => drinkInfos.strDrink === recipe));
    }
  }, [JSON.stringify(foodRecomendation), JSON.stringify(drinkRecomendation)]);

  return (
    <div>
      {location.pathname.includes('/meals') ? (
        <div>
          <img
            src={ mealInfos.strMealThumb }
            alt="imagem"
            data-testid="recipe-photo"
          />
          <p
            data-testid="recipe-title"
          >
            {mealInfos.strMeal}

          </p>
          <p
            data-testid="recipe-category"
          >
            {mealInfos.strCategory}
          </p>
          <h4>Ingredientes:</h4>
          {
            ingredientsAndMeasures.ingredients.map((el, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ el[0] }
              >
                {el[1]}
              </p>
            ))
          }
          <h4>Medidas:</h4>
          {
            ingredientsAndMeasures.measures.map((e, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ e[0] }
              >
                {e[1]}
              </p>
            ))
          }
          <p
            data-testid="instructions"
          >
            {mealInfos.strInstructions}
          </p>
          <iframe
            width="853"
            height="480"
            data-testid="video"
            src={ ytVideo }
            title="YouTube Video Player"
            frameBorder="0"
            allowFullScreen
          />
          <div className="carousel">
            {drinkRecomendation ? drinksReco.slice(0, six).map((element, i) => (
              <div key={ i } data-testid={ `${i}-recommendation-card` }>
                <p data-testid={ `${i}-recommendation-title` }>{element.strDrink}</p>
                <img className="img-carousel" src={ element.strDrinkThumb } alt="drink" />
              </div>
            )) : null}
          </div>
          {!recipeIsDone && (
            <button
              data-testid="start-recipe-btn"
              className="startBtn"
              type="button"
            >
              Start Recipe

            </button>
          )}
        </div>

      )
        : null}

      {location.pathname.includes('/drinks') ? (

        <div>
          <img
            src={ drinkInfos.strDrinkThumb }
            alt="imagem"
            data-testid="recipe-photo"
          />
          <p
            data-testid="recipe-title"
          >
            {drinkInfos.strDrink}

          </p>
          <p
            data-testid="recipe-category"
          >
            {drinkInfos.strCategory}
            {drinkInfos.strAlcoholic}
          </p>
          <h4>Ingredientes: </h4>
          {
            ingredientsAndMeasures.ingredients.map((el1, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ el1[0] }
              >
                {el1[1]}
              </p>
            ))
          }
          <h4>Medidas: </h4>
          {
            ingredientsAndMeasures.measures.map((e1, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ e1[0] }
              >
                {e1[1]}
              </p>
            ))
          }
          <p
            data-testid="instructions"
          >
            {drinkInfos.strInstructions}
          </p>
          <div className="carousel">
            {foodRecomendation ? mealsReco.slice(0, six).map((element, i) => (
              <div key={ i } data-testid={ `${i}-recommendation-card` }>
                <p data-testid={ `${i}-recommendation-title` }>{element.strMeal}</p>
                <img className="img-carousel" src={ element.strMealThumb } alt="drink" />
              </div>
            )) : null}
          </div>
          {recipeIsDone || (
            <button
              data-testid="start-recipe-btn"
              className="startBtn"
              type="button"
            >
              Start Recipe

            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
export default RecipeDetails;
