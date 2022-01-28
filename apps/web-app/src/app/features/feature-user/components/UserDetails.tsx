import { JsonViewer } from '../../../shared/components';

interface UserDetailsProps {
  data: object;
}

export function UserDetails({ data }: UserDetailsProps) {
  return <JsonViewer data={data} sx={{ width: '100%', flexGrow: 1 }} />;
}
