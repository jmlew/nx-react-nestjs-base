import { Outlet } from 'react-router-dom';

import { AlertProvider } from '@example-app/alert/feature';
import { uiTheme } from '@example-app/shared/ui';
import { AppContent, AppFooter, Appheader } from '@example-app/shell/ui';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
  },
};

export function AppShell() {
  return (
    <ThemeProvider theme={uiTheme}>
      <Box sx={styles.root}>
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
