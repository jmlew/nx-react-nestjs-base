import { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRequestMethod } from '@api-interfaces/shared/enums/api-states.enum';
import {
  CreateUserResponse,
  GetUserResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@api-interfaces/features/models/user-api-data.model';
import { useApiStateManager } from '@shared-utils';

import { Loading, ErrorMessage } from '../../../shared/components';
import { userService } from '../../../core/api/services';
import { UserDetailsForm } from '../components';
import { useAlert } from '../../../core/alert/context';
import { AlertType } from '../../../core/alert/enums/alert.enum';
import { getUserFormInitialValues } from '../utils';

interface UserContainerProps {
  userId?: number;
}

export function UserContainer({ userId }: UserContainerProps) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>();
  const { apiState, stateManager } = useApiStateManager();
  const { setAlert } = useAlert();
  const isNewUser: boolean = userId == null;

  // Handle changes in status for API load and update requests.
  useEffect(() => {
    if (stateManager.isInit() && !isNewUser) {
      handleGetUser(userId!);
    }

    if (
      stateManager.isCompleted() &&
      (stateManager.isUpdate() || stateManager.isCreate())
    ) {
      goToList();
    }
  }, [apiState]);

  function handleGetUser(userId: number) {
    const request: ApiRequestMethod = ApiRequestMethod.Read;
    stateManager.onPending(request);
    userService
      .getUser(userId)
      .then((res: AxiosResponse<GetUserResponse>) => {
        setUserData(res.data.data);
        stateManager.onCompleted(request);
      })
      .catch((error: AxiosError) => stateManager.onFailed(error.message, request));
  }

  function handleUpdateUser(values: UserDetails) {
    const request: ApiRequestMethod = ApiRequestMethod.Update;
    stateManager.onPending(request);
    userService
      .updateUser(userId!, values)
      .then((res: AxiosResponse<UpdateUserResponse>) => {
        stateManager.onCompleted(request);
        setAlert({
          isShown: true,
          message: `User ${userId} has been updated`,
          type: AlertType.Success,
        });
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        stateManager.onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function handleCreateUser(values: UserDetails) {
    const request: ApiRequestMethod = ApiRequestMethod.Create;
    stateManager.onPending(request);
    userService
      .createUser(values)
      .then((res: AxiosResponse<CreateUserResponse>) => {
        stateManager.onCompleted(request);
        setAlert({
          isShown: true,
          message: `User ${values.first_name} ${values.last_name} has been created`,
          type: AlertType.Success,
        });
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        stateManager.onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function goToList() {
    navigate(`/users`);
  }

  return (
    <>
      {stateManager.isPending() && <Loading />}
      {stateManager.isRead() && stateManager.isFailed() && (
        <ErrorMessage message={stateManager.getError()!} />
      )}
      {isNewUser ? (
        <UserDetailsForm
          onSubmit={handleCreateUser}
          onCancel={goToList}
          initialValues={getUserFormInitialValues()}
        />
      ) : (
        userData != null && (
          <UserDetailsForm
            user={userData}
            onSubmit={handleUpdateUser}
            onCancel={goToList}
            initialValues={getUserFormInitialValues(userData)}
          />
        )
      )}
    </>
  );
}
