import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './service';

describe('Testing the Recipes Component', () => {
  const cardTest = '0-card-img';
  test('Testing if some tags exists on meals', async () => {
    const { history } = renderWithRouter(<App />);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/meals');

    const btnBeef = await screen.findByRole('button', { name: /Beef/i });
    expect(btnBeef).toBeInTheDocument();
    userEvent.click(btnBeef);
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
    expect(screen.getByTestId(cardTest)).toBeInTheDocument();
    userEvent.click(btnBeef);
    userEvent.click(screen.getByTestId(cardTest));
  });
  test('Testing if some tags exists on drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const btnShake = await screen.findByRole('button', { name: /Shake/i });
    expect(btnShake).toBeInTheDocument();
    userEvent.click(btnShake);
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
    expect(screen.getByTestId(cardTest)).toBeInTheDocument();
    userEvent.click(btnShake);
    userEvent.click(screen.getByTestId(cardTest));
  });
});
