import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

describe('Tests Login Component', () => {
  test('Testing if profile button is showing', async () => {
    const { history } = renderWithRouter(<App />);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(loginBtn);

    expect(await screen.findByText(/meals/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals');
  });
});