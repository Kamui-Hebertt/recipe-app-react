import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './service';

describe('Testing the Recipes Component', () => {
  test('Testing if some tags exists on the screen', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    const btnBeef = screen.getByRole('button', { name: /Beef/i });
    expect(btnBeef).toBeInTheDocument();
  });

  test('Testing if some tags exists on the screen', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const btnShake = screen.getByRole('button', { name: /Shake/i });
    expect(btnShake).toBeInTheDocument();
  });
});
