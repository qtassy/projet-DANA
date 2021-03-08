import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VirtualCarboard from './VirtualCarboard';

describe('<VirtualCarboard />', () => {
  test('it should mount', () => {
    render(<VirtualCarboard />);
    
    const virtualCarboard = screen.getByTestId('VirtualCarboard');

    expect(virtualCarboard).toBeInTheDocument();
  });
});