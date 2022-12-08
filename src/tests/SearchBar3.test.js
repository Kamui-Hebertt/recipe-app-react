import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

describe('test', () => {
  test('teste2', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(await screen.findByText('Drinks'));
    const searchMenu = screen.getByTestId('search-top-btn');
    userEvent.click(searchMenu);

    expect(await screen.getByText(/first letter/i)).toBeVisible();
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'vodka');
    const nameBtn = screen.getByTestId('name-search-radio');
    userEvent.click(nameBtn);
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    expect(await screen.findByText('Long vodka')).toBeInTheDocument();

    const FLBtn = screen.getByTestId('first-letter-search-radio');
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'b');
    userEvent.click(FLBtn);
    userEvent.click(searchBtn);

    expect(await screen.findByText('B-52')).toBeInTheDocument();
  });
  test('teste3', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(await screen.findByText('Meals'));
    const searchMenu = screen.getByTestId('search-top-btn');
    userEvent.click(searchMenu);

    expect(await screen.getByText(/first letter/i)).toBeVisible();

    const searchInput = screen.getByTestId('search-input');
    const FLBtn = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'b');
    userEvent.click(FLBtn);
    userEvent.click(searchBtn);

    expect(await screen.findByText('Bakewell tart')).toBeInTheDocument();
  });
});
