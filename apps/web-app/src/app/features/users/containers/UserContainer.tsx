import { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiState } from '@api-interfaces/shared/models/api-states.model';
import { ApiRequest } from '@api-interfaces/shared/enums/api-states.enum';
import {
  CreateUserResponse,
  GetUserResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@api-interfaces/features/models/user-api-data.model';
import { ApiStateManager } from '@shared-utils';

import { Loading, ErrorMessage } from '../../../shared/components';
import { userService } from '../../../core/api/services';
import { UserDetailsForm } from '../components';
import { useAlert } from '../../../core/alert/context';
import { AlertType } from '../../../core/alert/enums/alert.enum';

interface UserContainerProps {
  userId?: number;
}

export function UserContainer({ userId }: UserContainerProps) {
  const navigate = useNavigate();
  const [apiState, setApiState] = useState<ApiState>(ApiStateManager.onInit());
  const [userData, setUserData] = useState<User>();
  const { setAlert } = useAlert();

  // Handle changes in status for API load and update requests.
  useEffect(() => {
    if (ApiStateManager.isIdle(apiState) && userId != null) {
      handleGetUser(userId!);
    }

    if (
      ApiStateManager.isCompleted(apiState) &&
      (ApiStateManager.isUpdate(apiState) || ApiStateManager.isCreate(apiState))
    ) {
      goToList();
    }
  }, [apiState]);

  function handleGetUser(userId: number) {
    setApiState(ApiStateManager.onPending());
    userService
      .getUser(userId)
      .then((res: AxiosResponse<GetUserResponse>) => {
        setUserData(res.data.data);
        setApiState(ApiStateManager.onCompleted());
      })
      .catch((error: AxiosError) => setApiState(ApiStateManager.onFailed(error.message)));
  }

  function handleUpdateUser(values: UserDetails) {
    const request: ApiRequest = ApiRequest.Update;
    setApiState(ApiStateManager.onPending(request));
    userService
      .updateUser(userId!, values)
      .then((res: AxiosResponse<UpdateUserResponse>) => {
        setApiState(ApiStateManager.onCompleted(request));
        setAlert({
          isShown: true,
          message: `User ${userId} has been updated`,
          type: AlertType.Success,
        });
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        setApiState(ApiStateManager.onFailed(message, request));
        setAlert({ isShown: true, message });
      });
  }

  function handleCreateUser(values: UserDetails) {
    const request: ApiRequest = ApiRequest.Create;
    setApiState(ApiStateManager.onPending(request));
    userService
      .createUser(values)
      .then((res: AxiosResponse<CreateUserResponse>) => {
        setApiState(ApiStateManager.onCompleted(request));
        setAlert({
          isShown: true,
          message: `User ${values.first_name} ${values.last_name} has been created`,
          type: AlertType.Success,
        });
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        setApiState(ApiStateManager.onFailed(message, request));
        setAlert({ isShown: true, message });
      });
  }

  function goToList() {
    navigate(`/users`);
  }

  return (
    <>
      {ApiStateManager.isPending(apiState) && <Loading />}
      {ApiStateManager.isRead(apiState) && ApiStateManager.isFailed(apiState) && (
        <ErrorMessage message={ApiStateManager.getError(apiState)!} />
      )}
      {userId == null && (
        <UserDetailsForm onSubmit={handleCreateUser} onCancel={goToList} />
      )}
      {userId != null && userData != null && (
        <UserDetailsForm
          user={userData}
          onSubmit={handleUpdateUser}
          onCancel={goToList}
        />
      )}
    </>
  );
}
