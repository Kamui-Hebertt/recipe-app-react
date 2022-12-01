import React from 'react';
import DrinkCategory from '../components/DrinkCategory';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header search pageName="Drinks" />
      <DrinkCategory />
      <Recipes />
    </div>
  );
}

export default Drinks;
