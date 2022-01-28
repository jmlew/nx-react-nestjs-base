import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { JsonViewer } from '../../../shared/components';

interface UserDetailsProps {
  userId: string;
  data: object;
}

export function UserDetails({ userId, data }: UserDetailsProps) {
  return (
    <>
      <Typography variant="h2">User {userId} Details</Typography>
      <Divider flexItem={true} sx={{ margin: 2 }} />
      <JsonViewer data={data} sx={{ width: '100%', flexGrow: 1 }} />
    </>
  );
}
