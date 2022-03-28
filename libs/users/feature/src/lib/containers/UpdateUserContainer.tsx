import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRequestType, useApiStateManager } from '@example-app/shared/data-access';
import { useAlert } from '@example-app/shared/feature-alert';
import { AlertType } from '@example-app/shared/ui-alert';
import { Loading } from '@example-app/shared/ui-common';
import {
  UpdateUserResponse,
  UserDetails,
  userService,
} from '@example-app/users/data-access';
import { UserDetailsFormFormik } from '@example-app/users/ui';
import { getUserFormInitialValues } from '@example-app/users/util';

import { useUserContext } from '../context/user.context';

export function UpdateUserContainer() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { apiState, stateManager } = useApiStateManager();
  const { isCompleted, isPending, onCompleted, onFailed, onPending } = stateManager;
  const { user } = useUserContext();

  // Handle changes in status for API load and update requests.
  useEffect(() => {
    if (isCompleted()) {
      goToList();
    }
  }, [apiState]);

  function handleUpdateUser(values: UserDetails) {
    const userId: number = user.id;
    const request: ApiRequestType = ApiRequestType.Update;
    onPending(request);
    userService
      .updateUser(userId, values)
      .then((res: AxiosResponse<UpdateUserResponse>) => {
        onCompleted(request);
        setAlert({
          isShown: true,
          message: `User ${userId} has been updated`,
          type: AlertType.Success,
        });
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function goToList() {
    navigate(`/users`);
  }

  return (
    <>
      {isPending() && <Loading />}
      {
        <UserDetailsFormFormik
          user={user}
          onSubmit={handleUpdateUser}
          onCancel={goToList}
          initialValues={getUserFormInitialValues(user)}
        />
      }
    </>
  );
}
