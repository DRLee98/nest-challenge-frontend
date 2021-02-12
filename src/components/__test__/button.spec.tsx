import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { AccountButton } from '../button';

describe('<AccountButton/>', () => {
  it('should render ok with props', () => {
    const { getByText } = render(
      <AccountButton canClick={true} loading={false} actionText={'test'} />,
    );
    getByText('test');
  });
  it('should display loading', () => {
    const { debug, getByText, rerender } = render(
      <AccountButton canClick={true} loading={true} actionText={'test'} />,
    );
    getByText('Loading...');
  });
  it('should contain the class name with canClick false', () => {
    const { debug, getByText, container } = render(
      <AccountButton canClick={false} loading={true} actionText={'test'} />,
    );
    // debug();
    getByText('Loading...');
    expect(container.firstChild).toHaveClass('bg-gray-300 pointer-events-none');
  });
});
