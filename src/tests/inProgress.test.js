import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

describe('Tests in progress screen', () => {
  test('should render by id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/178319/in-progress');
    });

    expect(await screen.findByText('Hpnotiq')).toBeInTheDocument();
    const finishedBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishedBtn).toBeDisabled();

    userEvent.click(screen.getByTestId('0-ingredient-step'));
    userEvent.click(screen.getByTestId('1-ingredient-step'));
    userEvent.click(screen.getByTestId('2-ingredient-step'));
    expect(finishedBtn).not.toBeDisabled();

    userEvent.click(finishedBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('should render by id on meals', async () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/53060/in-progress');
    });

    expect(await screen.findByText('Filo Pastry')).toBeInTheDocument();

    const finishedBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishedBtn).toBeDisabled();

    userEvent.click(screen.getByTestId('0-ingredient-step'));
    userEvent.click(screen.getByTestId('1-ingredient-step'));
    userEvent.click(screen.getByTestId('2-ingredient-step'));
    userEvent.click(screen.getByTestId('3-ingredient-step'));
    userEvent.click(screen.getByTestId('4-ingredient-step'));
    userEvent.click(screen.getByTestId('5-ingredient-step'));
    expect(finishedBtn).not.toBeDisabled();

    userEvent.click(finishedBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
