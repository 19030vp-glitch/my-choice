import React, { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider, } from 'react-query'
import IndexSkeleton from './pages/IndexSkeleton';

const RoutesHandler = lazy(() => import('./pages/RoutesHandler'));
const App = () => {

  const queryClient = new QueryClient()


  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<IndexSkeleton />}>
          <RoutesHandler />
        </Suspense>
      </QueryClientProvider>

    </ >
  )
}

export default App