import React, { useContext, useEffect, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import FavoriteButton from '../components/recipeDetails/FavoriteButton';
import ShareButton from '../components/recipeDetails/ShareButton';
import DetailsPageContext from '../context/DetailsPageContext';
import './RecipeDetails.css';

function RecipeDetails() {
  const six = 6;
  const location = useLocation();
  const history = useHistory();
  const {
    ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo,
    setId,
    foodRecomendation,
    drinkRecomendation,
    changeBtn,
    id,
    setChangeBtn,
    checkContinueBtn,
  } = useContext(DetailsPageContext);

  const [mealsReco, setMealsReco] = useState([]);
  const [drinksReco, setDrinksReco] = useState([]);
  const [recipeIsDone, setRecipeIsDone] = useState(false);

  useEffect(
    () => {
      setId(location.pathname.split('/')[2]);
      if (localStorage.getItem('inProgressRecipes') === null) {
        const inProgressObj = {
          drinks: {
          },
          meals: {
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
      }
      checkContinueBtn();
    },
    [],
  );

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

  const handleClickStartRecipe = () => {
    const fromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (location.pathname.includes('/drinks/')) {
      fromLocal.drinks[id] = ingredientsAndMeasures.ingredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(fromLocal));
      history.push(`/drinks/${id}/in-progress`);
    } else {
      fromLocal.meals[id] = ingredientsAndMeasures.ingredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(fromLocal));
      history.push(`/meals/${id}/in-progress`);
    }
    setChangeBtn(true);
  };

  return (
    <div>
      {location.pathname.includes('/meals') && (
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
            <FavoriteButton />
            <ShareButton />
            {drinkRecomendation && drinksReco.slice(0, six).map((element2, i) => (
              <div key={ i } data-testid={ `${i}-recommendation-card` }>
                <p data-testid={ `${i}-recommendation-title` }>{element2.strDrink}</p>
                <img
                  className="img-carousel"
                  src={ element2.strDrinkThumb }
                  alt="drink"
                />
              </div>
            ))}
          </div>
          {!recipeIsDone && (
            <button
              data-testid="start-recipe-btn"
              className="startBtn"
              type="button"
              onClick={ handleClickStartRecipe }
            >
              {changeBtn ? 'Continue Recipe' : 'Start Recipe'}

            </button>
          )}
        </div>

      )}

      {location.pathname.includes('/drinks') && (

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
          <FavoriteButton />
          <ShareButton />
          <div className="carousel">
            {foodRecomendation && mealsReco.slice(0, six).map((element1, i) => (
              <div key={ i } data-testid={ `${i}-recommendation-card` }>
                <p data-testid={ `${i}-recommendation-title` }>{element1.strMeal}</p>
                <img className="img-carousel" src={ element1.strMealThumb } alt="drink" />
              </div>
            ))}
          </div>
          {!recipeIsDone && (
            <button
              data-testid="start-recipe-btn"
              className="startBtn"
              type="button"
              onClick={ handleClickStartRecipe }
            >
              {changeBtn ? 'Continue Recipe' : 'Start Recipe'}

            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default RecipeDetails;
