import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import { ApiStateManagerHook, useApiStateManager } from '@example-app/shared/data-access';
import {
  CreateUserResponse,
  User,
  UserDetails,
  userFacade,
} from '@example-app/users/domain';

interface UserCreatorHook extends ApiStateManagerHook {
  user: User | undefined;
  createUser: (params: UserDetails) => void;
}

export function useUserCreator(): UserCreatorHook {
  const { apiState, stateManager } = useApiStateManager();
  const [user, setUser] = useState<User>();
  const { onCompleted, onFailed, onPending } = stateManager;

  function createUser(params: UserDetails) {
    onPending();
    userFacade
      .createUser(params)
      .then((res: AxiosResponse<CreateUserResponse>) => {
        setUser(res.data);
        onCompleted();
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message);
      });
  }
  return { user, createUser, apiState, stateManager };
}
