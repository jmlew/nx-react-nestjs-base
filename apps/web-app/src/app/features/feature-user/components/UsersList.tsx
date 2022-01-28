import { JsonViewer } from '../../../shared/components';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface UsersListProps {
  data: object;
}

export function UsersList({ data }: UsersListProps) {
  return (
    <>
      <Typography variant="h2">Users List</Typography>
      <Divider flexItem={true} sx={{ margin: 2 }} />
      <JsonViewer data={data} sx={{ width: '100%', flexGrow: 1 }} />
    </>
  );
}
