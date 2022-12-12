import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './service';

const emailTest = 'name@example.com';
const passwordTest = '1234567';

describe('Testing the Peofile Component', () => {
  test('is the user email on the screen?', async () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, passwordTest);

    const enterButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(enterButton);

    history.push('/profile');

    expect(await screen.findByRole('heading', { level: 3, emailTest })).toBeInTheDocument();
  });
  test('is there a button to redirect to /favorite-recipes?', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const favoriteBtn = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);

    const noRecipes = await screen.findByText('Você não favoritou nenhuma receita');
    expect(noRecipes).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('is there a button which redirects to  /done-recipes?', async () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, passwordTest);

    const enterButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(enterButton);

    history.push('/profile');

    const doneBtn = await screen.findByTestId('profile-done-btn');
    userEvent.click(doneBtn);

    const noRecipes = await screen.findByText('Você não finalizou nenhuma receita');
    expect(noRecipes).toBeInTheDocument();
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('is there a logout button which redirects to /login?', async () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, passwordTest);

    const enterButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(enterButton);

    history.push('/profile');

    const logoutBtn = await screen.findByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    expect(await screen.findByRole('button', { name: /login/i })).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
