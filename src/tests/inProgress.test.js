import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './service';

describe('Tests in progress screen', () => {
  test('should render by id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/178319/in-progress');
    });

    expect(await screen.findByText('Hpnotiq')).toBeInTheDocument();
  });
  test('should render by id on meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/53060/in-progress');
    });

    expect(await screen.findByText('Filo Pastry')).toBeInTheDocument();
  });
});
