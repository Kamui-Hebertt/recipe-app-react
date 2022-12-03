import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import fetchSearchDrink from '../services/fetchSearchDrink';
import fetchSearchFood from '../services/fetchSearchFood';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [foodLocal, setFoodLocal] = useState([]);
  const [changeBtn, setChangeBtn] = useState(false);
  const [mealFilter, setMealFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [showingRecipes, setShowingRecipes] = useState({
    initial: true,
    category: false,
  });
  const [recipes, setRecipes] = useState([]);
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
    const fetchFoods = async () => {
      if (mealFilter === 'all') {
        const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await request.json();
        setRecipes(data);
      // fazer um estado filterBtn = {type: all ou meal ou drink}, category: vai vir do botão ex(beef)}
      // fazer outro if e usar o link abaixo para fetch dinamico
      // 'https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterBtn.category}'
      // não esquecer dependencia
      } else {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealFilter}`);
        const data = await request.json();
        setRecipes(data);
      }
    };
    const fetchDrinks = async () => {
      if (mealFilter === 'all') {
        const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await request.json();
        setRecipes(data);
      } else {
        const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${mealFilter}`);
        const data = await request.json();
        setRecipes(data);
      }
    };
    if (location.pathname === '/meals') {
      fetchFoods();
    } else if (location.pathname === '/drinks') {
      fetchDrinks();
    }
  }, [location.pathname, mealFilter]);

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
    changeBtn,
    setChangeBtn,
    searchValue,
    setSearchValue,
    handleSearchClick,
    foodRecipes,
    drinkRecipes,
    mealFilter,
    setMealFilter,
    recipes,
    showingRecipes,
    foodLocal,
    setFoodLocal,

  }), [searchFilter,
    changeBtn,
    searchValue,
    foodRecipes,
    drinkRecipes,
    mealFilter,
    recipes,
    showingRecipes,
    foodLocal,
  ]);
  return (
    <FoodContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {}.isRequired;
