import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './service';

describe('Tests SearchBar Component', () => {
  test('Testing searching for Meals on /meals', async () => {
    const { history } = renderWithRouter(<App />);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(loginBtn);

    expect(await screen.findByText(/meals/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals');
    const openSeachBtn = screen.getByTestId('search-top-btn');
    userEvent.click(openSeachBtn);
    const searchInput = screen.getByTestId('search-input');
    const ingredientInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firstLInput = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(ingredientInput);
    userEvent.click(searchBtn);

    userEvent.click(nameInput);
    userEvent.click(searchBtn);

    userEvent.click(firstLInput);
    userEvent.click(searchBtn);

    userEvent.type(searchInput, 'aa');
    userEvent.click(searchBtn);
  });

  test('Testing searching for Drinks on /drinks', async () => {
    const { history } = renderWithRouter(<App />);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(loginBtn);

    expect(await screen.findByText(/meals/i)).toBeInTheDocument();
    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');

    const openSeachBtn = screen.getByTestId('search-top-btn');
    userEvent.click(openSeachBtn);

    const ingredientInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firstLInput = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(ingredientInput);
    userEvent.click(searchBtn);

    userEvent.click(nameInput);
    userEvent.click(searchBtn);

    userEvent.click(firstLInput);
    userEvent.click(searchBtn);
  });
});
