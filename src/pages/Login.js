import React, { useContext } from 'react';
import ContextLogin from '../context/ContextLogin';

export default function Login() {
  const { setEmail, setPassword, disabled, email } = useContext(ContextLogin);
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
          >
            Submeter

          </button>
        </section>
      </form>
    </section>
  );
}
