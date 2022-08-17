import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRequestType, useApiStateManager } from '@example-app/shared/data-access';
import { useAlert } from '@example-app/shared/feature-alert';
import { DataDrivenForm, FormParams } from '@example-app/shared/feature-form';
import { AlertType, Loading } from '@example-app/shared/ui-common';
import { CreateUserResponse, UserDetails, userFacade } from '@example-app/users/domain';
import { getUserFormParams, getUserFormReturnValues } from '@example-app/users/util';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState]);

  function handleCreateUser(params: FormParams) {
    const user: UserDetails = getUserFormReturnValues(params);
    const request: ApiRequestType = ApiRequestType.Create;
    onPending(request);
    userFacade
      .createUser(user)
      .then((res: AxiosResponse<CreateUserResponse>) => {
        onCompleted(request);
        setAlert({
          isShown: true,
          message: `User ${user.first_name} ${user.last_name} has been created`,
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
        isNewUser={true}
        onSubmit={handleCreateUser}
        onCancel={goToList}
        initialValues={getUserFormParams()}
      />
    </>
  );
}
