import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  GetUsersResponse,
  User,
} from '@api-interfaces/features/models/user-api-data.model';
import { ApiDataState } from '@api-interfaces/shared/models/api-states.model';
import { ProgressStatus } from '@api-interfaces/shared/enums/api-states.enum';
import * as fromSharedUtils from '@shared-utils';

import { Loading, ErrorMessage } from '../../../shared/components';
import { userService } from '../../../core/api/services';
import { getApiErrorMessage } from '../../../core/api/utils';
import { UsersList } from '../components';

interface UserContainerProps {
  pageIndex: number;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();

  const [apiState, setApiState] = useState<ApiDataState>(
    fromSharedUtils.onApiStateInit()
  );
  const [usersData, setUsersData] = useState<User[]>();

  const { loadStatus } = apiState;

  useEffect(() => {
    if (apiState.loadStatus === ProgressStatus.Idle) {
      handleGetUsers();
    }
  }, [loadStatus]);

  function handleGetUsers() {
    setApiState(fromSharedUtils.onApiStateLoad(apiState));
    userService
      .getUsers(pageIndex)
      .then((res: AxiosResponse<GetUsersResponse>) => {
        setUsersData(res.data.data);
        setApiState(fromSharedUtils.onApiStateLoadComplete(apiState));
      })
      .catch((error: AxiosError) =>
        setApiState(fromSharedUtils.onApiStateLoadFailed(apiState, error.message))
      );
  }

  function handleDeleteUser(userId: number) {
    setApiState(fromSharedUtils.onApiStateUpdate(apiState));
    userService
      .deleteUser(userId)
      .then((res: AxiosResponse<number>) => {
        // TODO: Reset load status via shared utils method.
        setApiState(fromSharedUtils.onApiStateInit());
      })
      .catch((error: AxiosError) =>
        setApiState(fromSharedUtils.onApiStateUpdateFailed(apiState, error.message))
      );
  }

  function handleEditUser(userId: number) {
    navigate(`${userId}`);
  }

  if (apiState.loadStatus === ProgressStatus.Pending) {
    return <Loading />;
  }

  if (apiState.loadStatus === ProgressStatus.Failed) {
    return <ErrorMessage message={apiState.errorMessage!} />;
  }

  return usersData ? (
    <UsersList
      users={usersData}
      onEditUser={handleEditUser}
      onDeleteUser={handleDeleteUser}
    />
  ) : (
    <Loading />
  );
}
