import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import { ApiStateManagerHook, useApiStateManager } from '@example-app/shared/data-access';
import { userFacade } from '@example-app/users/domain';

interface UserDeleterHook extends ApiStateManagerHook {
  userId: number | undefined;
  deleteUser: (userId: number) => void;
}

export function useUserDeleter(): UserDeleterHook {
  const { apiState, stateManager } = useApiStateManager();
  const [userId, setUserId] = useState<number>();
  const { onCompleted, onFailed, onPending } = stateManager;

  function deleteUser(userId: number) {
    onPending();
    userFacade
      .deleteUser(userId)
      .then((res: AxiosResponse<number>) => {
        setUserId(userId);
        onCompleted();
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message);
      });
  }

  return { userId, deleteUser, apiState, stateManager };
}
