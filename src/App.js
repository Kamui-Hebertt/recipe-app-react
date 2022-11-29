import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodProvider from './context/FoodProvider';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
  return (

    <FoodProvider>
      <Switch>
        <Header />
        <Route exact path="/" component={ Login } />
      </Switch>
    </FoodProvider>
  );
}

export default App();
