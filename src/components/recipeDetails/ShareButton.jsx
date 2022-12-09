import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsPageContext from '../../context/DetailsPageContext';
import shareIcon from '../../images/shareIcon.svg';

const homePath = 'http://localhost:3000';
const clipboardCopy = require('clipboard-copy');

const oneSecond = 1000;

function ShareButton() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const {
    linkCopied,
    setLinkCopied,
  } = useContext(DetailsPageContext);

  const shareRecipe = () => {
    if (pathname.match(/in-progress/)) {
      const newPathName = pathname.replace('/in-progress', '');
      const newLinkRecipe = homePath + newPathName;
      clipboardCopy(newLinkRecipe);
      setTimeout(() => setLinkCopied(false), oneSecond);
      setLinkCopied(true);
    }
    const recipeLink = homePath + pathname;
    clipboardCopy(recipeLink);
    setTimeout(() => setLinkCopied(false), oneSecond);
    setLinkCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => shareRecipe() }
      >
        <img
          src={ shareIcon }
          alt="Share Button"
        />
      </button>
      <br />
      { linkCopied && <span>Link copied!</span>}
    </div>
  );
}

export default ShareButton;
