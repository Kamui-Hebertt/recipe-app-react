import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

const pageTitle = 'page-title';
const mealsBottomBtn = 'meals-bottom-btn';
const drinksBottomBtn = 'drinks-bottom-btn';

describe('Tests Footer Component', () => {
  test('Is the buttom on the screen?', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const logo = screen.getByTestId(mealsBottomBtn);
    expect(logo).toBeInTheDocument();

    const drinks = screen.getByTestId(drinksBottomBtn);
    const meals = screen.getByTestId(mealsBottomBtn);
    expect(drinks).toBeInTheDocument();
    expect(meals).toBeInTheDocument();
  });
  test('Is it redirected to /drinks?', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    const drinks = screen.getByTestId(drinksBottomBtn);
    expect(drinks).toBeInTheDocument();

    const title = screen.getByTestId(pageTitle);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/drinks/i);
  });
  test('Is it redirected to /meals?', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('meals'));
    const meals = screen.getByTestId(mealsBottomBtn);
    expect(meals).toBeInTheDocument();

    const title = screen.getByTestId(pageTitle);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/meals/i);
  });
  test('Redirecting to /meals. ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const linkToMeal = screen.getByTestId(drinksBottomBtn);
    expect(linkToMeal).toBeInTheDocument();
    userEvent.click(linkToMeal);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });
});
test('Redirecting to /drinks. ', () => {
  const { history } = renderWithRouter(<App />);
  act(() => history.push('/drinks'));
  const linkToMeal = screen.getByTestId(mealsBottomBtn);
  expect(linkToMeal).toBeInTheDocument();
  userEvent.click(linkToMeal);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/meals');
});
