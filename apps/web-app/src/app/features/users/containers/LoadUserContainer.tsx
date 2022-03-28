import { AxiosError, AxiosResponse } from 'axios';
import { ApiRequestType } from 'libs/shared/data-access/src/lib/enums/api-state.enum';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useApiStateManager } from '@example-app/shared/data-access';
import { ErrorMessage, Loading } from '@example-app/shared/ui';
import { GetUserResponse, User } from '@example-app/users/data-access';
import { Button } from '@mui/material';

import { UserContextProvider } from '../context';
import { userService } from '../services';

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
    userService
      .getUser(userId)
      .then((res: AxiosResponse<GetUserResponse>) => {
        setUserData(res.data.data);
        onCompleted(request);
      })
      .catch((error: AxiosError) => onFailed(error.message, request));
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
