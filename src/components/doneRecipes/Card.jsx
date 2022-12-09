import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import icon from '../../images/shareIcon.svg';

function Card({
  index,
  id,
  category,
  name,
  image,
  doneDate,
  tags,
  type,
  nationality,
  alcoholicOrNot,
}) {
  console.log(tags);
  const checkType = type === 'meal' ? nationality : alcoholicOrNot;
  const [copy, setCopy] = useState(false);
  return (
    <li key={ id }>
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
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Done in: ${doneDate}`}
            </p>
            <br />
            <span>
              {tags && tags.map((tag) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {` ${tag}`}
                </span>
              ))}
            </span>
          </div>
        </Link>
        <div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ icon }
            onClick={ () => {
              navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
              setCopy(true);
            } }
          >
            Share
          </button>
          { copy && <p data-testid="URL-copiada">Link copied!</p>}
        </div>
      </div>
    </li>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default Card;
