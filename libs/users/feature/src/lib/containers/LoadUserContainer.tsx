import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRequestType, useApiStateManager } from '@example-app/shared/data-access';
import { ErrorMessage, Loading } from '@example-app/shared/ui-common';
import { GetUserResponse, User, userFacade } from '@example-app/users/domain';
import { Button } from '@mui/material';

import { UserContextProvider } from '../context/UserContextProvider';

interface LoadUserContainerProps {
  userId: number;
  children: React.ReactNode;
}

export function LoadUserContainer({ userId, children }: LoadUserContainerProps) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>();
  const { stateManager } = useApiStateManager();
  const {
    getError,
    isCompleted,
    isFailed,
    isPending,
    isRead,
    onCompleted,
    onFailed,
    onPending,
    wasCompleted,
    wasPending,
  } = stateManager;

  useEffect(() => {
    handleGetUser(userId);
  }, []);

  function handleGetUser(userId: number) {
    const request: ApiRequestType = ApiRequestType.Read;
    onPending(request);
    userFacade
      .getUser(userId)
      .then((res: AxiosResponse<GetUserResponse>) => {
        setUserData(res.data.data);
        onCompleted(request);
      })
      .catch((error: AxiosError) => onFailed(error.message, request));

    /* Testing Server sent events */
    const eventSource = new EventSource('/api/users/test-sse');
    eventSource.onmessage = ({ data }) => {
      console.log('Server Sent Event message', JSON.parse(data));
    };
  }

  function goToList() {
    navigate(`/users`);
  }

  const isDataReady: boolean = isCompleted() && (wasPending() || wasCompleted());

  return (
    <>
      {isPending() && <Loading />}
      {isFailed() && isRead() && (
        <>
          <ErrorMessage message={getError()!} />
          <Button variant="contained" onClick={goToList}>
            Go to Users
          </Button>
        </>
      )}
      {isDataReady && userData != null && (
        <UserContextProvider user={userData}>{children}</UserContextProvider>
      )}
    </>
  );
}
