/* eslint-disable react/jsx-max-depth */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import './Login.css';

import logo from '../assets/logo.png';

export default function Login() {
  const history = useHistory();
  const { setEmail, setPassword, disabled, email, password } = useContext(LoginContext);
  return (
    <div className="allContent">

      <div className="tomatoDiv">
        <img src={ logo } className="logo" alt="login" />
        {' '}

      </div>
      <section className="allSection">

        <form>
          <h1 className="login">Login</h1>
          <section className="field">
            <div className="input">
              <input
                id="emailInp"
                type="email"
                placeholder="Email"
                value={ email }
                data-testid="email-input"
                onChange={ ({ target }) => setEmail(target.value) }
              />
              <input
                id="emailInp2"
                type="password"
                placeholder="Password"
                value={ password }
                data-testid="password-input"
                onChange={ ({ target }) => setPassword(target.value) }
              />
            </div>
            <button
              type="button"
              data-testid="login-submit-btn"
              className="loginBtn"
              disabled={ disabled }
              onClick={ () => {
                const user = {
                  email,
                };
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/meals');
              } }
            >
              Login

            </button>
          </section>
        </form>
      </section>
    </div>
  );
}
