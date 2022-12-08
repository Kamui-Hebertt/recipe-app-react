import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

const startBtnTestId = 'start-recipe-btn';
const mealURL = '/meals/52977';
const drinkURL = '/drinks/15997';

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

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testing the Recipes Component', () => {
  test('Testing if some tags exists on meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(mealURL));

    expect(history.location.pathname).toBe(mealURL);
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();

    const ingredient = await screen.findAllByTestId('0-ingredient-name-and-measure');
    expect(ingredient[0]).toBeInTheDocument();
    expect(ingredient[1]).toBeInTheDocument();

    const startBtn = screen.getByTestId(startBtnTestId);
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);
    const checkURL = history.location.pathname.includes('in-progress');
    expect(checkURL).toBe(true);

    act(() => history.push(mealURL));
    const startBtn2 = screen.getByTestId(startBtnTestId);
    expect(startBtn2.innerHTML).toBe('Continue Recipe');
  });
  test('Testing if some tags exists on drinks', async () => {
    navigator.clipboard.writeText = jest.fn();
    const { history } = renderWithRouter(<App />);
    act(() => history.push(drinkURL));

    expect(await screen.findByText(/Ordinary/i)).toBeInTheDocument();

    const ingredient = await screen.findAllByTestId('0-ingredient-name-and-measure');
    expect(ingredient[0]).toBeInTheDocument();
    expect(ingredient[1]).toBeInTheDocument();

    const carouselItem = await screen.findByTestId('0-recommendation-card');
    expect(carouselItem).toBeInTheDocument();

    const startBtn = screen.getByTestId(startBtnTestId);
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);
    const checkURL = history.location.pathname.includes('in-progress');
    expect(checkURL).toBe(true);
    // const shareBtn = screen.getByTestId('share-btn');
    // userEvent.click(shareBtn);

    act(() => history.push(drinkURL));
    const startBtn2 = screen.getByTestId(startBtnTestId);
    expect(startBtn2.innerHTML).toBe('Continue Recipe');
  });
  test('Testing if some tags exists on drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks/15454997'));

    expect(await screen.findByText(/Ingredientes/i)).toBeInTheDocument();
  });
  test('Testing having local storage on doneRecipes meals', async () => {
    navigator.clipboard.writeText = jest.fn();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouter(<App />);
    act(() => history.push(mealURL));

    expect(await screen.findByText(/Ingredientes/i)).toBeInTheDocument();
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const shareBtn = screen.getByTestId('share-btn');

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(shareBtn);
  });
  test('Testing having local storage on doneRecipes drinks', async () => {
    navigator.clipboard.writeText = jest.fn();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouter(<App />);
    act(() => history.push(drinkURL));

    expect(await screen.findByText(/Ingredientes/i)).toBeInTheDocument();
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const shareBtn = screen.getByTestId('share-btn');

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(shareBtn);
  });
});
