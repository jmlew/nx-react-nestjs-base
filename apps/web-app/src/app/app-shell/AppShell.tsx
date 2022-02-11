import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

import { AlertProvider } from '../core/alert/containers';
import { uiTheme } from '../styles';
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
    <ThemeProvider theme={uiTheme}>
      <Box sx={stylesWrapper}>
        <Appheader />
        <AppContent>
          <AlertProvider>
            <Outlet />
          </AlertProvider>
        </AppContent>
        <AppFooter />
      </Box>
    </ThemeProvider>
  );
}
