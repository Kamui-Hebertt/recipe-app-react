import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

const favoriteRecipes = '/favorite-recipes';

const favoriteRecipesLocal = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

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
  test('', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesLocal));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    const img1 = screen.getByTestId('0-horizontal-image');
    const name = screen.getByTestId('0-horizontal-name');
    const favorite = screen.getByTestId('0-horizontal-favorite-btn');
    const favorite2 = screen.getByTestId('1-horizontal-favorite-btn');
    const share = screen.getByTestId('1-horizontal-share-btn');
    expect(img1).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(share).toBeInTheDocument();

    userEvent.click(favorite);
    userEvent.click(share);
    userEvent.click(favorite2);
  });
  test('', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesLocal));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mBtn = screen.getByTestId('filter-by-meal-btn');
    const dBtn = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(mBtn);
    userEvent.click(dBtn);
    userEvent.click(allBtn);
  });
});
