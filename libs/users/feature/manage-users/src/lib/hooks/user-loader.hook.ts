import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import { ApiStateManagerHook, useApiStateManager } from '@example-app/shared/data-access';
import { GetUserResponse, User, userFacade } from '@example-app/users/domain';

interface UserLoaderHook extends ApiStateManagerHook {
  user: User | undefined;
  loadUser: (userId: number) => void;
}

export function useUserLoader(): UserLoaderHook {
  const { apiState, stateManager } = useApiStateManager();
  const [user, setUser] = useState<User>();
  const { onCompleted, onFailed, onPending } = stateManager;

  function loadUser(userId: number) {
    onPending();
    userFacade
      .getUser(userId)
      .then((res: AxiosResponse<GetUserResponse>) => {
        setUser(res.data.data);
        onCompleted();
      })
      .catch((error: AxiosError) => onFailed(error.message));
  }

  return { user, loadUser, apiState, stateManager };
}
