import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import { GetUsersResponse, User } from '@api-configs/features/models/user-api-data.model';
import { ApiRequestMethod } from '@api-configs/shared/enums/api-states.enum';
import { useApiStateManager } from '@shared-utils';

import { Loading, ErrorMessage } from '../../../shared/components';
import { userService } from '../../../core/api/services';
import { UsersList } from '../components';
import { useAlert } from '../../../core/alert/context';
import { AlertType } from '../../../core/alert/enums/alert.enum';

interface UserContainerProps {
  pageIndex: number;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();
  const { stateManager } = useApiStateManager();
  const [usersData, setUsersData] = useState<User[]>();
  const { setAlert } = useAlert();

  // Handle changes in status for API load and delete requests.
  useEffect(() => {
    if (stateManager.isInit()) {
      handleGetUsers();
    }
  }, []);

  function handleGetUsers() {
    const request: ApiRequestMethod = ApiRequestMethod.Read;
    stateManager.onPending(request);
    userService
      .getUsers(pageIndex)
      .then((res: AxiosResponse<GetUsersResponse>) => {
        setUsersData(res.data.data);
        stateManager.onCompleted(request);
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        stateManager.onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function handleDeleteUser(userId: number) {
    const request: ApiRequestMethod = ApiRequestMethod.Delete;
    stateManager.onPending(request);
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
        stateManager.onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function handleEditUser(userId: number) {
    navigate(`${userId}`);
  }

  if (stateManager.isPending()) {
    return <Loading />;
  } else {
    return (
      <>
        {stateManager.isFailed() && <ErrorMessage message={stateManager.getError()!} />}
        {usersData != null && (
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
