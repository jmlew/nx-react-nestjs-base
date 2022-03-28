import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppHome } from '@example-app/home/feature';
import { Loading } from '@example-app/shared/ui-common';
import { PageNotFound } from '@example-app/shell/ui';
import { UsersRoutes } from '@example-app/users/feature';

import { AppShell } from './AppShell';

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
