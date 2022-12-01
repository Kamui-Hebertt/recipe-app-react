import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCategory from '../components/MealCategory';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <Header search pageName="Meals" />
      <MealCategory />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
