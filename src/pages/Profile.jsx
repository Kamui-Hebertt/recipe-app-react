import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginContext from '../context/LoginContext';
import './profile.css';

function Profile() {
  const history = useHistory();
  const { emailProfile, setEmailProfile } = useContext(LoginContext);
  const timeOut = 300;

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail !== null) {
      setEmailProfile(userEmail);
    }
  }, []);

  return (

    <>
      <Header search={ false } pageName="Profile" />
      <div className="allProfile">
        <h3
          data-testid="profile-email"
        >
          {emailProfile.email}
        </h3>
        <section>
          <button
            id="enter"
            name="enter"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => {
              setTimeout(() => history.push('/done-recipes'), timeOut);
            } }
          >
            Done Recipes

          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => {
              setTimeout(() => history.push('/favorite-recipes'), timeOut);
            } }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              setEmailProfile('');
              setTimeout(() => history.push('/'), timeOut);
            } }
          >
            Logout
          </button>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
