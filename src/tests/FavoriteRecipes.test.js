import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

const favoriteRecipes = '/favorite-recipes';

describe('Tests Favorite Recipes Component', () => {
  test('Is the button redirecting to /profile?', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
  test('Is the button filtering by all?', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));
    const image = await screen.findAllByRole('img', { alt: 'name' });
    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const newImage = await screen.findAllByRole('img', { alt: 'name' });
    expect(image).toEqual(newImage);
  });
  test('On click event, the Share button should show the following message: Link copied!', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    const sharedText = screen.queryByText(/link copied/i);
    expect(sharedText).not.toBeInTheDocument();
  });
  test('On click event, the Meal button should filter the information about meal. ', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));
    const image = await screen.findAllByRole('img', { alt: 'name' });
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealBtn).toBeInTheDocument();
    userEvent.click(mealBtn);
    const newImage = await screen.findAllByRole('img', { alt: 'name' });
    expect(image).toEqual(newImage);
  });
  test('On click event, the Drink button should filter the information about drink.', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    const image = await screen.findAllByRole('img', { alt: 'name' });
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();
    userEvent.click(drinkBtn);
    const newImage = await screen.findAllByRole('img', { alt: 'name' });
    expect(image).toEqual(newImage);
  });
});
