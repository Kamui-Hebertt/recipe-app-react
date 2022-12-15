import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/favoriteRecipes/FavoriteCard';
import './FavoriteRecipes.css';
import AllsIcon from '../components/AllBtn.png';
import MealsIcon from '../components/food.png';
import DrinksIcon from '../components/drinks.png';

function FavoriteRecipes() {
  const [pressedBtn, setPressedBtn] = useState('all');
  const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  function showCards() {
    if (getRecipes === null || getRecipes.lenght === 0) {
      return <p>Você não favoritou nenhuma receita</p>;
    }
    if (pressedBtn === 'all') {
      return (getRecipes.map((recipe, index) => (
        <FavoriteCard
          id={ recipe.id }
          type={ recipe.type }
          nationality={ recipe.nationality }
          category={ recipe.category }
          alcoholicOrNot={ recipe.alcoholicOrNot }
          name={ recipe.name }
          image={ recipe.image }
          key={ recipe.id }
          index={ index }
        />
      )));
    }
    return (getRecipes.filter((recipe) => recipe.type === pressedBtn)
      .map((recipe, index) => (
        <FavoriteCard
          type={ recipe.type }
          nationality={ recipe.nationality }
          category={ recipe.category }
          alcoholicOrNot={ recipe.alcoholicOrNot }
          name={ recipe.name }
          image={ recipe.image }
          key={ recipe.id }
          index={ index }
          id={ recipe.id }
        />
      )));
  }
  return (
    <>
      <Header search={ false } pageName="Favorite Recipes" />
      <div className="BtnDiv">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setPressedBtn('all') }
          className="AllBtn"
        >
          <img
            src={ AllsIcon }
            alt="All Icon"
          />
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setPressedBtn('meal') }
          className="mealBtn"
        >
          <img
            src={ MealsIcon }
            alt="Meals Icon"
          />
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setPressedBtn('drink') }
          className="drinkBtn"
        >
          <img
            src={ DrinksIcon }
            alt="Drinks Icon"
          />
        </button>
      </div>
      <div>
        { showCards() }
      </div>
    </>
  );
}

export default FavoriteRecipes;
