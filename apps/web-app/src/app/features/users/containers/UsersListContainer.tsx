import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetUsersResponse, User } from '@api-configs/features/models/user-api-data.model';
import { ApiRequestMethod } from '@api-configs/shared/enums/api-states.enum';
import { objectsSortOnKey, useApiStateManager } from '@shared-utils';

import { useAlert } from '../../../core/alert/context';
import { AlertType } from '../../../core/alert/enums/alert.enum';
import { ErrorMessage, Loading } from '../../../shared/components';
import { UsersList } from '../components';
import { userService } from '../services';

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
    const request: ApiRequestMethod = ApiRequestMethod.Read;
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
    const request: ApiRequestMethod = ApiRequestMethod.Delete;
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
