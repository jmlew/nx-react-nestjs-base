import { useState } from 'react';

import { ApiState } from '@api-configs/shared/models/api-states.model';

import { ApiStateManager } from './api-state-manager.util';
import { ApiRequestMethod, ApiStatus } from '@api-configs/shared/enums/api-states.enum';

// Convenience methods.
export const {
  onInit,
  onPending,
  onCompleted,
  onFailed,
  onCancelled,
  onPendingMutable,
  onCompletedMutable,
  onFailedMutable,
  onCancelledMutable,
  isPending,
  isInit,
  isCompleted,
  isFailed,
  isCreate,
  isRead,
  isUpdate,
  isDelete,
  getStatus,
  getRequest,
  getError,
} = ApiStateManager;

export interface ApiStateManagerMutable {
  onInit(): void;
  onPending(request: ApiRequestMethod): void;
  onCompleted(request: ApiRequestMethod): void;
  onFailed(error: string, request: ApiRequestMethod): void;
  onCancelled(request: ApiRequestMethod): void;
  onPendingMutable?(request: ApiRequestMethod): void;
  onCompletedMutable?(request: ApiRequestMethod): void;
  onFailedMutable?(error: string, request: ApiRequestMethod): void;
  onCancelledMutable?(request: ApiRequestMethod): void;
  isInit(): boolean;
  isPending(): boolean;
  isCompleted(): boolean;
  isFailed(): boolean;
  isCreate(): boolean;
  isRead(): boolean;
  isUpdate(): boolean;
  isDelete(): boolean;
  getStatus(): ApiStatus;
  getRequest(): ApiRequestMethod | null;
  getError(): string | null;
}

export function useApiStateManager(): {
  apiState: ApiState;
  stateManager: ApiStateManagerMutable;
} {
  const [apiState, setApiState] = useState<ApiState>(onInit());

  const stateManager: ApiStateManagerMutable = {
    // Setters to mutate the current API status based on a given request type.
    onInit: (): void => setApiState(onInit()),
    onPending: (request: ApiRequestMethod): void => setApiState(onPending(request)),
    onCompleted: (request: ApiRequestMethod): void => setApiState(onCompleted(request)),
    onCancelled: (request: ApiRequestMethod): void => setApiState(onCancelled(request)),
    onFailed: (error: string, request: ApiRequestMethod): void =>
      setApiState(onFailed(error, request)),

    // Getters to return a new API status..
    isInit: (): boolean => isInit(apiState),
    isPending: (): boolean => isPending(apiState),
    isCompleted: (): boolean => isCompleted(apiState),
    isFailed: (): boolean => isFailed(apiState),
    isCreate: (): boolean => isCreate(apiState),
    isRead: (): boolean => isRead(apiState),
    isUpdate: (): boolean => isUpdate(apiState),
    isDelete: (): boolean => isDelete(apiState),

    // Getters to return each property of the Api State.
    getStatus: (): ApiStatus => getStatus(apiState),
    getRequest: (): ApiRequestMethod | null => getRequest(apiState),
    getError: (): string | null => getError(apiState),
  };

  return { apiState, stateManager };
}
