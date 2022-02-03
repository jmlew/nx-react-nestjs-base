import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../../../shared/components';
import { UserContainer } from '../containers';

export function UserView() {
  const { userId } = useParams();

  if (userId == null) {
    return <ErrorMessage message="No user ID"></ErrorMessage>;
  } else {
    const id: number = parseInt(userId, 10);
    return <UserContainer userId={id} />;
  }
}
