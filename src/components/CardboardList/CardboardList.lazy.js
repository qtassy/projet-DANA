import React, { lazy, Suspense } from 'react';

const LazyCardboardList = lazy(() => import('./CardboardList'));

const CardboardList = props => (
  <Suspense fallback={null}>
    <LazyCardboardList {...props} />
  </Suspense>
);

export default CardboardList;
