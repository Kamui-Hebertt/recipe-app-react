import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const checkingFavorite = (recipe) => {
  const returnToStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (returnToStorage) {
    const recipeId = recipe.mealId || recipe.drinkId;
    const searchFavoriteId = returnToStorage.some(({ id }) => id === recipeId);
    return searchFavoriteId;
  }
  return false;
};

function FavoriteButton({ recipe }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(checkingFavorite(recipe));
  }, []);

  const addFavoriteRecipeBtn = () => {
    const recipeId = recipe.mealId || recipe.drinkId;
    const returnToStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite) {
      const favoriteIdFilter = returnToStorage.filter(({ id }) => id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteIdFilter));
      setFavorite(false);
    } else {
      const recipeStorage = [
        ...returnToStorage, {
          id: recipe.mealId || recipe.drinkId,
          type: recipe.mealId ? 'meal' : 'drink',
          nationality: recipe.strArea || '',
          category: recipe.strCategory || '',
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strMeal || recipe.strDrink,
          image: recipe.strMealThumb || recipe.strDrinkThumb,
        }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipeStorage));
      setFavorite(true);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => addFavoriteRecipeBtn() }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-btn"
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.string),
}.isRequired;

export default FavoriteButton;
