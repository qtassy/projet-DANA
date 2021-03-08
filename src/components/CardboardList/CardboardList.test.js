import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardboardList from './CardboardList';

describe('<CardboardList />', () => {
  test('it should mount', () => {
    render(<CardboardList />);
    
    const cardboardList = screen.getByTestId('CardboardList');

    expect(cardboardList).toBeInTheDocument();
  });
});