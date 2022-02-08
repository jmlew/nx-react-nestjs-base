import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {!!message && (
        <Typography variant="caption" mr={2}>
          {message}
        </Typography>
      )}
      <CircularProgress />
    </Box>
  );
}
