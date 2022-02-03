import { FC } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
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
      <Typography gutterBottom variant="h4">
        Users
      </Typography>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};
