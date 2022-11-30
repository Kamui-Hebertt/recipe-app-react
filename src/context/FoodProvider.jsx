import { useMemo, useState } from 'react';
import fetchSearch from '../services/fetchSearch';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [foodRecipes, setFoodRecipes] = useState([]);
  console.log(foodRecipes);

  const handleSearchClick = async () => {
    if (searchFilter === 'first-letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setFoodRecipes(await fetchSearch(searchValue, searchFilter));
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
