import React from 'react';
import Header from '../components/Header';
import MealCategory from '../components/MealCategory';
import Footer from '../components/Footer';

function DrinkInProgress() {
  return (
    <div>
      <Header search pageName="Meals" />
      <MealCategory />

      <Footer />
    </div>
  );
}
export default DrinkInProgress;
