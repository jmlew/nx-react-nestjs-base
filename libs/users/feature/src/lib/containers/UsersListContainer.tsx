import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAlert } from '@example-app/alert/feature';
import { AlertType } from '@example-app/alert/ui';
import { ApiRequestType, useApiStateManager } from '@example-app/shared/data-access';
import { ErrorMessage, Loading } from '@example-app/shared/ui';
import { objectsSortOnKey } from '@example-app/shared/util';
import { GetUsersResponse, User, userService } from '@example-app/users/data-access';
import { UsersList } from '@example-app/users/ui';

interface UserContainerProps {
  pageIndex: number;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState<User[]>();
  const { setAlert } = useAlert();
  const { stateManager } = useApiStateManager();
  const {
    getError,
    isCompleted,
    isFailed,
    isInit,
    isPending,
    onCompleted,
    onFailed,
    onPending,
    wasPending,
    wasCompleted,
  } = stateManager;

  // Handle changes in status for API load and delete requests.
  useEffect(() => {
    if (isInit()) {
      handleGetUsers();
    }
  }, []);

  function handleGetUsers() {
    const request: ApiRequestType = ApiRequestType.Read;
    onPending(request);
    userService
      .getUsers(pageIndex)
      .then((res: AxiosResponse<GetUsersResponse>) => {
        const items: User[] = objectsSortOnKey(res.data.data, 'first_name');
        setUsersData(items);
        onCompleted(request);
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function handleDeleteUser(userId: number) {
    const request: ApiRequestType = ApiRequestType.Delete;
    onPending(request);
    userService
      .deleteUser(userId)
      .then((res: AxiosResponse<number>) => {
        setAlert({
          isShown: true,
          message: `User ${userId} has been deleted`,
          type: AlertType.Success,
        });
        handleGetUsers();
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function handleEditUser(userId: number) {
    navigate(`${userId}`);
  }

  const isDataReady: boolean = isCompleted() && (wasPending() || wasCompleted());

  if (isPending()) {
    return <Loading />;
  } else {
    return (
      <>
        {isFailed() && <ErrorMessage message={getError()!} />}
        {isDataReady && usersData != null && (
          <UsersList
            users={usersData}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </>
    );
  }
}
