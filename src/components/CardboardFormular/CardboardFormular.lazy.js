import React, { lazy, Suspense } from 'react';

const LazyCardboardFormular = lazy(() => import('./CardboardFormular'));

const CardboardFormular = props => (
  <Suspense fallback={null}>
    <LazyCardboardFormular {...props} />
  </Suspense>
);

export default CardboardFormular;
