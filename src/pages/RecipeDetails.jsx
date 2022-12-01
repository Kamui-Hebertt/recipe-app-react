import React, { useContext } from 'react';
import DetailsPageContext from '../context/DetailsPageContext';
// import { useLocation } from 'react-router-dom';

function RecipeDetails() {
  //   const location = useLocation();
  const {
    ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo,
  } = useContext(DetailsPageContext);

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
        ingredientsAndMeasures.ingredients.map((el, index) => (
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
        ingredientsAndMeasures.measures.map((e, index) => (
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

export default RecipeDetails;
