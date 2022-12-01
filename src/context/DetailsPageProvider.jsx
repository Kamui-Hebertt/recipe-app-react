import { useMemo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsPageContext from './DetailsPageContext';

export default function DetailsPageProvider({ children }) {
  const history = useHistory();
  const [id, setId] = useState('');
  const [mealInfos, setMealInfos] = useState({});
  const [drinkInfos, setDrinkInfos] = useState({});
  const [ytVideo, setYtVideo] = useState('');
  const [ingredientsAndMeasures, setIngredientsAndMeasures] = useState({
    ingredients: [],
    measures: [],
  });

  console.log(id);

  //   const id = history.location.pathname;

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

  console.log(ingredientsAndMeasures);

  useEffect(() => {
    const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchMeals = async () => {
      const request = await fetch(END_POINT);
      const data = await request.json();
      console.log(data.meals[0]);
      setMealInfos(data.meals[0]);
    };
    console.log('meals');
    fetchMeals();
    mountIngredientAndMeasuresArr();
  }, [id]);

  //   useEffect(() => {
  //     const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i= ${id}`;
  //     const fetchDrinks = async () => {
  //       const request = await fetch(END_POINT);
  //       const data = await request.json();
  //       setDrinkInfos(data);
  //     };
  //     console.log('drinks');
  //     fetchDrinks();
  //   }, [id]);

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
    setId,
  }), [ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo,
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
