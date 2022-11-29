import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header(props) {
  const history = useHistory();
  const { search, pageName } = props;
  const [searchBar, setSearchBar] = useState(false);
  return (
    <section>
      {search ? (
        <button
          type="button"
          src={ searchIcon }
          data-testid="search-top-btn"
          onClick={ () => (searchBar === false
            ? setSearchBar(true) : setSearchBar(false)) }
        >

          <img src={ searchIcon } alt="profile" />
        </button>
      ) : null}
      <button
        data-testid="profile-top-btn"
        src={ profile }
        alt="profile"
        onClick={ () => history.push('/profile') }
        type="button"
      >
        <img src={ profile } alt="profile" />

      </button>
      <div data-testid="page-title">{pageName}</div>
      {searchBar ? <input type="text" data-testid="search-input" /> : null}
    </section>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
