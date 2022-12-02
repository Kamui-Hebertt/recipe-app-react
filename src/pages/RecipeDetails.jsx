import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsPageContext from '../context/DetailsPageContext';
import './caroussel.css';

function RecipeDetails() {
  const six = 6;
  const location = useLocation();
  const {
    ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo,
    setId,
  } = useContext(DetailsPageContext);
  const { foodRecomendation, drinkRecomendation } = useContext(DetailsPageContext);

  useEffect(() => setId(location.pathname.split('/')[2]), []);
  // setId(location.pathname.split('/'));
  // console.log(ingredientsAndMeasures);
  console.log(foodRecomendation);
  // console.log(drinkRecomendation);
  const mealsreco = foodRecomendation.meals;
  //  console.log(mealsreco);
  // console.log(drinkRecomendation);

  return (
    <div>
      {location.pathname.includes('/meals') ? (
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
          {mealsreco.slice(0, six).map((element, i) => (
            <div className="carouPosition" key={ i }>
              <div
                id="carouselExampleControls"
                className="carousel slide caroussel"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      src={ element.strMealThumb }
                      alt={ element.strDrink }
                    />

                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>

      )
        : null}

      {location.pathname.includes('/drinks') ? (

        <div>
          <img
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
            {drinkInfos.strAlcoholic}
          </p>
          <h4>Ingredientes: </h4>
          {
            ingredientsAndMeasures.ingredients.map((el1, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ el1[0] }
              >
                {el1[1]}
              </p>
            ))
          }
          <h4>Medidas: </h4>
          {
            ingredientsAndMeasures.measures.map((e1, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ e1[0] }
              >
                {e1[1]}
              </p>
            ))
          }
          <p
            data-testid="instructions"
          >
            {drinkInfos.strInstructions}
          </p>
        </div>
      ) : null}
    </div>
  );
}
export default RecipeDetails;
