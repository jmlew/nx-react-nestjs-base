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
  pageIndex: string | null;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();

  const [apiState, setApiState] = useState<ApiDataState>(
    fromSharedUtils.onApiStateInit()
  );
  const [usersData, setUsersData] = useState<User[]>();

  useEffect(() => {
    if (apiState.loadStatus === ProgressStatus.Idle) {
      handleGetUsers();
    }
  }, [apiState]);

  function handleGetUsers() {
    const page: number = pageIndex == null ? 1 : parseInt(pageIndex, 10);
    userService
      .getUsers(page)
      .then((res: AxiosResponse<GetUsersResponse>) => {
        setUsersData(res.data.data);
        setApiState(fromSharedUtils.onApiStateLoadComplete(apiState));
      })
      .catch((error: AxiosError) =>
        setApiState(
          fromSharedUtils.onApiStateLoadFailed(apiState, getApiErrorMessage(error))
        )
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
    <UsersList users={usersData} onEditUser={handleEditUser} />
  ) : (
    <Loading />
  );
}
