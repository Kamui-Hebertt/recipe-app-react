import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

const emailTest = 'name@example.com';
const passwordTest = '1234567';

describe('Testing the Peofile Component', () => {
  test('is the user email on the screen?', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, passwordTest);

    const enterButton = screen.getByRole('button', { name: /enter/i });
    userEvent.click(enterButton);

    history.push('/profile');

    expect(screen.getByRole('heading', { level: 3, emailTest })).toBeInTheDocument();
  });
  test('is there a button to redirect to /favorite-recipes?', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, passwordTest);

    const enterButton = screen.getByRole('button', { name: /enter/i });
    userEvent.click(enterButton);

    history.push('/profile');

    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    userEvent.click(favoriteBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('is there a button which redirects to  /done-recipes?', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, passwordTest);

    const enterButton = screen.getByRole('button', { name: /enter/i });
    userEvent.click(enterButton);

    history.push('/profile');

    const doneBtn = screen.getByRole('button', { name: /done/i });
    userEvent.click(doneBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });
  test('is there a logout button which redirects to /login?', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, passwordTest);

    const enterButton = screen.getByRole('button', { name: /enter/i });
    userEvent.click(enterButton);

    history.push('/profile');

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
