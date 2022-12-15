import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.png';
// import iconFav2 from '../../images/whiteHeartIcon.svg';
import '../../pages/FavoriteRecipes.css';

function FavoriteCard({
  index,
  id,
  category,
  name,
  image,
  type,
  nationality,
  alcoholicOrNot,
}) {
  const checkType = type === 'meal' ? nationality : alcoholicOrNot;
  const [copy, setCopy] = useState(false);
  return (
    <div className="all-cards">
      <div key={ id } id={ id } className="recipe-card">
        <Link key={ id } to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
            className="image"
          />
        </Link>
        <div className="card-infos">
          <div>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="name"
            >
              { name }
            </p>
            <p
              data-testid={ `${index}-horizontal-top-text` }
              name="result-top-text"
            >
              {`${checkType} - ${category}`}
            </p>
          </div>
          { copy && <p>Link copied!</p>}
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="button"
            src={ blackHeartIcon }
            className="favoriteBtnF"
            onClick={ () => {
              const favorite = document.getElementById(id);
              favorite.parentNode.removeChild(favorite);
              const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

              if (getRecipes.length > 1) {
                const newFavorite = getRecipes.filter((value) => value.id !== id);
                localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
              } else {
                localStorage.setItem('favoriteRecipes', '[]');
              }
            } }
          >
            <img
              src={ blackHeartIcon }
              alt="Heart Icon"
            />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            className="shareBtnF"
            onClick={ () => {
              setCopy(true);
              navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
            } }
          >
            <img
              src={ shareIcon }
              alt="Share Button"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default FavoriteCard;
