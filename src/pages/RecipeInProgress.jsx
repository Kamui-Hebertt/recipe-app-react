import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FavoriteButton from '../components/recipeDetails/FavoriteButton';
import ShareButton from '../components/recipeDetails/ShareButton';

function MealInProgress() {
  const location = useLocation();
  const history = useHistory();
  const [fullRecipe, setFullRecipe] = useState(null);
  const [allDone, setAllDone] = useState(true);
  const initialChecked = localStorage.getItem('itemsDone')
    ? JSON.parse(localStorage.getItem('itemsDone'))
    : [];
  const checkedObj = initialChecked.reduce((acc, curr) => ({
    ...acc,
    [curr]: true,
  }), {});
  const [checked, setChecked] = useState({ ...checkedObj });
  const path = location.pathname.split('/')[1];

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
    getInProgressItem(id);
  }, []);

  const handleChecked = (ingredient) => {
    if (checked[ingredient]) {
      const local = JSON.parse(localStorage.getItem('itemsDone'));
      const filterLocal = local.filter((ele) => ele !== ingredient);
      localStorage.setItem('itemsDone', JSON.stringify(filterLocal));
      setChecked({ ...checked, [ingredient]: !checked[ingredient] });
    } else {
      const local = localStorage.getItem('itemsDone') !== null
        ? JSON.parse(localStorage.getItem('itemsDone'))
        : [];
      localStorage.setItem('itemsDone', JSON.stringify([...local, ingredient]));
      setChecked({ ...checked, [ingredient]: true });
    }
    const items = JSON.parse(localStorage.getItem('itemsDone'));
    const recipeIngredients = Object.entries(fullRecipe[path][0])
      .filter((ingredientArr2) => ingredientArr2[1] !== null
        && ingredientArr2[0].includes('strIngredient')
        && ingredientArr2[1].length > 1).map((e) => e[1]);
    const checkDisable = items.length === recipeIngredients.length;
    if (checkDisable) {
      setAllDone(false);
    } else {
      setAllDone(true);
    }
  };

  const handleFinish = (recipe) => {
    if (path === 'drinks') {
      const local = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      const obj = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: new Date().toISOString(),
        tags: recipe?.strTags?.split(',') || [],
      };
      localStorage.setItem('doneRecipes', JSON.stringify([...local, obj]));
      history.push('/done-recipes');
    } else {
      const local = JSON.parse(localStorage.getItem('doneRecipes')) !== null
        ? JSON.parse(localStorage.getItem('doneRecipes'))
        : [];
      const obj = {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        tags: recipe.strTags?.split(',') || [],
        doneDate: new Date().toISOString(),
      };
      localStorage.setItem('doneRecipes', JSON.stringify([...local, obj]));
      history.push('/done-recipes');
    }
  };

  return (
    <main>
      {location.pathname.includes('/drinks/') ? (
        <section>
          <div>

            {fullRecipe !== null
              && Object.entries(fullRecipe.drinks[0])
                .filter((ingredientArr) => ingredientArr[1] !== null
                  && ingredientArr[0].includes('strIngredient')
                  && ingredientArr[1].length > 1).map(([, ingredient], index) => (
                  (
                    <div
                      key={ index }
                      className="one-ingredient"
                    >
                      <label
                        htmlFor={ ingredient }
                        className={ checked[ingredient] ? 'done' : '' }
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <input
                          type="checkbox"
                          name={ ingredient }
                          id={ ingredient }
                          checked={ !!checked[ingredient] }
                          onChange={ () => handleChecked(ingredient) }
                        />
                        <p
                          data-testid="ingredient-step"
                        >
                          {ingredient}

                        </p>

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
                  disabled={ allDone }
                  onClick={ () => handleFinish(fullRecipe.drinks[0]) }
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
              {fullRecipe !== null
              && Object.entries(fullRecipe.meals[0])
                .filter((ingredientArr1) => ingredientArr1[1] !== null
                  && ingredientArr1[0].includes('strIngredient')
                  && ingredientArr1[1].length > 1)
                .map(([, ingredient1], index) => (
                  (
                    <div
                      key={ index }
                      className="one-ingredient"
                    >
                      <label
                        htmlFor={ ingredient1 }
                        className={ checked[ingredient1] ? 'done' : '' }
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <input
                          type="checkbox"
                          name={ ingredient1 }
                          id={ ingredient1 }
                          checked={ !!checked[ingredient1] }
                          onChange={ () => handleChecked(ingredient1) }
                        />
                        <p
                          data-testid="ingredient-step"
                        >
                          {ingredient1}
                        </p>
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
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ allDone }
              onClick={ () => handleFinish(fullRecipe.meals[0]) }
            >
              Finished Recipe

            </button>
          </section>
        )}
    </main>
  );
}

export default MealInProgress;
