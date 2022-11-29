import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const history = useHistory();
  const { search, pageName } = props;
  return (
    <section>
      {search ? (
        <img src={ searchIcon } data-testid="search-top-btn" alt="profile" />
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
    </section>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
