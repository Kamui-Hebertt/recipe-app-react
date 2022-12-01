import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCategory from '../components/MealCategory';
import Recipes from '../components/Recipes';
import FoodContext from '../context/FoodContext';

function Meals() {
  const { showingRecipes } = useContext(FoodContext);
  return (
    <div>
      <Header search pageName="Meals" />
      <MealCategory />
      {showingRecipes.initial && <Recipes />}
      <Footer />
    </div>
  );
}

export default Meals;
