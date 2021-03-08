import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardboardFormular from './CardboardFormular';

describe('<CardboardFormular />', () => {
  test('it should mount', () => {
    render(<CardboardFormular />);
    
    const cardboardFormular = screen.getByTestId('CardboardFormular');

    expect(cardboardFormular).toBeInTheDocument();
  });
});