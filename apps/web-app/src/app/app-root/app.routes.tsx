import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loading } from '@example-app/shared/ui';

import { AppShell } from '../app-shell/AppShell';
import { AppHome } from '../app-shell/home/AppHome';
import { PageNotFound } from '../app-shell/not-found/PageNotFound';
import UsersRoutes from '../features/users/users.routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <AppShell />
          </Suspense>
        }
      >
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <AppHome />
            </Suspense>
          }
        ></Route>
        {/* Children routes are declared within AppShell @Code{ Outlet } directive */}
        <Route
          path="users/*"
          element={
            <Suspense fallback={<Loading />}>
              <UsersRoutes />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
