import { useParams } from 'react-router-dom';
import { UserContainer } from '../containers';

export function UserView() {
  const { userId } = useParams();
  return <UserContainer userId={userId} />;
}
