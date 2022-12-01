import React from 'react';
import DrinkCategory from '../components/DrinkCategory';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header search pageName="Drinks" />
      <DrinkCategory />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
