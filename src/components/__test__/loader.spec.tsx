import { render } from '@testing-library/react';
import React from 'react';
import { Loader } from '../loader';

describe('<Loader />', () => {
  it('renders ok with props', () => {
    const { container } = render(<Loader size={10} color={'white'} />);
    expect(container.firstChild).toHaveClass('animate-spin w-10 h-10');
  });
  it('render without props', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('animate-spin w-5 h-5');
  });
});
