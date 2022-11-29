import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodProvider from './context/FoodProvider';
import Header from './components/Header';

function App() {
  return (
    <FoodProvider>
      <Header />
    </FoodProvider>
  );
}

export default App;
