import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';

function RecipeDetails(props) {
  const [mealInfos, setMealInfos] = useState({});
  const [drinkInfos, setDrinkInfos] = useState({});
  const [ytVideo, setYtVideo] = useState('');
  const { id } = props;
  //   const location = useLocation();

  const mountIngredientsArr = () => {
    const first = 9;
    const last = 29;
    const objEntriesArr = Object.entries(mealInfos);
    return objEntriesArr.slice(first, last);
  };

  const mountMeasureArr = () => {
    const first = 29;
    const last = 49;
    const objEntriesArr = Object.entries(mealInfos);
    return objEntriesArr.slice(first, last);
  };

  useEffect(() => {
    const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchMeals = async () => {
      const request = await fetch(END_POINT);
      const data = await request.json();
      console.log(data.meals[0]);
      setMealInfos(data.meals[0]);
    };
    fetchMeals();
  }, [id]);

  useEffect(() => {
    const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i= ${id}`;
    const fetchDrinks = async () => {
      const request = await fetch(END_POINT);
      const data = await request.json();
      setDrinkInfos(data);
    };
    fetchDrinks();
  }, [id]);

  const replaceYTVideo = async () => {
    const ytURL = await mealInfos.strYoutube;
    const ytVideoReplace = await ytURL.replace('watch?v=', 'embed/');
    setYtVideo(ytVideoReplace);
  };
  replaceYTVideo();

  console.log(ytVideo);
  return (
    <div>
      <img
        src={ mealInfos.strMealThumb }
        alt="imagem"
        data-testid="recipe-photo"
      />
      <p
        data-testid="recipe-title"
      >
        {mealInfos.strMeal}

      </p>
      <p
        data-testid="recipe-category"
      >
        {mealInfos.strCategory}
      </p>
      <h4>Ingredientes:</h4>
      {
        mountIngredientsArr().map((el, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ el[0] }
          >
            {el[1]}
          </p>
        ))
      }
      <h4>Medidas:</h4>
      {
        mountMeasureArr().map((e, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ e[0] }
          >
            {e[1]}
          </p>
        ))
      }
      <p
        data-testid="instructions"
      >
        {mealInfos.strInstructions}
      </p>
      <iframe
        width="853"
        height="480"
        data-testid="video"
        src={ ytVideo }
        title="YouTube Video Player"
        frameBorder="0"
        allowFullScreen
      />
      {/* <img
        src={ drinkInfos.strDrinkThumb }
        alt="imagem"
        data-testid="recipe-photo"
      />
      <p
        data-testid="recipe-title"
      >
        {drinkInfos.strDrink}

      </p>
      <p
        data-testid="recipe-category"
      >
        {drinkInfos.strCategory}
      </p>
      <p>
       {drinkInfos.strCategory}
      </p>
      <h4>Ingredientes: </h4>
      {
        mountIngredientsArr().map((el, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ el[0] }
          >
            {el[1]}
          </p>
        ))
      }
      <h4>Medidas: </h4>
      {
        mountMeasureArr().map((e, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ e[0] }
          >
            {e[1]}
          </p>
        ))
      }
      <p
        data-testid="instructions"
      >
        {drinkInfos.strInstructions}
      </p> */}
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RecipeDetails;
