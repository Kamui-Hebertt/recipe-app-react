import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './service';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const doneRecipesRoute = '/done-recipes';
const filterDrinkTestId = 'filter-by-drink-btn';

describe('Tests Done Recipe Page', () => {
  test('Testing if profile button is showing', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(doneRecipesRoute));

    expect(history.location.pathname).toBe(doneRecipesRoute);
    expect(await screen.findByTestId(filterDrinkTestId)).toBeInTheDocument();
  });
  test('Testing if profile button is showing', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouter(<App />);

    act(() => history.push(doneRecipesRoute));

    expect(history.location.pathname).toBe(doneRecipesRoute);
    expect(await screen.findByTestId(filterDrinkTestId)).toBeInTheDocument();

    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();

    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId(filterDrinkTestId);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(mealBtn);
    userEvent.click(allBtn);
    userEvent.click(drinkBtn);
    userEvent.click(shareBtn);
  });
});
