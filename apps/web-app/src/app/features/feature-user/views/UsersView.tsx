import { useSearchParams } from 'react-router-dom';
import { UsersListContainer } from '../containers';

export function UsersView() {
  const [searchParams] = useSearchParams();
  const pageIndex = searchParams.get('page');
  return <UsersListContainer pageIndex={pageIndex} />;
}
