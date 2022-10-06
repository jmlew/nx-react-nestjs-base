import { useState } from 'react';

import { usePrevious } from '@example-app/shared/util-common';

import { ApiStateManager } from './api-state-manager.util';
import { ApiStateReference, ApiStateReferenceManager } from './api-state-reference.model';
import { ApiStatus } from './api-state.enum';
import { ApiState } from './api-state.model';

export interface ApiStateManagerHook {
  apiState: ApiState;
  stateManager: ApiStateReferenceManager;
}

export const {
  onInit,
  onPending,
  onCompleted,
  onFailed,
  onCancelled,
  isPending,
  isInit,
  isCompleted,
  isFailed,
  getStatus,
  getError,
} = ApiStateManager;

export function useApiStateReference(apiState: ApiState | null): ApiStateReference {
  const prevApiState = usePrevious(apiState);

  return {
    // Getters to return the current API status.
    isInit: (): boolean => apiState != null && isInit(apiState),
    isPending: (): boolean => apiState != null && isPending(apiState),
    isCompleted: (): boolean => apiState != null && isCompleted(apiState),
    isFailed: (): boolean => apiState != null && isFailed(apiState),

    // Getters to return the previous API status.
    wasInit: (): boolean => prevApiState != null && isInit(prevApiState),
    wasPending: (): boolean => prevApiState != null && isPending(prevApiState),
    wasCompleted: (): boolean => prevApiState != null && isCompleted(prevApiState),
    wasFailed: (): boolean => prevApiState != null && isFailed(prevApiState),

    // Getters to return each property of the Api State.
    getStatus: (): ApiStatus => (apiState != null ? getStatus(apiState) : ApiStatus.Init),
    getPrevStatus: (): ApiStatus =>
      prevApiState != null ? getStatus(prevApiState) : ApiStatus.Init,
    getError: (): string | null => (apiState != null ? getError(apiState) : null),
  };
}

export function useApiStateManager(): ApiStateManagerHook {
  const [apiState, setApiState] = useState<ApiState>(onInit());
  const apiStateReference: ApiStateReference = useApiStateReference(apiState);

  const stateManager: ApiStateReferenceManager = {
    ...apiStateReference,

    // Setters to mutate the current API status.
    onInit: (): void => setApiState(onInit()),
    onPending: (): void => setApiState(onPending()),
    onCompleted: (): void => setApiState(onCompleted()),
    onCancelled: (): void => setApiState(onCancelled()),
    onFailed: (error: string): void => setApiState(onFailed(error)),
  };

  return { apiState, stateManager };
}
