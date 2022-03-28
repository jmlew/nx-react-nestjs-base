import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAlert } from '@example-app/alert/feature';
import { AlertType } from '@example-app/alert/ui';
import { DataDrivenForm } from '@example-app/form/ui';
import { ApiRequestType, useApiStateManager } from '@example-app/shared/data-access';
import { Loading } from '@example-app/shared/ui';
import { CreateUserResponse, UserDetails } from '@example-app/users/data-access';
import { userService } from '@example-app/users/data-access';
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
