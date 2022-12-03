import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './service';

describe('Testing the Recipes Component', () => {
  test('Testing if some tags exists on meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals/52977'));

    expect(history.location.pathname).toBe('/meals/52977');
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();

    const ingredient = await screen.findAllByTestId('0-ingredient-name-and-measure');
    expect(ingredient[0]).toBeInTheDocument();
    expect(ingredient[1]).toBeInTheDocument();
  });
  test('Testing if some tags exists on drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks/15997'));

    expect(await screen.findByText(/Ordinary/i)).toBeInTheDocument();

    const ingredient = await screen.findAllByTestId('0-ingredient-name-and-measure');
    expect(ingredient[0]).toBeInTheDocument();
    expect(ingredient[1]).toBeInTheDocument();

    const carouselItem = await screen.findByTestId('0-recommendation-card');
    expect(carouselItem).toBeInTheDocument();
  });
  test('Testing if some tags exists on drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks/15454997'));

    expect(await screen.findByText(/Ingredientes/i)).toBeInTheDocument();
  });
});
