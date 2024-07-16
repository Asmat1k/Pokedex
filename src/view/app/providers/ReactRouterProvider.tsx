import { lazy, type FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const HomePage = lazy(() => import('@/view/pages/home/Home'));
const CatchedPage = lazy(() => import('@/view/pages/catched/Catched'));
const DetailedPage = lazy(() => import('@/view/pages/detailed/Detailed'));
const ErrorPage = lazy(() => import('@/view/pages/notFound/NotFound'));
import { Layout } from '@/view/pages/layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />} path='/'>
      <Route index element={<HomePage />} />
      <Route element={<CatchedPage />} path='catched' />
      <Route element={<DetailedPage />} path='pokemon/:id' />
    </Route>
  )
);

const ReactRouterProvider: FC = () => <RouterProvider router={router} />;

export { ReactRouterProvider };
