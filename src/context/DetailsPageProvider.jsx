import { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsPageContext from './DetailsPageContext';

export default function DetailsPageProvider({ children }) {
  const location = useLocation();
  const [id, setId] = useState(location.pathname.split('/')[2]);
  const [mealInfos, setMealInfos] = useState({});
  const [drinkInfos, setDrinkInfos] = useState({});
  const [ytVideo, setYtVideo] = useState('');
  const [ingredientsAndMeasures, setIngredientsAndMeasures] = useState({
    ingredients: [],
    measures: [],
  });
  const [foodRecomendation, setFoodRecomendation] = useState([]);
  const [drinkRecomendation, setDrinkRecomendation] = useState([]);

  const foodRecomendationFunc = async () => {
    const foodRequest = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodJson = await foodRequest.json();
    setFoodRecomendation(foodJson.meals);
  };

  const drinkRecomendationFunc = async () => {
    const drinkRequest = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinkJson = await drinkRequest.json();
    setDrinkRecomendation(drinkJson.drinks);
  };

  useEffect(() => {
    foodRecomendationFunc();
    drinkRecomendationFunc();
  }, [mealInfos, drinkInfos]);

  const mountIngredientAndMeasuresArrTest = () => {
    const objEntriesArr = location.pathname.includes('/meals/')
      ? Object.entries(mealInfos)
      : Object.entries(drinkInfos);
    location.pathname.includes('/meals/');
    const ingredientsArr = objEntriesArr.filter((keyArr) => keyArr[0]
      .includes('Ingredient'));
    const measuresArr = objEntriesArr.filter((keyArr) => keyArr[0]
      .includes('Measure'));
    setIngredientsAndMeasures({ ingredients: ingredientsArr, measures: measuresArr });
  };

  useEffect(() => {
    if (location.pathname.includes('/meals/')) {
      const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const fetchMeals = async () => {
        const request = await fetch(END_POINT);
        const data = await request.json();
        setMealInfos(data.meals[0]);
      };
      fetchMeals();
    } else if (location.pathname.includes('/drinks/')) {
      const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const fetchDrinks = async () => {
        const request = await fetch(END_POINT);
        const data = await request.json();
        setDrinkInfos(data.drinks[0]);
      };
      fetchDrinks();
    }
  }, [id]);

  useEffect(() => {
    // if (location.pathname.includes('/meals')) {
    //   mountIngredientAndMeasuresArr();
    // } else if (location.pathname.includes('/drinks')) {
    //   mountIngredientAndMeasuresArrDrinks();
    // }
    mountIngredientAndMeasuresArrTest();
  }, [mealInfos, drinkInfos]);

  //   useEffect(() => {
  //     const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i= ${id}`;
  //     const fetchDrinks = async () => {
  //       const request = await fetch(END_POINT);
  //       const data = await request.json();
  //       setDrinkInfos(data);
  //     };
  //     fetchDrinks();
  //   }, [id]);

  useEffect(() => {
    if (mealInfos.strYoutube) {
      const ytVideoUrlConvert = () => {
        const ytURL = mealInfos.strYoutube;
        const ytVideoReplace = ytURL.replace('watch?v=', 'embed/');
        setYtVideo(ytVideoReplace);
      };
      ytVideoUrlConvert();
    }
  }, [mealInfos]);

  const value = useMemo(() => ({
    ingredientsAndMeasures,
    id,
    mealInfos,
    drinkInfos,
    ytVideo,
    setId,
    foodRecomendation,
    setFoodRecomendation,
    drinkRecomendation,
    setDrinkRecomendation,

  }), [ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo,
    foodRecomendation,
    drinkRecomendation,

    id]);
  return (
    <DetailsPageContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </DetailsPageContext.Provider>
  );
}

DetailsPageProvider.propTypes = {}.isRequired;
