import React, { useState } from 'react';
import Card from '../components/doneRecipes/Card';
import Header from '../components/Header';

function DoneRecipes() {
  const [pressedBtn, setPressedBtn] = useState('all');
  const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  function showCards() {
    if (getRecipes === null || getRecipes.length < 1) {
      return <p>Você não finalizou nenhuma receita</p>;
    }
    if (pressedBtn === 'all') {
      return (getRecipes.map((recipe, index) => (
        <Card
          id={ recipe.id }
          category={ recipe.category }
          name={ recipe.name }
          image={ recipe.image }
          doneDate={ recipe.doneDate }
          tags={ recipe.tags }
          key={ recipe.id }
          index={ index }
          type={ recipe.type }
          nationality={ recipe.nationality }
          alcoholicOrNot={ recipe.alcoholicOrNot }
        />
      )));
    }
    return (getRecipes.filter((recipe) => recipe.type === pressedBtn)
      .map((recipe, index) => (
        <Card
          id={ recipe.id }
          category={ recipe.category }
          name={ recipe.name }
          image={ recipe.image }
          doneDate={ recipe.doneDate }
          tags={ recipe.tags }
          key={ recipe.id }
          index={ index }
          type={ recipe.type }
          alcoholicOrNot={ recipe.alcoholicOrNot }
          nationality={ recipe.nationality }
        />
      )));
  }
  return (
    <section>
      <Header search={ false } pageName="Done Recipes" />
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setPressedBtn('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setPressedBtn('meal') }
        >
          Meal
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setPressedBtn('drink') }
        >
          Drinks
        </button>
      </section>
      <ul>
        { showCards() }
      </ul>
    </section>
  );
}

export default DoneRecipes;
