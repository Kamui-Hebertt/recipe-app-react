import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, passwordTest);

    const enterButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(enterButton);

    history.push('/profile');

    const favoriteBtn = await screen.findByRole('button', { name: /favorite/i });
    userEvent.click(favoriteBtn);

    waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorite-recipes');
    }, { timeout: 500 });
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

    const doneBtn = await screen.findByRole('button', { name: /Done Recipes/i });
    userEvent.click(doneBtn);

    waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/done-recipes');
    }, { timeout: 500 });
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

    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);

    expect(await screen.findByRole('button', { name: /login/i })).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
