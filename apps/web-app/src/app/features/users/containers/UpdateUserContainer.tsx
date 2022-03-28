import { AxiosError, AxiosResponse } from 'axios';
import { ApiRequestType } from 'libs/shared/data-access/src/lib/enums/api-state.enum';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAlert } from '@example-app/alert/feature';
import { AlertType } from '@example-app/alert/ui';
import { useApiStateManager } from '@example-app/shared/data-access';
import { Loading } from '@example-app/shared/ui';
import { UpdateUserResponse, UserDetails } from '@example-app/users/data-access';

import { UserDetailsFormFormik } from '../components';
import { useUserContext } from '../context';
import { userService } from '../services';
import { getUserFormInitialValues } from '../utils';

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
