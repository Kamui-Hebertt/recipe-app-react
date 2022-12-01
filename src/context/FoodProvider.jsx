import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import fetchSearchDrink from '../services/fetchSearchDrink';
import fetchSearchFood from '../services/fetchSearchFood';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [mealFilter, setMealFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [showingRecipes, setShowingRecipes] = useState({
    initial: true,
    category: false,
  });
  const [initialRecipes, setInitialRecipes] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const handleSearchClick = async () => {
    if (searchFilter === 'first-letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (location.pathname === '/meals') {
      const data = await fetchSearchFood(searchValue, searchFilter);
      if (data == null || data.length < 1) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        setFoodRecipes([]);
      } else {
        setFoodRecipes(data);
        setShowingRecipes({ initial: false,
          category: false });
      }
    } else if (location.pathname === '/drinks') {
      const data = await fetchSearchDrink(searchValue, searchFilter);
      if (data.length < 1) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        setDrinkRecipes([]);
      } else {
        setDrinkRecipes(data);
      }
    }
  };

  useEffect(() => {
    // fazer um if para decidir o type do fetch
    const initialFetchFoods = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await request.json();
      setInitialRecipes(data);
      // fazer um estado filterBtn = {type: all ou meal ou drink}, category: vai vir do botão ex(beef)}
      // fazer outro if e usar o link abaixo para fetch dinamico
      // 'https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterBtn.category}'
      // não esquecer dependencia
    };
    const initialFetchDrinks = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await request.json();
      setInitialRecipes(data);
    };
    if (location.pathname === '/meals') {
      initialFetchFoods();
    } else if (location.pathname === '/drinks') {
      initialFetchDrinks();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (foodRecipes.length === 1) {
      history.push(`/meals/${foodRecipes[0].idMeal}`);
    }
    if (drinkRecipes.length === 1) {
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
    mealFilter,
    setMealFilter,
    initialRecipes,
    showingRecipes,
  }), [searchFilter,
    searchValue,
    foodRecipes,
    drinkRecipes,
    mealFilter,
    initialRecipes,
    showingRecipes]);
  return (
    <FoodContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {}.isRequired;
