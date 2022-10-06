import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorMessage, Loading } from '@example-app/shared/ui-common';
import { Button } from '@mui/material';

import { UserContextProvider } from '../context/UserContextProvider';
import { useUserLoader } from '../hooks/user-loader.hook';

interface LoadUserContainerProps {
  userId: number;
  children: React.ReactNode;
}

export function LoadUserContainer({ userId, children }: LoadUserContainerProps) {
  const navigate = useNavigate();
  const { user, loadUser, stateManager } = useUserLoader();
  const { getError, isCompleted, isFailed, isPending, wasCompleted, wasPending } =
    stateManager;

  useEffect(() => {
    loadUser(userId);
  }, []);

  function goToList() {
    navigate(`/users`);
  }

  const isReady: boolean = isCompleted() && (wasPending() || wasCompleted());
  return (
    <>
      {isPending() && <Loading />}
      {isFailed() && (
        <>
          <ErrorMessage>{getError()}</ErrorMessage>
          <Button variant="contained" onClick={goToList}>
            Go to Users
          </Button>
        </>
      )}
      {isReady && user != null && (
        <UserContextProvider user={user}>{children}</UserContextProvider>
      )}
    </>
  );
}
