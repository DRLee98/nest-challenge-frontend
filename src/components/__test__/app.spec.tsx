import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { isLoggedInVar } from '../../apollo';
import App from '../App';

jest.mock('../../routers/logged-out-router', () => {
  return {
    LoggedOutRouter: () => <span>logged out</span>,
  };
});
jest.mock('../../routers/logged-in-router', () => {
  return {
    LoggedInRouter: () => <span>logged in</span>,
  };
});

describe('<App />', () => {
  it('renders Logged out router', () => {
    const { debug, getByText } = render(<App />);
    // debug();
    getByText('logged out');
  });

  it('renders Logged in router', async () => {
    const { debug, getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    // debug();
    getByText('logged in');
  });
});
