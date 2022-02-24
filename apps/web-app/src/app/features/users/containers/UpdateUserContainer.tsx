import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  UpdateUserResponse,
  UserDetails,
} from '@api-configs/features/models/user-api-data.model';
import { ApiRequestType } from '@api-configs/shared/enums/api.enum';
import { useApiStateManager } from '@shared-utils';

import { useAlert } from '../../../core/alert/context';
import { AlertType } from '../../../core/alert/enums/alert.enum';
import { Loading } from '../../../shared/components';
import { UserDetailsForm } from '../components';
import { useUserContext } from '../context';
import { userService } from '../services';
import { getUserFormInitialValues } from '../utils';

export function UpdateUserContainer() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { apiState, stateManager } = useApiStateManager();
  const { isCompleted, isPending, onCompleted, onFailed, onPending } = stateManager;
  const { user } = useUserContext();
  const userId: number = user.id;

  // Handle changes in status for API load and update requests.
  useEffect(() => {
    if (isCompleted()) {
      goToList();
    }
  }, [apiState]);

  function handleUpdateUser(values: UserDetails) {
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
        <UserDetailsForm
          user={user}
          onSubmit={handleUpdateUser}
          onCancel={goToList}
          initialValues={getUserFormInitialValues(user)}
        />
      }
    </>
  );
}
