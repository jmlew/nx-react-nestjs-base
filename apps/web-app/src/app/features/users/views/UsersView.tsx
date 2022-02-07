import { FC } from 'react';
import { Box, Typography, Card, CardContent, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { UsersListContainer } from '../containers';

export function UsersView() {
  const [searchParams] = useSearchParams();
  const page: string | null = searchParams.get('page');
  const pageIndex: number = page == null ? 1 : parseInt(page, 10);

  return (
    <UsersListScreen>
      <UsersListContainer pageIndex={pageIndex} />
    </UsersListScreen>
  );
}

const UsersListScreen: FC = ({ children }) => {
  return (
    <Box sx={{ width: 400 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Fab
          component={Link}
          to="new"
          size="medium"
          color="primary"
          aria-label="new user"
        >
          <Add />
        </Fab>
      </Box>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};
