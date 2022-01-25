import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import { AppContent } from './content/AppContent';
import { AppFooter } from './footer/AppFooter';
import { Appheader } from './header/AppHeader';

export function AppShell() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Appheader />
      <AppContent>
        <Outlet />
      </AppContent>
      <AppFooter />
    </Box>
  );
}
