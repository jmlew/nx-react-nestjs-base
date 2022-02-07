import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { AlertProvider } from '../core/alert/containers';

import { AppContent } from './content/AppContent';
import { AppFooter } from './footer/AppFooter';
import { Appheader } from './header/AppHeader';

export const stylesWrapper = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
} as const;

export function AppShell() {
  return (
    <Box sx={stylesWrapper}>
      <Appheader />
      <AppContent>
        <AlertProvider>
          <Outlet />
        </AlertProvider>
      </AppContent>
      <AppFooter />
    </Box>
  );
}
