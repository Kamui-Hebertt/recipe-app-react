import { useMemo, useEffect, useState } from 'react';
import DetailsPageContext from './DetailsPageContext';

export default function DetailsPageProvider({ children }) {
  const [mealInfos, setMealInfos] = useState({});
  const [drinkInfos, setDrinkInfos] = useState({});
  const [ytVideo, setYtVideo] = useState('');
  const [ingredientsAndMeasures, setIngredientsAndMeasures] = useState({
    ingredients: [],
    measures: [],
  });

  const mountIngredientAndMeasuresArr = () => {
    const NINE = 9;
    const TWENTY_NINE = 29;
    const FORTY_NINE = 49;
    const objEntriesArr = Object.entries(mealInfos);
    const ingredientsArr = objEntriesArr.slice(NINE, TWENTY_NINE);
    const measuresArr = objEntriesArr.slice(TWENTY_NINE, FORTY_NINE);
    setIngredientsAndMeasures({ ...ingredientsAndMeasures, ingredients: ingredientsArr });
    setIngredientsAndMeasures({ ...ingredientsAndMeasures, measures: measuresArr });
  };
  mountIngredientAndMeasuresArr();

  console.log(ingredientsAndMeasures);

  useEffect(() => {
    const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchMeals = async () => {
      const request = await fetch(END_POINT);
      const data = await request.json();
      console.log(data.meals[0]);
      setMealInfos(data.meals[0]);
    };
    fetchMeals();
  }, []);

  useEffect(() => {
    const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i= ${id}`;
    const fetchDrinks = async () => {
      const request = await fetch(END_POINT);
      const data = await request.json();
      setDrinkInfos(data);
    };
    fetchDrinks();
  }, []);

  const ytVideoUrlConvert = async () => {
    const ytURL = await mealInfos.strYoutube;
    const ytVideoReplace = await ytURL.replace('watch?v=', 'embed/');
    setYtVideo(ytVideoReplace);
  };
  ytVideoUrlConvert();

  const value = useMemo(() => ({
    ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo,
  }), [ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo]);
  return (
    <DetailsPageContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </DetailsPageContext.Provider>
  );
}

DetailsPageProvider.propTypes = {}.isRequired;
