import React, { lazy, Suspense } from 'react';

const LazyMakeMyCardboards = lazy(() => import('./MakeMyCardboards'));

const MakeMyCardboards = props => (
  <Suspense fallback={null}>
    <LazyMakeMyCardboards {...props} />
  </Suspense>
);

export default MakeMyCardboards;
