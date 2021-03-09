import React, { lazy, Suspense } from 'react';

const LazyRoomList = lazy(() => import('./RoomList'));

const RoomList = props => (
  <Suspense fallback={null}>
    <LazyRoomList {...props} />
  </Suspense>
);

export default RoomList;
