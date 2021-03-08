import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RoomList from './RoomList';

describe('<RoomList />', () => {
  test('it should mount', () => {
    render(<RoomList />);
    
    const roomList = screen.getByTestId('RoomList');

    expect(roomList).toBeInTheDocument();
  });
});