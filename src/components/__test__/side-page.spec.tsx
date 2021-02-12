import { render } from '@testing-library/react';
import React from 'react';
import { SidePage } from '../side-page';

describe('<SidePage />', () => {
  it('render ok', () => {
    const { debug, getByText } = render(<SidePage />);
    getByText('Tony Podcast');
  });
});
