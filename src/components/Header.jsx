import PropTypes from 'prop-types';
import React from 'react';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { search, pageName } = props;
  return (
    <section>
      {search ? (
        <img src={ searchIcon } data-testid="search-top-btn" alt="profile" />
      ) : null}
      <img src={ profile } data-testid="profile-top-btn" alt="profile" />
      <div data-testid="page-title">{pageName}</div>
    </section>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
