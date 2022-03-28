import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRequestType, useApiStateManager } from '@example-app/shared/data-access';
import { useAlert } from '@example-app/shared/feature-alert';
import { AlertType } from '@example-app/shared/ui-alert';
import { Loading } from '@example-app/shared/ui-common';
import { DataDrivenForm } from '@example-app/shared/ui-form';
import {
  CreateUserResponse,
  UserDetails,
  userService,
} from '@example-app/users/data-access';
import { getUserFormInitialValues } from '@example-app/users/util';

export function CreateUserContainer() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { apiState, stateManager } = useApiStateManager();
  const { isCompleted, isPending, onCompleted, onFailed, onPending } = stateManager;

  // Handle changes in status for API load and update requests.
  useEffect(() => {
    if (isCompleted()) {
      goToList();
    }
  }, [apiState]);

  function handleCreateUser(values: UserDetails) {
    const request: ApiRequestType = ApiRequestType.Create;
    onPending(request);
    userService
      .createUser(values)
      .then((res: AxiosResponse<CreateUserResponse>) => {
        onCompleted(request);
        setAlert({
          isShown: true,
          message: `User ${values.first_name} ${values.last_name} has been created`,
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
      <DataDrivenForm
        onSubmit={handleCreateUser}
        onCancel={goToList}
        initialValues={getUserFormInitialValues()}
      />
    </>
  );
}
