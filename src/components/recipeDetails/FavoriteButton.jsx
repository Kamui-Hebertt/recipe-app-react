import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import DetailsPageContext from '../../context/DetailsPageContext';
import '../../pages/RecipeDetails.css';

// const checkingFavorite = (recipe) => {
//   const returnToStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
//   if (returnToStorage) {
//     const recipeId = recipe.idMeal || recipe.idDrink;
//     const searchFavoriteId = returnToStorage.some(({ id }) => id === recipeId);
//     return searchFavoriteId;
//   }
//   return false;
// };

function FavoriteButton() {
  const location = useLocation();
  const { mealInfos, drinkInfos } = useContext(DetailsPageContext);

  const [recipe, setRecipe] = useState({});
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/meals/')) {
      setRecipe(mealInfos);
    } else {
      setRecipe(drinkInfos);
    }
  }, [mealInfos, drinkInfos]);

  // useEffect(() => {
  //   setFavorite(checkingFavorite(recipe));
  // }, [id]);

  useEffect(() => {
    const recipeId = recipe.idMeal || recipe.idDrink;
    const returnToStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const checkLocal = Object.entries(returnToStorage)
      .some((el) => el[1].id.includes(recipeId));
    if (checkLocal) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [recipe]);

  const addFavoriteRecipeBtn = () => {
    const recipeId = recipe.idMeal || recipe.idDrink;
    const returnToStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite) {
      const favoriteIdFilter = returnToStorage.filter(({ el }) => el !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteIdFilter));
      setFavorite(false);
    } else {
      const recipeStorage = [
        ...returnToStorage, {
          id: recipe.idMeal || recipe.idDrink,
          type: recipe.idMeal ? 'meal' : 'drink',
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
    <div className="favoriteBtn">
      <button
        type="button"
        onClick={ () => addFavoriteRecipeBtn() }
        data-testid="favorite-btn"
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
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
