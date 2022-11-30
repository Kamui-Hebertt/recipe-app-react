import { useEffect, useMemo, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import fetchSearchDrink from '../services/fetchSearchDrink';
import fetchSearchFood from '../services/fetchSearchFood';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const handleSearchClick = async () => {
    if (searchFilter === 'first-letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (location.pathname === '/meals') {
      setFoodRecipes(await fetchSearchFood(searchValue, searchFilter));
    } else if (location.pathname === '/drinks') {
      setDrinkRecipes(await fetchSearchDrink(searchValue, searchFilter));
    }
  };

  useEffect(() => {
    if (foodRecipes.length === 1) {
      history.push(`/meals/${foodRecipes[0].idMeal}`);
    }
    if (drinkRecipes.length === 1) {
      console.log(drinkRecipes[0].idDrink);
      history.push(`/drinks/${drinkRecipes[0].idDrink}`);
    }
  }, [JSON.stringify(foodRecipes), JSON.stringify(drinkRecipes)]);

  const value = useMemo(() => ({ searchFilter,
    setSearchFilter,
    searchValue,
    setSearchValue,
    handleSearchClick,
    foodRecipes,
    drinkRecipes,
  }), [searchFilter, searchValue, foodRecipes, drinkRecipes]);
  return (
    <FoodContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {}.isRequired;
