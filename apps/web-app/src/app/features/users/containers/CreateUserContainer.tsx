import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CreateUserResponse,
  UserDetails,
} from '@api-configs/features/models/user-api-data.model';
import { ApiRequestType } from '@api-configs/shared/enums/api.enum';
import { useApiStateManager } from '@shared-utils';

import { useAlert } from '../../../core/alert/context';
import { AlertType } from '../../../core/alert/enums/alert.enum';
import { Loading } from '../../../shared/components';
import { UserDetailsForm } from '../components';
import { userService } from '../services';
import { getUserFormInitialValues } from '../utils';

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
      <UserDetailsForm
        onSubmit={handleCreateUser}
        onCancel={goToList}
        initialValues={getUserFormInitialValues()}
      />
    </>
  );
}
