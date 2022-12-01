import React from 'react';
import Header from '../components/Header';
import MealCategory from '../components/MealCategory';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <Header search pageName="Meals" />
      <MealCategory />
      <Recipes />

    </div>
  );
}

export default Meals;
