import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FavoriteButton from '../components/recipeDetails/FavoriteButton';
import ShareButton from '../components/recipeDetails/ShareButton';

function MealInProgress() {
  const location = useLocation();
  // const [item, setItem] = useState([]);
  const [fullRecipe, setFullRecipe] = useState(null);
  console.log(fullRecipe);

  const getInProgressItem = async (id) => {
    let END_POINT = '';
    if (location.pathname.includes('/meals/')) {
      END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const request = await fetch(END_POINT);
    const data = await request.json();
    setFullRecipe(data);
  };

  useEffect(() => {
    // const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const id = location.pathname.split('/')[2];
    // if (local !== null) {
    //   if (location.pathname.includes('/meals/')) {
    //     setItem(local.meals[id]);
    //   } else {
    //     setItem(local.drinks[id]);
    //   }
    // }
    getInProgressItem(id);
  }, []);

  return (
    <main>
      {location.pathname.includes('/drinks/') ? (
        <section>
          <div>

            {fullRecipe !== null
              && Object.entries(fullRecipe.drinks[0]).map((ingredientArr, index) => (
                ingredientArr[1] !== null
              && ingredientArr[0].includes('strIngredient') && ingredientArr[1].length > 1
                && (
                  <div
                    data-testid="ingredient-step"
                    key={ index }
                    className="one-ingredient"
                  >
                    <label htmlFor="checkbox" data-testid={ `${index}-ingredient-step` }>
                      <input type="checkbox" name="checkbox" id="checkbox" />
                      <p>{ingredientArr[1]}</p>

                    </label>
                  </div>
                )
              ))}

            <div>
              {fullRecipe !== null
            && (
              <div>
                <img
                  src={ fullRecipe.drinks[0].strDrinkThumb }
                  alt="drink"
                  data-testid="recipe-photo"
                />
                <p data-testid="recipe-title">{fullRecipe.drinks[0].strDrink}</p>
                <p data-testid="recipe-category">{fullRecipe.drinks[0].strCategory}</p>
                <p data-testid="instructions">{fullRecipe.drinks[0].strInstructions}</p>
                <ShareButton />
                <FavoriteButton />
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                >
                  Finished Recipe
                </button>
              </div>)}
            </div>
          </div>
        </section>
      )
        : fullRecipe !== null && (
          <section>
            <div>
              {Object.entries(fullRecipe.meals[0]).map((ingredientArr, index) => (
                ingredientArr[1] !== null
                  && ingredientArr[0].includes('strIngredient')
                   && ingredientArr[1].length > 1
          && (
            <div data-testid="ingredient-step" key={ index } className="one-ingredient">
              <label htmlFor="checkbox" data-testid={ `${index}-ingredient-step` }>
                <input type="checkbox" name="checkbox" id="checkbox" />
                <p>{ingredientArr[1]}</p>
              </label>
            </div>
          )
              ))}
            </div>
            <img
              src={ fullRecipe.meals[0].strMealThumb }
              alt="Meals"
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-title">{fullRecipe.meals[0].strMeal}</p>
            <p data-testid="recipe-category">{fullRecipe.meals[0].strCategory}</p>
            <p data-testid="instructions">{fullRecipe.meals[0].strInstructions}</p>
            <ShareButton />
            <FavoriteButton />
            <button type="button" data-testid="finish-recipe-btn">Finished Recipe</button>
          </section>
        )}
    </main>
  );
}

export default MealInProgress;
