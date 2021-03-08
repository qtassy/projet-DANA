import React, { lazy, Suspense } from 'react';

const LazyVirtualCarboard = lazy(() => import('./VirtualCarboard'));

const VirtualCarboard = props => (
  <Suspense fallback={null}>
    <LazyVirtualCarboard {...props} />
  </Suspense>
);

export default VirtualCarboard;
