import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import FoodProvider from './context/FoodProvider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import LoginProvider from './context/LoginProvider';
import RecipeDetails from './pages/RecipeDetails';
import DetailsPageProvider from './context/DetailsPageProvider';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <DetailsPageProvider>
      <FoodProvider>
        <LoginProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Meals } />
            <Route exact path="/meals/:id" component={ RecipeDetails } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/drinks/:id" component={ RecipeDetails } />
            <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </LoginProvider>
      </FoodProvider>
    </DetailsPageProvider>

  );
}

export default App;
