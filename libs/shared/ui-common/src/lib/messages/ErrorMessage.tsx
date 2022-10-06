import { ReactNode } from 'react';

import { Typography } from '@mui/material';

const styles = {
  root: (top?: number) => ({
    pt: top ?? 4,
  }),
};

interface ErrorMessageProps {
  children: ReactNode;
  top?: number;
}

export function ErrorMessage({ top, children }: ErrorMessageProps) {
  return (
    <Typography sx={styles.root(top)} variant="body1" color="warning.main">
      {children}
    </Typography>
  );
}
