import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import LoginProvider from './context/LoginProvider';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/meals/:id-da-receita" component={ RecipeDetails } />
        <Route exact path="/meals/:id-da-receita/in-progress" component={ Drinks } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } />
        <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
