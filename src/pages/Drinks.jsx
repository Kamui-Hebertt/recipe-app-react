import React, { useContext } from 'react';
import DrinkCategory from '../components/DrinkCategory';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import FoodContext from '../context/FoodContext';

function Drinks() {
  const { showingRecipes } = useContext(FoodContext);

  return (
    <div>
      <Header search pageName="Drinks" />
      <DrinkCategory />
      {showingRecipes.initial && <Recipes />}
      <Footer />
    </div>
  );
}

export default Drinks;
