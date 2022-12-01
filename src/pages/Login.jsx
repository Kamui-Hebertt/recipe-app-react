import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import './Login.css';

export default function Login() {
  const history = useHistory();
  const { setEmail, setPassword, disabled, email, password } = useContext(LoginContext);
  return (
    <section>
      <form>
        <h1>Login</h1>
        <section>
          <input
            type="email"
            placeholder="Email"
            value={ email }
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <input
            type="password"
            placeholder="Password"
            value={ password }
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            className="loginBtn"
            disabled={ disabled }
            onClick={ () => {
              localStorage.setItem('mealToken', 1);
              localStorage.setItem('cocktailToken', 1);
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
  );
}
