import { ReactNode } from 'react';

import Box from '@mui/material/Box';

import * as styles from './styles';

interface AppContentProps {
  children: ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  return <Box sx={styles.appContent}>{children}</Box>;
}
