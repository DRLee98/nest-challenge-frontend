import { render } from '@testing-library/react';
import React from 'react';
import { Player } from '../player';

describe('<Player />', () => {
  it('render ok', () => {
    const { getByText } = render(<Player />);
    getByText('3 min');
  });
});
