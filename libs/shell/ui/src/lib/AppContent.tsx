import { ReactNode } from 'react';

import Box from '@mui/material/Box';

const styles = {
  root: {
    py: 5,
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
};

interface AppContentProps {
  children: ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  return <Box sx={styles.root}>{children}</Box>;
}
