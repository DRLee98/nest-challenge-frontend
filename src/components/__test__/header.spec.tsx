import { ApolloProvider } from '@apollo/client';
import {
  getByText,
  queryByText,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { Header } from '../header';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMockClient } from 'mock-apollo-client';
import { MockedProvider } from '@apollo/client/testing'; // for gql query things
import { ME_QUERY } from '../../hooks/useMe';
import { isLoggedInVar } from '../../apollo';
import { LOCALSTORAGE_TOKEN } from '../../constants';
import userEvent from '@testing-library/user-event';

describe('<header />', () => {
  let renderResult: RenderResult;
  it('render ok without login', async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Router>
            <Header />
          </Router>
        </ApolloProvider>,
      );
    });
    expect(renderResult.container.firstChild).toHaveClass(
      'py-4 bg-gray-800 text-2xl text-white',
    );
  });

  it('render ok with login', async () => {
    window.onclick = jest.fn();
    window.localStorage.removeItem = jest.fn();

    await waitFor(() => {
      isLoggedInVar(true);
    });
    await waitFor(async () => {
      renderResult = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: 'some@thing.com',
                    role: '',
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );
    });
    // renderResult.debug();
    renderResult.getByText('Log out');
    const logoutBtn = renderResult.getByRole('button');
    userEvent.click(logoutBtn);
  });
});
