import { AxiosError } from 'axios';

import { ApiStateManagerHook, useApiStateManager } from '@example-app/shared/data-access';
import { User, UserDetails, userFacade } from '@example-app/users/domain';

import { useUserContext } from '../context/user.context';

interface UserUpdaterHook extends ApiStateManagerHook {
  user: User;
  updateUser: (values: UserDetails) => void;
}

export function useUserUpdater(): UserUpdaterHook {
  const { apiState, stateManager } = useApiStateManager();
  const { onCompleted, onFailed, onPending } = stateManager;
  const { user } = useUserContext();

  function updateUser(values: UserDetails) {
    const userId: number = user.id;
    onPending();
    userFacade
      .updateUser(userId, values)
      .then(() => {
        onCompleted();
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message);
      });
  }

  return { user, updateUser, apiState, stateManager };
}
