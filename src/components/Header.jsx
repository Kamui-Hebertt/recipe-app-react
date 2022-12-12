import PropTypes from 'prop-types';
import { useContext, React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FoodContext from '../context/FoodContext';
import profile from '../images/profile.png';
import searchIcon from '../images/search.png';
import SearchBar from './SearchBar';
import './Header.css';
import mealIcon from '../images/mealIcon.svg';
import Recipe from '../images/recipeIcon.png';
import app from '../images/App.png';
import recipes from '../images/Recipes.png';

function Header(props) {
  const history = useHistory();
  const { searchValue, setSearchValue } = useContext(FoodContext);
  const { search, pageName } = props;
  const [searchBar, setSearchBar] = useState(false);

  return (
    <section className="all-btn">

      <div className="all">
        <img src={ Recipe } id="iconR" alt="recipe icon" />
        <div className="title">
          <img src={ app } id="app" alt="app" />
          <img src={ recipes } id="re" alt="recipe" />
        </div>
        {search ? (
          <button
            className="searchBtn"
            type="button"
            data-testid="search-top-btn"
            onClick={ () => (searchBar === false
              ? setSearchBar(true) : setSearchBar(false)) }
          >

            <img src={ searchIcon } alt="profile" />
          </button>
        ) : null}

        <button
          name="profile"
          id="profile"
          data-testid="profile-top-btn"
          className="profileBtn"
          alt="profile"
          onClick={ () => history.push('/profile') }
          type="button"
        >
          <img src={ profile } alt="profile" />

        </button>
      </div>

      <div data-testid="page-title" className="header-page-title">
        <img src={ mealIcon } alt="meal icon" className="mealIcon" />
        <p>{pageName }</p>
      </div>
      {searchBar ? (
        <div className="header-search-bar">
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
            value={ searchValue }
            onChange={ ({ target }) => setSearchValue(target.value) }
          />
          <SearchBar />
        </div>
      ) : null}
    </section>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
