import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../../../shared/components';
import { UserContainer } from '../containers';

export function UserView() {
  const { userId } = useParams();
  return userId == null ? (
    <ErrorMessage message="No user ID"></ErrorMessage>
  ) : (
    <UserContainer userId={userId} />
  );
}
