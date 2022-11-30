import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchSearchDrink from '../services/fetchSearchDrink';
import fetchSearchFood from '../services/fetchSearchFood';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const location = useLocation();

  console.log(location);

  const handleSearchClick = async () => {
    if (searchFilter === 'first-letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (location.pathname === '/meals') {
      setFoodRecipes(await fetchSearchFood(searchValue, searchFilter));
    } else if (location.pathname === '/drinks') {
      setDrinkRecipes(await fetchSearchDrink(searchValue, searchFilter));
    }
  };

  const value = useMemo(() => ({ searchFilter,
    setSearchFilter,
    searchValue,
    setSearchValue,
    handleSearchClick,
  }), [searchFilter, searchValue]);
  return (
    <FoodContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {}.isRequired;
