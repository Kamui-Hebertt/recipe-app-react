import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';
import { drinks } from '../../cypress/mocks/drinks';

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('test', () => {
  test('teste2', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(await screen.findByText('Drinks'));
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });
    const searchMenu = screen.getByTestId('search-top-btn');
    userEvent.click(searchMenu);

    expect(await screen.getByText(/first letter/i)).toBeVisible();
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'vodka');
    const ingredientBtn = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientBtn);
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    expect(await screen.findByText('GG')).toBeInTheDocument();
    const element = screen.getByTestId('0-recipe-card');
    expect(element).toBeInTheDocument();

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'Aquamarine');
    const nameBtn = screen.getByTestId('name-search-radio');
    userEvent.click(nameBtn);
    userEvent.click(searchBtn);
  });
  test.skip('teste', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(await screen.findByText('Drinks'));

    const searchMenu = screen.getByTestId('search-top-btn');
    userEvent.click(searchMenu);

    expect(await screen.getByText(/first letter/i)).toBeVisible();
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'a');
    const ingredientBtn = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientBtn);
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
  });
});
