import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './service';

describe('Tests Header Component', () => {
  test('Testing if profile button is showing', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();

    expect(screen.getByText(/meals/i)).toBeInTheDocument();

    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
    userEvent.click(profileBtn);
  });
});
