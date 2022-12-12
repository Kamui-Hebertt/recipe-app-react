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
    mealInfos, drinkInfos, ytVideo, setId,
    foodRecomendation, drinkRecomendation,
    changeBtn, id, setChangeBtn, checkContinueBtn,
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
          <div className="favoriteAndShare">
            <FavoriteButton />
            <ShareButton />
          </div>
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            {mealInfos.strCategory}
          </p>
          <div className="imageAndTitle">
            <h1
              data-testid="recipe-title"
              className="recipe-title"
            >
              {mealInfos.strMeal}

            </h1>
            <img
              src={ mealInfos.strMealThumb }
              alt="imagem"
              data-testid="recipe-photo"
              className="recipe-photo"
            />
          </div>
          <div className="ingredientsAndMeasuresParent">
            <div className="ingredientsAndMeasures">
              <div className="ingredients">
                <h4 className="ingredients-title">Ingredients:</h4>
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
              </div>
              <div className="measures">
                <h4 className="measures-title">Measures:</h4>
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
              </div>
            </div>
          </div>
          <div className="instructionsParent">
            <div className="instructions">
              <h4>Instructions:</h4>
              <p
                data-testid="instructions"
              >
                {mealInfos.strInstructions}
              </p>
            </div>
          </div>
          <h2 className="videoTitle">
            Video:
          </h2>
          <div className="video">
            <div>
              <iframe
                data-testid="video"
                src={ ytVideo }
                title="YouTube Video Player"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
          <div className="carousel">
            {drinkRecomendation && drinksReco.slice(0, six).map((element2, i) => (
              <div key={ i } data-testid={ `${i}-recommendation-card` }>
                <img
                  className="img-carousel"
                  src={ element2.strDrinkThumb }
                  alt="drink"
                />
                <p data-testid={ `${i}-recommendation-title` }>{element2.strDrink}</p>
              </div>
            ))}
          </div>
          <div className="StartBtnDiv">
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

        </div>

      )}

      {location.pathname.includes('/drinks') && (

        <div>
          <div className="favoriteAndShare">
            <FavoriteButton />
            <ShareButton />
          </div>
          <div
            data-testid="recipe-category"
            className="recipe-category"
          >
            <p>{drinkInfos.strCategory}</p>
            <p>{drinkInfos.strAlcoholic}</p>
          </div>
          <div className="imageAndTitle">
            <h1
              data-testid="recipe-title"
              className="recipe-title"
            >
              {drinkInfos.strDrink}
            </h1>
            <img
              src={ drinkInfos.strDrinkThumb }
              alt="imagem"
              data-testid="recipe-photo"
              className="recipe-photo"
            />
          </div>
          <div className="ingredientsAndMeasuresParent">
            <div className="ingredientsAndMeasures">
              <div className="ingredients">
                <h4 className="ingredients-title">Ingredients:</h4>
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
              </div>
              <div className="measures">
                <h4 className="measures-title">Measures:</h4>
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
              </div>
            </div>
          </div>
          <div className="instructionsParent">
            <div className="instructions">
              <h4>Instructions:</h4>
              <p
                data-testid="instructions"
              >
                {drinkInfos.strInstructions}
              </p>
            </div>
          </div>
          <div className="carousel">
            {foodRecomendation && mealsReco.slice(0, six).map((element1, i) => (
              <div key={ i } data-testid={ `${i}-recommendation-card` }>
                <img className="img-carousel" src={ element1.strMealThumb } alt="drink" />
                <p data-testid={ `${i}-recommendation-title` }>{element1.strMeal}</p>
              </div>
            ))}
          </div>
          <div className="StartBtnDiv">
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
        </div>
      )}
    </div>
  );
}
export default RecipeDetails;
