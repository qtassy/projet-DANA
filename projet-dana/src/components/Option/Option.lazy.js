import React, { lazy, Suspense } from 'react';

const LazyOption = lazy(() => import('./Option'));

const Option = props => (
  <Suspense fallback={null}>
    <LazyOption {...props} />
  </Suspense>
);

export default Option;
