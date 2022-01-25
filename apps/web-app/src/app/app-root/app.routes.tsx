import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Loading } from '@shared/components';
import { AppShell } from '@app-shell/AppShell';
import { AppHome } from '@app-shell/home/AppHome';
import { PageNotFound } from '@app-shell/not-found/PageNotFound';
import FeatureSampleRoutes from '@features/feature-sample/feature-sample.routes';

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
          path="/sample/*"
          element={
            <Suspense fallback={<Loading />}>
              <FeatureSampleRoutes />
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
