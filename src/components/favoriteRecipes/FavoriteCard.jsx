import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import iconShare from '../../images/shareIcon.svg';
import iconFav from '../../images/blackHeartIcon.svg';
// import iconFav2 from '../../images/whiteHeartIcon.svg';

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
    <li key={ id } id={ id }>
      <div>
        <Link key={ id } to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
            width="100px"
            height="100px"
          />
          <div>
            <p
              data-testid={ `${index}-horizontal-top-text` }
              name="result-top-text"
            >
              {`${checkType} - ${category}`}
            </p>
            <br />
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </p>
            <br />
          </div>
        </Link>
        <div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ iconShare }
            onClick={ () => {
              navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
              setCopy(true);
            } }
          >
            Share
          </button>
          { copy && <p>Link copied!</p>}
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="button"
            src={ iconFav }
            onClick={ () => {
              const favorite = document.getElementById(id);
              favorite.parentNode.removeChild(favorite);
              const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
               || JSON.parse(localStorage.getItem('setFavoriteRecipes'));
              if (getRecipes.length > 1) {
                const newFavorite = getRecipes.filter((value) => value.id !== id);
                localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
              } else {
                localStorage.setItem('favoriteRecipes', '[]');
              }
            } }
          >
            Unfavorite

          </button>
        </div>
      </div>
    </li>
  );
}

FavoriteCard.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default FavoriteCard;
