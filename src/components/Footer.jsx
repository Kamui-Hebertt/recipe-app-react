import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import FooterContext from '../context/FooterContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  // const { setActiveFilter } = useContext(FooterContext);
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <section>
        <Link to="/drinks" onClick={ () => history.push('/drinks') }>
          <img
            id="image1"
            src={ drinkIcon }
            alt="drinks"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals" onClick={ () => history.push('/meals') }>
          <img src={ mealIcon } alt="meals" data-testid="meals-bottom-btn" />
        </Link>
      </section>
    </footer>
  );
}
